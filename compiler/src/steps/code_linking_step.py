from dataclasses import replace
from macro_registry import MacroContext, MacroRegistry
from node import Node, Macro
from logger import default_logger
from error_types import ErrorType
from steps.base_step import BaseProcessingStep
from registry_container import RegistryContainer

class CodeBlockLinkingStep(BaseProcessingStep):
    """Handles code block linking between headers and their associated blocks"""
    
    def __init__(self, registries: RegistryContainer):
        super().__init__(registries)
        self._register_macros()
        
    def get_macros(self) -> MacroRegistry:
        return self.registries.get_code_linking()
        
    def _register_macros(self):
        """Register code linking macros"""
        # Import existing code block linking
        from macros.comment_macros import code_linking
        
        # Copy all macros from the existing code linking registry  
        for name, macro in code_linking.all().items():
            self.get_macros()._registry[name] = macro
            
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for code block linking"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        macros = self.get_macros().all()
        
        # Check if there's a specific linking macro for this node type
        if macro in macros:
            macros[macro](ctx)
            return
        
        # Process children first
        default_logger.codegen(f"processing children of {ctx.node.content}")
        for i, child in enumerate(ctx.node.children):
            default_logger.codegen(f"child {i}: {child.content}")
            with ctx.compiler.safely:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
                
        # Process current node for code block linking
        default_logger.codegen(f"linking code blocks for {ctx.node.content}")
        with ctx.compiler.safely:
            self._process_code_blocks(ctx.node, ctx.compiler)
            
    def _process_code_blocks(self, node: Node, compiler):
        """Process code block associations for a node"""
        # associate code blocks with relevant headers
        CODE_BLOCK_HEADERS = {
            "if": "then",
            "while": "do", 
            "for": "do",
            "fn": "do"
        }
        
        children = node.children
        default_logger.codegen(f"checking node '{node.content}' for code block associations")
        
        for i in range(len(children)):
            current = children[i]
            next_child = children[i+1] if i+1 < len(children) else None

            if not current or not next_child:
                continue

            current_macro = str(compiler.get_metadata(current, Macro))
            if current_macro in CODE_BLOCK_HEADERS:
                expected_next = CODE_BLOCK_HEADERS[current_macro]
                next_macro = str(compiler.get_metadata(next_child, Macro))
                
                default_logger.codegen(f"checking code block: {current_macro} expects {expected_next}, found {next_macro}")
                
                if next_macro != expected_next:
                    # Check if the next node is a missing 'do' for for/while loops
                    if current_macro in ["for", "while"] and expected_next == "do":
                        compiler.assert_(False, current, f"{current_macro} loop must be followed by 'do' block, but found '{next_child.content}'", ErrorType.MISSING_CODE_BLOCK)
                    else:
                        default_logger.codegen(f"code block mismatch: {current_macro} expects {expected_next} but found {next_macro}")
                else:
                    default_logger.codegen(f"code block correctly linked: {current_macro} -> {next_macro}")
                    
                    # Actually link the code blocks by moving the do block
                    node.replace_child(next_child, None)  # Remove from current parent
                    current.append_child(next_child)      # Add as child of for/if/while
                    
                    # Simple code block association using Target metadata
                    from node import Target
                    compiler.set_metadata(current, Target, next_child)
                    
                    # Mark the code block as processed
                    compiler.set_metadata(next_child, Target, current)