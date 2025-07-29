from dataclasses import replace
from processor_base import MacroProcessingStep
from macro_registry import MacroContext
from node import Node, Macro

class CodeBlockAssociator:
    def __init__(self):
        # This runs on every node type to check for code block associations
        self.all_macros = set()
        
    def register_for_all_macros(self):
        """Register this processor for all possible macro types"""
        # Code block association is handled by the CodeBlockLinkingStep
        pass
        
    def process_code_blocks(self, node: Node):
        """Process code block associations for a node"""
        # associate code blocks with relevant headers
        CODE_BLOCK_HEADERS = {
            "if": "then",
            "while": "do", 
            "for": "do",
            "fn": "do"
        }
        
        children = node.children
        for i in range(len(children)):
            current = children[i]
            next_child = children[i+1] if i+1 < len(children) else None

            if not current or not next_child:
                continue

            current_macro = str(current.metadata[Macro])
            if current_macro in CODE_BLOCK_HEADERS:
                expected_next = CODE_BLOCK_HEADERS[current_macro]
                next_macro = str(next_child.metadata[Macro])
                if next_macro == expected_next:
                    node.replace_child(next_child, None)
                    current.append_child(next_child)
                # Note: not raising error here to make it optional

class CodeBlockLinkingStep(MacroProcessingStep):
    """Handles linking code blocks to headers (e.g. do -> for)"""
    
    def __init__(self):
        super().__init__()
        self.associator = CodeBlockAssociator()
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process code block associations for a node"""
        # Process children first
        for child in ctx.node.children:
            with ctx.compiler.safely:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
                
        # Process current node
        with ctx.compiler.safely:
            self.associator.process_code_blocks(ctx.node)