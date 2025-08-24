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
        from compiler_types.proper_types import INT, FLOAT
        return INT if self.number_type is int else FLOAT

    def emission(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        ctx.expression_out.write(str(args))

class String_macro_provider(
        Macro_preprocess_provider,
        Macro_typecheck_provider,
        Macro_emission_provider,
        Macro_code_linking_provider
    ):
    def __init__(self, kind: Literal["string", "regex"]):
        self.kind = kind

    def preprocess(self, ctx: MacroContext):
        # Allow multiline string content to start with whitespace (preserved indentation)
        pass

    def typecheck(self, ctx: MacroContext):
        from compiler_types.proper_types import STRING
        return STRING if self.kind == "string" else "regex"  # TODO: Create proper regex type

    def code_linking(self, _):
        pass

    def emission(self, ctx: MacroContext):
        s: str = ctx.compiler.get_metadata(ctx.node, Args)
        if len(s) == 0:
            # multiline string: collect content from entire subtree, reconstructing indentation
            lines = []
            
            def collect_content(node, depth=0):
                if node.content:
                    # Reconstruct original indentation by prepending tabs based on depth
                    indented_content = '\t' * depth + node.content
                    lines.append(indented_content)
                for child in node.children:
                    collect_content(child, depth + 1)
            
            for child in ctx.node.children:
                collect_content(child, 0)
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
