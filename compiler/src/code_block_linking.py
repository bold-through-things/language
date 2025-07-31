from dataclasses import replace
from processor_base import MacroProcessingStep
from macro_registry import MacroContext
from node import Node, Macro
from logger import default_logger

class CodeBlockAssociator:
    def __init__(self):
        # This runs on every node type to check for code block associations
        self.all_macros = set()
        
    def register_for_all_macros(self):
        """Register this processor for all possible macro types"""
        # Code block association is handled by the CodeBlockLinkingStep
        pass
        
    def process_code_blocks(self, node: Node, compiler):
        """Process code block associations for a node"""
        # associate code blocks with relevant headers
        CODE_BLOCK_HEADERS = {
            "if": "then",
            "while": "do", 
            "for": "do",
            "fn": "do"
        }
        
        children = node.children
        default_logger.codegen(f"checking {len(children)} children for code block associations")
        
        for i in range(len(children)):
            current = children[i]
            next_child = children[i+1] if i+1 < len(children) else None

            if not current or not next_child:
                continue

            current_macro = str(compiler.get_metadata(current, Macro))
            if current_macro in CODE_BLOCK_HEADERS:
                expected_next = CODE_BLOCK_HEADERS[current_macro]
                next_macro = str(compiler.get_metadata(next_child, Macro))
                default_logger.codegen(f"found '{current_macro}' expecting '{expected_next}', got '{next_macro}'")
                if next_macro == expected_next:
                    default_logger.codegen(f"linking '{next_macro}' to '{current_macro}'")
                    node.replace_child(next_child, None)
                    current.append_child(next_child)
                else:
                    default_logger.codegen(f"no link: expected '{expected_next}' but found '{next_macro}'")
                # Note: not raising error here to make it optional

class CodeBlockLinkingStep(MacroProcessingStep):
    """Handles linking code blocks to headers (e.g. do -> for)"""
    
    def __init__(self):
        super().__init__()
        self.associator = CodeBlockAssociator()
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process code block associations for a node"""
        default_logger.codegen(f"processing code block linking for: {ctx.node.content}")
        
        # Process children first
        with default_logger.indent("codegen", f"processing children of {ctx.node.content}"):
            for i, child in enumerate(ctx.node.children):
                with default_logger.indent("codegen", f"child {i}: {child.content}"):
                    with ctx.compiler.safely:
                        child_ctx = replace(ctx, node=child)
                        self.process_node(child_ctx)
                
        # Process current node
        with default_logger.indent("codegen", f"linking code blocks for {ctx.node.content}"):
            with ctx.compiler.safely:
                self.associator.process_code_blocks(ctx.node, ctx.compiler)