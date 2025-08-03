"""
Access macro implementation with proper WHERE clause handling
Copied from reference preprocessing_macros.py lines 72-175
"""

from macro_registry import MacroRegistry, MacroContext
from node import Args, Macro, Position, Node
from dataclasses import replace
from common_utils import get_single_arg
from logger import default_logger
from strutil import cut
from processor_base import singleton


def register_access_macro_with_where_support(registry: MacroRegistry):
    """Register the access macro with full WHERE clause support from reference"""
    
    @singleton
    class AccessMacro:
        def __init__(self):
            @registry.add("a", "an", "access")
            def _(ctx: MacroContext):
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
                
                # Import builtin_calls from working_macros
                from working_macros import builtin_calls
                
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

    # Initialize the singleton to register the macro
    AccessMacro()
    print("DEBUG: Registered access macro with WHERE clause support")