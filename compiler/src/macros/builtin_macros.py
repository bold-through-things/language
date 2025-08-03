from processor_base import builtins
from macro_registry import MacroContext
from node import Macro

# Legacy registries - will be moved into steps

@macros.add(*[b for b in builtins.keys()])
def builtin(ctx: MacroContext):
    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    ctx.compiler.compile_fn_call(ctx, f"await _67lang.{builtins[macro]}(", ctx.node.children)