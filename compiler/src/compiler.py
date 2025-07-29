from contextlib import contextmanager
from typing import Any, Sequence
from io import StringIO
from pathlib import Path
from node import Node, Position
from strutil import IndentedStringIO, Joiner, cut
from processor_base import MacroProcessingStep, MacroAssertFailed, to_valid_js_ident
from macro_registry import MacroContext
from preprocessing_macros import PreprocessingStep
from code_block_linking import CodeBlockLinkingStep  
from typecheck_macros import TypeCheckingStep
from literal_macros import JavaScriptEmissionStep

class Compiler:
    def __init__(self):
        self.nodes: list[Node] = []
        # TODO. incremental is good enough for now, but we'll have to stabilize it.
        #  the last thing you would want is the entire output changing because you added a statement. that's a lot of
        #  unnecessary diff. best way to solve this that i see is to make this block-scoped,
        #  so that each block gets its own incremental. a bit harder, though.
        self.incremental_id = 0
        self.compile_errors: list[dict[str, Any]] = []
        self._js_output: str = ""
        
        # Initialize the processing pipeline
        self.processing_steps: list[MacroProcessingStep] = [
            PreprocessingStep(),
            CodeBlockLinkingStep(), 
            TypeCheckingStep(),
            JavaScriptEmissionStep()
        ]

    def get_new_ident(self, name: str | None):
        ident = f"_{hex(self.incremental_id)}"
        if name:
            ident += f"_{to_valid_js_ident(name)}"
        self.incremental_id += 1
        return ident

    def register(self, node: Node):
        self.nodes.append(node)

    def assert_(self, must_be_true: bool, node: Node, message: str):
        if not must_be_true:
            self.compile_error(node, f"failed to assert: {message}")
            raise MacroAssertFailed(message)

    def compile_error(self, node: Node, error: str):
        pos = node.pos or Position(0, 0)
        entry: dict[str, Any] = { # TODO dataclass
            "recoverable": False, # TODO
            "line": pos.line,
            "char": pos.char,
            "content": node.content,
            "error": error
        }
        self.compile_errors.append(entry)

    def compile(self):
        # Discover macros first
        for node in self.nodes:
            self.__discover_macros(node)
            
        solution_node = self.make_node("PIL:solution", Position(0, 0), self.nodes or [])
            
        # Execute the processing pipeline
        for step in self.processing_steps:
            ctx = MacroContext(
                statement_out=StringIO(),  # dummy for non-emission steps
                expression_out=StringIO(),
                node=solution_node,
                compiler=self,
                current_step=step,
            )
            step.process_node(ctx)
        
        if len(self.compile_errors) != 0:
            return "" # TODO - raise an error instead ?
        return self._js_output

    def __discover_macros(self, node: Node):
        # TODO lstring macros should perhaps get special handling here...
        from node import Macro, Args
        macro, args = cut(node.content, " ")
        node.metadata[Macro] = macro
        node.metadata[Args] = args
        for child in node.children:
            self.__discover_macros(child)

    def make_node(self, content: str, pos: Position, children: None | list[Node]) -> Node:
        n = Node(content, pos, children)
        self.__discover_macros(n)
        return n

    # TODO - probably time to nuke this one...
    def compile_fn_call(self, ctx: MacroContext, call: str, nodes: Sequence[Node], ident:bool=True):
        from dataclasses import replace
        args: list[str] = []
        for child in nodes:
            expression_out = IndentedStringIO()
            child_ctx = replace(ctx, node=child, expression_out=expression_out)
            child_ctx.current_step.process_node(child_ctx)
            expression_out = expression_out.getvalue()
            if expression_out:
                args.append(expression_out)
            
        ident_value = ""
        if ident:
            ident_value = ctx.compiler.get_new_ident(call)
            ctx.statement_out.write(f"const {ident_value} = ")
        ctx.statement_out.write(f"{call}")
        joiner = Joiner(ctx.statement_out, ", ")
        for i in args:
            with joiner:
                ctx.statement_out.write(i)
        ctx.statement_out.write(")\n")
        if ident:
            ctx.expression_out.write(ident_value)

    @property
    def safely(self):
        @contextmanager
        def _safely():
            try:
                yield
            except MacroAssertFailed:
                pass
        return _safely()