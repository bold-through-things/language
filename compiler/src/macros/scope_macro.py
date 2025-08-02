from dataclasses import replace
from processor_base import seek_child_macro, unified_macros
from macro_registry import MacroContext
from node import Inject_code_start

SCOPE_MACRO = ["do", "then", "else", "67lang:file"]

@unified_macros.add(*SCOPE_MACRO)
def scope_macro(ctx: MacroContext):
    from node import Macro
    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    if macro in ["else"]:
        ctx.statement_out.write(f"{macro} ")

    ctx.statement_out.write("{\n")
    with ctx.statement_out:
        ctx.statement_out.write("const parent_scope = scope\n")
        ctx.statement_out.write("{\n")
        with ctx.statement_out:
            ctx.statement_out.write("const scope = _67lang.scope(parent_scope)\n")
            inject = ctx.compiler.maybe_metadata(ctx.node, Inject_code_start)
            if inject:
                for code in inject.code:
                    ctx.statement_out.write(code)
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                child_ctx.current_step.process_node(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}\n")
    ctx.statement_out.write("} ")