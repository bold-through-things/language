from dataclasses import replace
from processor_base import MacroProcessingStep, seek_all_child_macros, seek_child_macro, singleton, unroll_parent_chain
from macro_registry import MacroContext, MacroRegistry
from node import Indexers, Callers, Macro, Args, SaneIdentifier, Target, Params, Position, Node
from common_utils import get_single_arg
from logger import default_logger
from strutil import cut

class PreprocessingStep(MacroProcessingStep):
    """Handles preprocessing like access macro unrolling"""
    
    def __init__(self):
        super().__init__()
        # Create local registry for this step
        self.macros = MacroRegistry()
        
        # Initialize macros for this step
        self._register_macros()
        
    def _register_macros(self):
        """Register all preprocessing macros"""
        # Import and register comment macros
        from macros.comment_macros import COMMENT_MACROS, comments
        self.macros.add(*COMMENT_MACROS)(comments)
        
        # Register preprocessing macros
        @self.macros.add("local")
        def local(ctx: MacroContext):
            desired_name = get_single_arg(ctx)
            actual_name = ctx.compiler.get_new_ident(desired_name)
            ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)

        @self.macros.add("for")
        def preprocess_for(ctx: MacroContext):
            # TODO. yes i really do hate this hack. really what we should just do is unroll `for` into the
            #  manual while true early into the processing
            args = ctx.compiler.get_metadata(ctx.node, Args)
            args = args.split(" ")
            name = args[0] # TODO - this won't support any identifier, it probably should!

            # print("processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])
            ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))
            # print("done processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])

            for child in ctx.node.children:
                ctx.current_step.process_node(replace(ctx, node=child))

        @self.macros.add("fn")
        def preprocess_fn(ctx: MacroContext):
            desired_name = get_single_arg(ctx)
            actual_name = ctx.compiler.get_new_ident(desired_name)
            ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
            
            # TODO - also hate this hack.
            for child in seek_all_child_macros(ctx.node, "param"):
                name = get_single_arg(replace(ctx, node=child))
                ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))

            for child in ctx.node.children:
                ctx.current_step.process_node(replace(ctx, node=child))

        @self.macros.add("param")
        def param_handler(ctx: MacroContext):
            args = get_single_arg(ctx, "param must have one argument - the name")
            parent = ctx.node.parent
            
            default_logger.macro(f"param '{args}'")
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
            parent_macro = ctx.compiler.get_metadata(parent, Macro)
            ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
            params = ctx.compiler.get_metadata(parent, Params)
            params.mapping[args] = True

        @self.macros.add("a", "an", "access")
        def access_handler(ctx: MacroContext):
            args = ctx.compiler.get_metadata(ctx.node, Args)
            parent = ctx.node.parent
            
            assert parent != None
            assert ctx.node.content.split(" ")[0] in {"a", "an", "access"}, ctx.node.content
            
            # contextually process substituting and calling modifiers among children
            indexers = {}
            callers = {}
            other_children = []
            
            for child in ctx.node.children:
                macro, _ = cut(child.content, " ")
                if macro == "where" and "is" in child.content:
                    # New syntax: "where $id is"
                    parts = child.content.split(" ")
                    if len(parts) >= 3 and parts[2] == "is":
                        key = parts[1]
                    else:
                        ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
                    
                    default_logger.macro(f"substituting '{key}'")
                    
                    if len(child.children) >= 1:
                        default_logger.debug(f"substituting '{key}' with {len(child.children)} child nodes")
                        indexers[key] = child.children
                    else:
                        # shortcut for when the substitution is literal (i.e. most cases)
                        default_logger.debug(f"substituting '{key}' with literal access")
                        access = ctx.compiler.make_node(f"a {key}", ctx.node.pos or Position(0, 0), children=None)
                        indexers[key] = [access]
                elif macro == "where" and "takes" in child.content:
                    # New syntax: "where $id takes"
                    parts = child.content.split(" ")
                    if len(parts) >= 3 and parts[2] == "takes":
                        key = parts[1]
                    else:
                        ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
                    
                    default_logger.macro(f"calling '{key}' with {len(child.children)} children")
                    
                    ctx.compiler.assert_(len(child.children) >= 1, child, "calling must have at least one child")
                    callers[key] = child.children
                else:
                    other_children.append(child)
            
            steps: list[str] = args.split(" ")
            subs = indexers | callers
            last_chain_ident = None
            replace_with: list[Node] = []
            p0 = Position(0, 0)
            
            from processor_base import builtin_calls
            
            for step in steps:
                ident = ctx.compiler.get_new_ident(step)
                step_is_last = step == steps[-1]
                children = list(filter(lambda n: not n.content.startswith("noscope"), other_children))
                step_needs_call = step in builtin_calls or (step_is_last and len(children) > 1) or step in callers
                args1: list[Node] = []
                if step in subs:
                    args1 = subs[step]
                if step_is_last:
                    args1 += other_children

                local: list[Node] = []
                if step in indexers:
                    # index
                    local.append(ctx.compiler.make_node(f"67lang:access_index {last_chain_ident}", ctx.node.pos or p0, args1))
                    for arg in args1:                        
                        ctx.current_step.process_node(replace(ctx, node=arg))
                elif step_needs_call:
                    # call or set
                    self_arg = []
                    if last_chain_ident:
                        self_arg = [ctx.compiler.make_node(f"67lang:access_local {last_chain_ident}", ctx.node.pos or p0, [])]
                    local.append(ctx.compiler.make_node(f"67lang:call {step}", ctx.node.pos or p0, self_arg + args1))
                    local.append(ctx.compiler.make_node("67lang:auto_type", ctx.node.pos or p0, []))
                    for arg in args1:
                        ctx.current_step.process_node(replace(ctx, node=arg))
                else:
                    # static field
                    access = f"access_field {last_chain_ident}" if last_chain_ident else "access_local"
                    local.append(ctx.compiler.make_node(f"67lang:{access} {step}", ctx.node.pos or p0, args1))
                    local.append(ctx.compiler.make_node("67lang:auto_type", ctx.node.pos or p0, []))
                    for arg in args1:
                        ctx.current_step.process_node(replace(ctx, node=arg))

                local_node = ctx.compiler.make_node(f"local {ident}", ctx.node.pos or p0, children=local)
                last_chain_ident = ident
                replace_with.append(local_node)
                
            replace_with = list(filter(None, [ctx.compiler.make_node("noscope", ctx.node.pos or p0, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
            # print(f"replace child {ctx.node.content} of {parent.content} with {[c.content for c in replace_with]}")
            parent.replace_child(ctx.node, replace_with)
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node using the preprocessor registry"""
        default_logger.macro(f"preprocessing node: {ctx.node.content}")
        
        # Validate indentation: ensure content doesn't start with whitespace
        if ctx.node.content and ctx.node.content[0].isspace():
            from error_types import ErrorType
            ctx.compiler.compile_error(ctx.node, 
                "this language only accepts tabs for indentation, not spaces! spaces are like, totally uncool. use tabs instead, they're way more precise and semantic.", 
                ErrorType.INVALID_INDENTATION)
            # Don't return early - let the processing continue so we don't break the pipeline
        
        # Process children first
        with default_logger.indent("macro", f"preprocessing children of {ctx.node.content}"):
            for i, child in enumerate(ctx.node.children):
                with default_logger.indent("macro", f"child {i}: {child.content}"):
                    with ctx.compiler.safely:
                        child_ctx = replace(ctx, node=child)
                        self.process_node(child_ctx)
        
        # Process current node  
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_preprocessors = self.macros.all()
        
        if macro in all_preprocessors:
            default_logger.macro(f"applying preprocessor for macro: {macro}")
            # print(f"macro for {ctx.node.content} seems to be {macro}")
            with ctx.compiler.safely:
                all_preprocessors[macro](ctx)
        else:
            default_logger.macro(f"no preprocessor for macro: {macro}")