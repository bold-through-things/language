from contextlib import contextmanager
from typing import Any, Sequence
from io import StringIO
from macros.noscope_macro import Noscope_macro_provider
from macros.collection_macros import List_macro_provider
from macros.if_macro import If_macro_provider
from macros.literal_value_macros import Number_macro_provider, String_macro_provider
from macros.while_macro import While_macro_provider
from macros.for_macro import For_macro_provider
from macros.local_macro import Local_macro_provider
from macros.fn_macro import Fn_macro_provider
from macros.exists_macro import Exists_macro_provider
from macros.param_macro import Param_macro_provider
from macros.access_chain_macro import Access_macro_provider
from macros.call_macro import Call_macro_provider
from macros.utility_macros import Noop_macro_provider
from macros.solution_macro import Solution_macro_provider
from macros.error_macros import Must_compile_error_macro_provider
from macros.comment_macros import Comment_macro_provider, COMMENT_MACROS
from macros.return_macro import Return_macro_provider
from macros.scope_macro import Scope_macro_provider, SCOPE_MACRO
from macros.type_macro import Type_macro_provider # Added import
from core.node import Node, Position, Macro, Args
from utils.strutil import IndentedStringIO, Joiner
from pipeline.steps import MacroProcessingStep
from core.exceptions import MacroAssertFailed
from pipeline.js_conversion import to_valid_js_ident
from core.macro_registry import Macro_emission_provider, MacroContext, Macro_provider, MacroRegistry
from pipeline.steps import PreprocessingStep
from linking.code_block_linking import CodeBlockLinkingStep  
from pipeline.steps import TypeCheckingStep
from pipeline.steps import TypeRegistrationStep
from pipeline.steps import MustCompileErrorVerificationStep
from pipeline.steps import JavaScriptEmissionStep
from utils.logger import default_logger

class Macrocosm:
    def __init__(self, emission_registry: MacroRegistry, typecheck_registry: MacroRegistry, code_linking_registry: MacroRegistry, preprocess_registry: MacroRegistry, type_registration_registry: MacroRegistry):
        self.nodes: list[Node] = []
        # TODO. incremental is good enough for now, but we'll have to stabilize it.
        #  the last thing you would want is the entire output changing because you added a statement. that's a lot of
        #  unnecessary diff. best way to solve this that i see is to make this block-scoped,
        #  so that each block gets its own incremental. a bit harder, though.
        self.incremental_id = 0
        self.compile_errors: list[dict[str, Any]] = []
        self._js_output: str = ""
        
        # Metadata tracking system to replace TypeMap
        self._node_metadata: dict[int, dict[type, Any]] = {}

        # Dynamic call conventions for user-defined types
        self._dynamic_conventions: dict[str, list[Any]] = {}

        self.root_node: Node | None = None
        
        # Initialize the processing pipeline
        self.processing_steps: list[MacroProcessingStep] = [
            CodeBlockLinkingStep(code_linking_registry), 
            PreprocessingStep(preprocess_registry),
            TypeRegistrationStep(type_registration_registry),
            TypeCheckingStep(typecheck_registry),
            JavaScriptEmissionStep(emission_registry),
            MustCompileErrorVerificationStep()
        ]

        self.registries: dict[str, MacroRegistry] = {}

    def get_new_ident(self, name: str | None):
        ident = f"_{hex(self.incremental_id)}"
        if name:
            ident += f"_{to_valid_js_ident(name)}"
        self.incremental_id += 1
        return ident

    def get_metadata(self, node: Node, metadata_type: type):
        """Get metadata for a node, auto-computing Macro and Args if missing"""
        node_id = id(node)
        default_logger.log("metadata", f"get metadata {str(metadata_type)} for {node_id} {node.content}")
        
        # Auto-compute Macro and Args if not present

        # TODO. why. why does that need to be commented out. this doesn't make any sense. explain. i beg you explain.
        if metadata_type in [Macro, Args] and (node_id not in self._node_metadata or metadata_type not in self._node_metadata[node_id]):
            self._ensure_macro_args_computed(node)

        if node_id in self._node_metadata and metadata_type in self._node_metadata[node_id]:
            return self._node_metadata[node_id][metadata_type]
        
        # Check if there's a default factory from the old TypeMap system
        from utils.utils import TypeMap
        if metadata_type in TypeMap._default_factories:
            value = TypeMap._default_factories[metadata_type]()
            self.set_metadata(node, metadata_type, value)
            return value
        
        raise KeyError(f"No metadata of type {metadata_type} for node")

    def maybe_metadata(self, node: Node, metadata_type: type):
        """Get metadata for a node if it exists, return None otherwise"""
        try:
            return self.get_metadata(node, metadata_type)
        except KeyError:
            return None

    def set_metadata(self, node: Node, metadata_type: type, value: Any):
        """Set metadata for a node"""
        node_id = id(node)
        if node_id not in self._node_metadata:
            self._node_metadata[node_id] = {}
        self._node_metadata[node_id][metadata_type] = value
        default_logger.log("metadata", f"set metadata {str(metadata_type)} {str(value)} for {id(node)} {node.content}")

    def invalidate_metadata(self, node: Node):
        """Invalidate metadata for a node and all its descendants when tree changes"""
        node_id = id(node)
        if node_id in self._node_metadata:
            del self._node_metadata[node_id]
        
        # Recursively invalidate children
        for child in node.children:
            self.invalidate_metadata(child)

    def _ensure_macro_args_computed(self, node: Node):
        """Ensure Macro and Args metadata is computed for a node"""
        from core.node import Macro, Args
        from utils.strutil import cut
        
        macro, args = cut(node.content, " ")
        self.set_metadata(node, Macro, macro)
        self.set_metadata(node, Args, args)

    def register(self, node: Node):
        self.nodes.append(node)

    def assert_(self, must_be_true: bool, node: Node, message: str, error_type: str = None, extra_fields: dict[str, Any] = None):
        if not must_be_true:
            from utils.error_types import ErrorType
            if error_type is None:
                error_type = ErrorType.ASSERTION_FAILED
            self.compile_error(node, f"failed to assert: {message}", error_type, extra_fields)
            raise MacroAssertFailed(message)

    def compile_error(self, node: Node, error: str, error_type: str, extra_fields: dict[str, Any] = None):
        """Add a compile error with explicit error type."""
        pos = node.pos or Position(0, 0)
        entry: dict[str, Any] = { # TODO dataclass
            "recoverable": False, # TODO
            "line": pos.line,
            "char": pos.char,
            "content": node.content,
            "error": error,
            "error_type": error_type
        }
        if extra_fields:
            entry.update(extra_fields)
        self.compile_errors.append(entry)

    def compile(self):
        # Discover macros first
        with default_logger.indent("compile", "discovering macros"):
            for node in self.nodes:
                self.__discover_macros(node)
            
        solution_node = self.make_node("67lang:solution", Position(0, 0), self.nodes or [])
        self.root_node = solution_node
            
        # Execute the processing pipeline
        for step in self.processing_steps:
            step_name = step.__class__.__name__
            with default_logger.indent("compile", f"processing step: {step_name}"):
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
        self._ensure_macro_args_computed(node)
        for child in node.children:
            self.__discover_macros(child)

    def make_node(self, content: str, pos: Position, children: None | list[Node]) -> Node:
        n = Node(content, pos, children)
        self.__discover_macros(n)
        return n

    def add_dynamic_convention(self, name: str, convention: Any):
        if name not in self._dynamic_conventions:
            self._dynamic_conventions[name] = []
        self._dynamic_conventions[name].append(convention)

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

def create_macrocosm() -> Macrocosm:
    # creates it with all the necessary macros registered
    macro_providers: dict[str, Macro_provider] = {
        "while": While_macro_provider(),
        "for": For_macro_provider(),
        "int": Number_macro_provider(int),
        "float": Number_macro_provider(float),
        "string": String_macro_provider("string"),
        "regex": String_macro_provider("regex"),
        "if": If_macro_provider(),
        "list": List_macro_provider(),
        "local": Local_macro_provider(),
        "fn": Fn_macro_provider(),
        
        
        
        "67lang:call": Call_macro_provider(),
        "exists": Exists_macro_provider(),
        "noop": Noop_macro_provider(),
        "type": Type_macro_provider(),
        "67lang:assume_local_exists": Noop_macro_provider(),
        "67lang:solution": Solution_macro_provider(),
        "must_compile_error": Must_compile_error_macro_provider(),
        "param": Param_macro_provider(),
        "a": Access_macro_provider(),
        "an": Access_macro_provider(),
        "access": Access_macro_provider(),
        "noscope": Noscope_macro_provider(),
        "return": Return_macro_provider(),
    }

    for macro in COMMENT_MACROS:
        macro_providers[macro] = Comment_macro_provider()

    for macro in SCOPE_MACRO:
        macro_providers[macro] = Scope_macro_provider()

    literally = {
        "true": "true",
        "false": "false",
        "break": "break",
        "continue": "continue",
        "dict": "{}"
    }

    # TODO, this should be... elsewhere.
    class Literal_macro_provider(Macro_emission_provider):
        def __init__(self, value: str):
            self.value = value
        def emission(self, ctx: MacroContext):
            ctx.expression_out.write(self.value)
        # TODO, type checking, for booleans...
    
    for k, v in literally.items():
        macro_providers[k] = Literal_macro_provider(v)

    for name, provider in macro_providers.items():
        default_logger.registry(f"registering macro '{name}' -> {provider.__class__.__name__}")

    registries = {}
    def create_registry(name: str):
        registry = MacroRegistry()
        registries[name] = registry
        return registry
    
    
    # how FUCKING ironic to have to write such code in a language
    # that doesn't offer macros only to create a new language
    # that would trivially implement this with zero repetition?

    preprocess = create_registry("preprocess")
    typecheck = create_registry("typecheck")
    emission = create_registry("emission")
    type_registration = create_registry("type_registration")
    
    # this is the new way of doing things
    # we still need to bridge this to the old way, for now
    # TODO - remove the old way
    
    code_linking_registry = create_registry("code_linking")

    for macro, provider in macro_providers.items():
        preprocess.add_fn(getattr(provider, "preprocess", None), macro)
        typecheck.add_fn(getattr(provider, "typecheck", None), macro)
        emission.add_fn(getattr(provider, "emission", None), macro)
        type_registration.add_fn(getattr(provider, "register_type", None), macro)
        code_linking_registry.add_fn(getattr(provider, "code_linking", None), macro)  
    
    rv = Macrocosm(emission, typecheck, code_linking_registry, preprocess, type_registration)
    rv.registries.update(registries)
    return rv
    