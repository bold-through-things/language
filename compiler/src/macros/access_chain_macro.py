"""Access chain macro for handling complex field access patterns."""

from dataclasses import replace
from core.macro_registry import MacroContext, Macro_preprocess_provider
from core.node import Args, Position
from pipeline.steps import PreprocessingStep
from utils.strutil import cut


class Access_macro_provider(Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        parent = ctx.node.parent
        
        assert parent != None
        assert ctx.node.content.split(" ")[0] in {"a", "an", "access"}, ctx.node.content
        
        # contextually process substituting and calling modifiers among children
        callers = {}
        other_children = []
        
        for child in ctx.node.children:
            macro, _ = cut(child.content, " ")
            if macro == "where" and "takes" in child.content:
                # New syntax: "where $id takes"
                parts = child.content.split(" ")
                if len(parts) >= 3 and parts[2] == "takes":
                    key = parts[1]
                else:
                    ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
                
                ctx.compiler.assert_(len(child.children) >= 1, child, "calling must have at least one child")
                callers[key] = child.children
            else:
                other_children.append(child)
        
        steps: list[str] = args.split(" ")
        last_chain_ident = None
        replace_with: list = []
        p0 = Position(0, 0)
        
        nodes_to_process: list = []

        for i, step in enumerate(steps):
            ident = ctx.compiler.get_new_ident(step)
            step_is_last = step == steps[-1]
            
            args1: list = []
            if step in callers:
                args1 = callers[step]
            if step_is_last:
                args1 += other_children

            local: list = []
            
            self_arg = []
            if last_chain_ident:
                self_arg = [ctx.compiler.make_node(f"67lang:call {last_chain_ident}", ctx.node.pos or p0, [])]
            
            local.append(ctx.compiler.make_node(f"67lang:call {step}", ctx.node.pos or p0, self_arg + args1))
            nodes_to_process.extend(args1)

            local_node = ctx.compiler.make_node(f"local {ident}", ctx.node.pos or p0, children=local)
            nodes_to_process.append(local_node)
            last_chain_ident = ident
            replace_with.append(local_node)
            
        replace_with = list(filter(None, [ctx.compiler.make_node("noscope", ctx.node.pos or p0, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
        parent.replace_child(ctx.node, replace_with)

        for node in nodes_to_process:
            assert isinstance(ctx.current_step, PreprocessingStep)
            ctx.current_step.process_node(replace(ctx, node=node))