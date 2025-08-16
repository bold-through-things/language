"""Parameter definition macro for functions."""

from core.macro_registry import MacroContext, Macro_preprocess_provider
from core.node import Macro, Params
from utils.common_utils import get_single_arg


class Param_macro_provider(Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        args = get_single_arg(ctx, "param must have one argument - the name")
        parent = ctx.node.parent
        
        assert parent != None
        ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
        parent_macro = ctx.compiler.get_metadata(parent, Macro)
        ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
        params = ctx.compiler.get_metadata(parent, Params)
        params.mapping[args] = True