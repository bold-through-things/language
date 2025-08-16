from typing import Literal, Type, Union
from utils.error_types import ErrorType
from core.macro_registry import Macro_code_linking_provider, Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider, MacroContext
from core.node import Args

class Number_macro_provider(
        Macro_preprocess_provider,
        Macro_typecheck_provider,
        Macro_emission_provider
    ):
    def __init__(self, number_type: Type[Union[int, float]]):
        self.number_type = number_type

    def preprocess(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        try:
            self.number_type(args)
        except ValueError:
            error_type = (
                ErrorType.INVALID_INT if self.number_type is int else ErrorType.INVALID_FLOAT
            )
            ctx.compiler.assert_(
                False,
                ctx.node,
                f"{args} must be a valid {self.number_type.__name__} string.",
                error_type,
            )

    def typecheck(self, ctx: MacroContext):
        return self.number_type.__name__

    def emission(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        ctx.expression_out.write(str(args))

class String_macro_provider(
        Macro_typecheck_provider,
        Macro_emission_provider,
        Macro_code_linking_provider
    ):
    def __init__(self, kind: Literal["string", "regex"]):
        self.kind = kind

    def typecheck(self, ctx: MacroContext):
        return "str" if self.kind == "string" else "regex"

    def code_linking(self, _):
        pass

    def emission(self, ctx: MacroContext):
        s: str = ctx.compiler.get_metadata(ctx.node, Args)
        if len(s) == 0:
            # multiline string: collect content from children
            lines = []
            for child in ctx.node.children:
                if child.content:
                    lines.append(child.content)
            s = "\n".join(lines)
        else:
            delim = s[0]
            ctx.compiler.assert_(
                s.endswith(delim),
                ctx.node,
                "must be delimited on both sides with the same character"
            )
            s = s.removeprefix(delim).removesuffix(delim)
        s = s.replace("\n", "\\n")
        s = s.replace('"', '\\"')  # escape quotes during JS string emission
        sep = '"' if self.kind == "string" else "/"
        ctx.expression_out.write(f'{sep}{s}{sep}')
