from dataclasses import replace
from processor_base import MacroProcessingStep, singleton
from macro_registry import MacroContext, MacroRegistry
from node import Indexers, Callers, Macro, Args, Target, Params, Position, Node

# Legacy registries - will be moved into steps
preprocessor = MacroRegistry()

@singleton  
class SubstitutingMacro:
    def __init__(self):
        @preprocessor.add("substituting")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args]
            parent = ctx.node.parent
            
            assert parent != None
            ctx.compiler.assert_(args.find(" ") == -1, ctx.node, "sub must have one argument")
            
            if len(ctx.node.children) >= 1:
                parent.metadata[Indexers].mapping[args] = ctx.node.children
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                access = ctx.compiler.make_node(f"a {args}", ctx.node.pos or Position(0, 0), children=None)
                parent.metadata[Indexers].mapping[args] = [access]
            parent.replace_child(ctx.node, None)

@singleton
class CallingMacro:
    def __init__(self):
        @preprocessor.add("calling")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args]
            parent = ctx.node.parent
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) >= 1, ctx.node, "call must have at least one child")
            ctx.compiler.assert_(args.find(" ") == -1, ctx.node, "call must have one argument")
            parent.metadata[Callers].mapping[args] = ctx.node.children
            parent.replace_child(ctx.node, None)

@singleton
class InsideMacro:
    def __init__(self):
        @preprocessor.add("inside")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args]
            parent = ctx.node.parent
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "inside must have one child")
            ctx.compiler.assert_(args.strip() == "", ctx.node, "inside must have no arguments")
            ctx.compiler.assert_(parent.metadata[Macro] == "exists", ctx.node, "inside must be inside exists")
            parent.metadata[Target] = ctx.node.children[0]
            parent.replace_child(ctx.node, None)

@singleton
class ParamMacro:
    def __init__(self):
        @preprocessor.add("param")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args]
            parent = ctx.node.parent
            
            assert parent != None
            ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
            ctx.compiler.assert_(args.find(" ") == -1, ctx.node, "param must have one argument - the name")
            ctx.compiler.assert_(parent.metadata[Macro] == "fn", ctx.node, "params must be inside fn")
            parent.metadata[Params].mapping[args] = True

@singleton
class AccessMacro:
    def __init__(self):
        @preprocessor.add("a", "an", "access")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args]
            parent = ctx.node.parent
            
            assert parent != None
            # since children are preprocessed first, we already have Callers and Indexers!
            steps: list[str] = args.split(" ")
            indexers = getattr(ctx.node.metadata.maybe(Indexers), "mapping", {})
            callers = getattr(ctx.node.metadata.maybe(Callers), "mapping", {})
            subs = indexers | callers
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
        # Process children first
        for child in ctx.node.children:
            with ctx.compiler.safely:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
        
        # Process current node  
        macro = str(ctx.node.metadata[Macro])
        all_preprocessors = self.macros.all()
        
        if macro in all_preprocessors:
            with ctx.compiler.safely:
                all_preprocessors[macro](ctx)