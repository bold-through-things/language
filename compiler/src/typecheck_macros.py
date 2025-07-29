from dataclasses import replace
from processor_base import MacroProcessingStep, seek_child_macro, seek_parent_scope
from macro_registry import MacroContext, MacroRegistry
from strutil import cut
from node import Node, Position, Scope, Args, Macro

# Legacy registries - will be moved into steps
typecheck = MacroRegistry()

@typecheck.add("PIL:access_local")
def access_local(ctx: MacroContext):
    first, extra = cut(ctx.node.metadata[Args], " ")
    ctx.compiler.assert_(extra == "", ctx.node, "single argument, the name of local")

    typecheck_step = ctx.current_step
    assert isinstance(typecheck_step, TypeCheckingStep)
    types = [typecheck_step.process_node(replace(ctx, node=child)) for child in ctx.node.children]
    types = list(filter(None, types))

    scope = seek_parent_scope(ctx.node)
    from processor_base import unroll_parent_chain
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    name = first
    resolved_field = scope.resolve(name)
    if resolved_field:
        demanded = resolved_field
        if len(types) > 0:
            # TODO - support multiple arguments
            ctx.compiler.assert_(len(types) == 1, ctx.node, f"only support one argument for now (TODO!)")
            received = types[0]
            ctx.compiler.assert_(received in {demanded, "*"}, ctx.node, f"field demands {demanded} but is given {received}")
        print(f"{ctx.node.content} demanded {demanded}")
        return demanded or "*"
    return "*"

@typecheck.add("local")
def local_typecheck(ctx: MacroContext):
    name, _ = cut(ctx.node.metadata[Args], " ")
    type_node = seek_child_macro(ctx.node, "type")

    received = None
    typecheck_step = ctx.current_step
    assert isinstance(typecheck_step, TypeCheckingStep)
    for child in ctx.node.children:
        received = typecheck_step.process_node(replace(ctx, node=child)) or received

    if not type_node:
        # TODO. this should be mandatory.
        if not seek_child_macro(ctx.node, "PIL:auto_type") or not received:
            return received
        type_node = Node(f"type {received}", ctx.node.pos, [])
    
    _, demanded = cut(type_node.content, " ")
    print(f"{ctx.node.content} demanded {demanded} and was given {received}")
    scope = seek_parent_scope(ctx.node)
    from processor_base import unroll_parent_chain
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    scope.mapping[name] = demanded
    ctx.compiler.assert_(received == demanded, ctx.node, f"field demands {demanded} but is given {received}")
    return demanded or received or "*"

@typecheck.add("a")
def access_typecheck(ctx: MacroContext):
    first, extra = cut(ctx.node.metadata[Args], " ")
    if extra:
        # TODO. not implemented. quite complex...
        pass

    typecheck_step = ctx.current_step
    assert isinstance(typecheck_step, TypeCheckingStep)
    types = [typecheck_step.process_node(replace(ctx, node=child)) for child in ctx.node.children]
    types = list(filter(None, types))

    scope = seek_parent_scope(ctx.node)
    from processor_base import unroll_parent_chain
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    name = first
    resolved_field = scope.resolve(name)
    if resolved_field:
        demanded = resolved_field
        if len(types) > 0:
            # TODO - support multiple arguments
            ctx.compiler.assert_(len(types) == 1, ctx.node, f"only support one argument for now (TODO!)")
            received = types[0]
            ctx.compiler.assert_(received == demanded, ctx.node, f"field demands {demanded} but is given {received}")
        return demanded

SCOPE_MACRO = ["do", "then", "else", "PIL:file"]
@typecheck.add(*SCOPE_MACRO)
def typecheck_scope_macro(ctx: MacroContext):
    parent = seek_parent_scope(ctx.node)
    ctx.node.metadata[Scope] = Scope(parent=parent)
    for child in ctx.node.children:
        assert isinstance(ctx.current_step, TypeCheckingStep)
        ctx.current_step.process_node(replace(ctx, node=child))

class TypeCheckingStep(MacroProcessingStep):
    """Handles type checking"""
    
    def __init__(self):
        super().__init__()
        # Move typecheck macros into this step
        self.macros = typecheck
        
    def process_node(self, ctx: MacroContext) -> None:
        """Type check a single node"""
        macro = str(ctx.node.metadata[Macro])
        all_macros = self.macros.all()
        
        if macro in all_macros:
            with ctx.compiler.safely:
                return all_macros[macro](ctx)
        else:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)