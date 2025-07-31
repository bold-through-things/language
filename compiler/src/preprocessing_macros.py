from dataclasses import replace
from processor_base import MacroProcessingStep, singleton
from macro_registry import MacroContext, MacroRegistry
from node import Indexers, Callers, Macro, Args, Target, Params, Position, Node
from common_utils import get_single_arg
from logger import default_logger

# Legacy registries - will be moved into steps
preprocessor = MacroRegistry()

@singleton  
class SubstitutingMacro:
    def __init__(self):
        @preprocessor.add("substituting")
        def _(ctx: MacroContext):
            args = get_single_arg(ctx, "sub must have one argument")
            parent = ctx.node.parent
            
            default_logger.macro(f"substituting '{args}'")
            
            assert parent != None
            
            indexers = ctx.compiler.get_metadata(parent, Indexers)
            if len(ctx.node.children) >= 1:
                default_logger.debug(f"substituting '{args}' with {len(ctx.node.children)} child nodes")
                indexers.mapping[args] = ctx.node.children
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                default_logger.debug(f"substituting '{args}' with literal access")
                access = ctx.compiler.make_node(f"a {args}", ctx.node.pos or Position(0, 0), children=None)
                indexers.mapping[args] = [access]
            # DON'T erase the node - leave it as a contextual modifier for expanded form
            # parent.replace_child(ctx.node, None)

@singleton
class CallingMacro:
    def __init__(self):
        @preprocessor.add("calling")
        def _(ctx: MacroContext):
            args = get_single_arg(ctx, "call must have one argument")
            parent = ctx.node.parent
            
            default_logger.macro(f"calling '{args}' with {len(ctx.node.children)} children")
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) >= 1, ctx.node, "call must have at least one child")
            callers = ctx.compiler.get_metadata(parent, Callers)
            callers.mapping[args] = ctx.node.children
            # DON'T erase the node - leave it as a contextual modifier for expanded form
            # parent.replace_child(ctx.node, None)

@singleton
class InsideMacro:
    def __init__(self):
        @preprocessor.add("inside")
        def _(ctx: MacroContext):
            args = ctx.compiler.get_metadata(ctx.node, Args)
            parent = ctx.node.parent
            
            default_logger.macro(f"processing inside macro")
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "inside must have one child")
            ctx.compiler.assert_(args.strip() == "", ctx.node, "inside must have no arguments")
            parent_macro = ctx.compiler.get_metadata(parent, Macro)
            ctx.compiler.assert_(parent_macro == "exists", ctx.node, "inside must be inside exists")
            ctx.compiler.set_metadata(parent, Target, ctx.node.children[0])
            # DON'T erase the node - leave it as a contextual modifier for expanded form
            # parent.replace_child(ctx.node, None)
            default_logger.macro(f"inside macro processed, target set to: {ctx.node.children[0].content}")

@singleton
class ParamMacro:
    def __init__(self):
        @preprocessor.add("param")
        def _(ctx: MacroContext):
            args = get_single_arg(ctx, "param must have one argument - the name")
            parent = ctx.node.parent
            
            default_logger.macro(f"param '{args}'")
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
            parent_macro = ctx.compiler.get_metadata(parent, Macro)
            ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
            params = ctx.compiler.get_metadata(parent, Params)
            params.mapping[args] = True

@singleton
class AccessMacro:
    def __init__(self):
        @preprocessor.add("a", "an", "access")
        def _(ctx: MacroContext):
            args = ctx.compiler.get_metadata(ctx.node, Args)
            parent = ctx.node.parent
            
            assert parent != None
            # Check if there are any modifiers (substituting, calling) or if access has children that would require preprocessing
            indexers_metadata = ctx.compiler.maybe_metadata(ctx.node, Indexers)
            indexers = getattr(indexers_metadata, "mapping", {})
            callers_metadata = ctx.compiler.maybe_metadata(ctx.node, Callers)
            callers = getattr(callers_metadata, "mapping", {})
            subs = indexers | callers
            
            # Only preprocess if there are modifiers OR if this access has complex children
            children = list(filter(lambda n: not n.content.startswith("noscope"), ctx.node.children))
            has_modifiers = len(subs) > 0
            has_complex_children = len(children) > 0
            
            if not has_modifiers and not has_complex_children:
                default_logger.macro(f"access macro '{args}' has no modifiers or complex children, skipping preprocessing")
                return
                
            # Original preprocessing logic
            steps: list[str] = args.split(" ")
            last_chain_ident = None
            replace_with: list[Node] = []
            p0 = Position(0, 0)
            
            from processor_base import builtin_calls
            
            for step in steps:
                ident = ctx.compiler.get_new_ident(step)
                step_is_last = step == steps[-1]
                children = list(filter(lambda n: not n.content.startswith("noscope"), ctx.node.children))
                step_needs_call = step in builtin_calls or (step_is_last and len(children) > 1) or step in callers
                args1: list[Node] = []
                if step in subs:
                    args1 = subs[step]
                if step_is_last:
                    args1 += ctx.node.children

                local: list[Node] = []
                if step in indexers:
                    # index
                    local.append(ctx.compiler.make_node(f"PIL:access_index {last_chain_ident}", ctx.node.pos or p0, args1))
                    for arg in args1:                        
                        assert isinstance(ctx.current_step, PreprocessingStep)
                        ctx.current_step.process_node(replace(ctx, node=arg))
                elif step_needs_call:
                    # call or set
                    self_arg = []
                    if last_chain_ident:
                        self_arg = [ctx.compiler.make_node(f"PIL:access_local {last_chain_ident}", ctx.node.pos or p0, [])]
                    local.append(ctx.compiler.make_node(f"PIL:call {step}", ctx.node.pos or p0, self_arg + args1))
                    local.append(ctx.compiler.make_node("PIL:auto_type", ctx.node.pos or p0, []))
                    for arg in args1:
                        assert isinstance(ctx.current_step, PreprocessingStep)
                        ctx.current_step.process_node(replace(ctx, node=arg))
                else:
                    # static field
                    access = f"access_field {last_chain_ident}" if last_chain_ident else "access_local"
                    local.append(ctx.compiler.make_node(f"PIL:{access} {step}", ctx.node.pos or p0, args1))
                    local.append(ctx.compiler.make_node("PIL:auto_type", ctx.node.pos or p0, []))
                    for arg in args1:
                        assert isinstance(ctx.current_step, PreprocessingStep)
                        ctx.current_step.process_node(replace(ctx, node=arg))

                local_node = ctx.compiler.make_node(f"local {ident}", ctx.node.pos or p0, children=local)
                last_chain_ident = ident
                replace_with.append(local_node)
                
            replace_with = list(filter(None, [ctx.compiler.make_node("noscope", ctx.node.pos or p0, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
            parent.replace_child(ctx.node, replace_with)

class PreprocessingStep(MacroProcessingStep):
    """Handles preprocessing like access macro unrolling"""
    
    def __init__(self):
        super().__init__()
        # Move preprocessor macros into this step
        self.macros = preprocessor
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node using the preprocessor registry"""
        default_logger.macro(f"preprocessing node: {ctx.node.content}")
        
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
            with ctx.compiler.safely:
                all_preprocessors[macro](ctx)
        else:
            default_logger.macro(f"no preprocessor for macro: {macro}")

# Instantiate singletons
SubstitutingMacro()
CallingMacro()
InsideMacro()
ParamMacro()
AccessMacro()