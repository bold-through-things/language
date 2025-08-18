from dataclasses import asdict, replace
from pipeline.steps import MacroProcessingStep, seek_child_macro
from pipeline.builtin_calls import builtin_calls, DirectCall, LocalAccessCall, js_field_access
from pipeline.js_conversion import to_valid_js_ident
from pipeline.local_lookup import walk_upwards_for_local_definition
from utils.strutil import cut
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider, MacroRegistry
from utils.strutil import IndentedStringIO, Joiner
from core.node import Args, Macro, Params, Inject_code_start, SaneIdentifier, ResolvedConvention
from utils.common_utils import collect_child_expressions, get_single_arg, get_two_args
from utils.error_types import ErrorType
from utils.logger import default_logger
from compiler_types.type_hierarchy import type_hierarchy, union_types

class TypeHierarchyChecker:
    def __init__(self, hierarchy, unions):
        self.hierarchy = hierarchy
        self.unions = unions

    def is_subtype(self, child, parent):
        if child == parent:
            return True

        if parent in self.unions:
            for member in self.unions[parent]:
                if self.is_subtype(child, member):
                    return True

        if child not in self.hierarchy:
            return False
        
        return self.is_subtype(self.hierarchy[child], parent)

type_checker = TypeHierarchyChecker(type_hierarchy, union_types)

class Call_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def _matches_signature(self, actual_types: list[str], demanded_types: list[str]) -> bool:
        default_logger.typecheck(f"_matches_signature: actual={actual_types}, demanded={demanded_types}")
        if demanded_types is None:
            return True # No specific demands, so it matches
        """Check if actual parameter types match the demanded signature"""
        if len(actual_types) != len(demanded_types):
            return False
        
        for actual, demanded in zip(actual_types, demanded_types):
            # "*" matches anything
            if demanded == "*" or actual == "*":
                continue
            if not type_checker.is_subtype(actual, demanded):
                default_logger.typecheck(f"_matches_signature: {actual} is not a subtype of {demanded}")
                return False
        default_logger.typecheck(f"_matches_signature: match! {actual_types} {demanded_types}")
        return True

    def _resolve_local_definition(self, ctx: MacroContext, fn: str) -> list:
        res = walk_upwards_for_local_definition(ctx, fn)
        if res:
            from pipeline.builtin_calls import LocalAccessCall
            macro = ctx.compiler.get_metadata(res.node, Macro)
            if macro in {"local", "67lang:assume_local_exists"}:
                name = get_single_arg(replace(ctx, node=res.node))
                fn = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
                return [
                    # get
                    LocalAccessCall(fn=fn, demands=[], returns=res.type),
                    # set
                    LocalAccessCall(fn=fn, demands=[res.type], returns=res.type)
                ]
        return []

    def _resolve_builtin_call(self, ctx: MacroContext, fn: str) -> list:
        if fn in builtin_calls:
            overloads = builtin_calls[fn]
            if isinstance(overloads, list):
                return overloads
            else:
                return [overloads]
        return []

    def _resolve_dynamic_convention(self, ctx: MacroContext, fn: str) -> list:
        if fn in ctx.compiler._dynamic_conventions:
            overloads = ctx.compiler._dynamic_conventions[fn]
            if isinstance(overloads, list):
                return overloads
            else:
                return [overloads]
        return []

    def resolve_convention(self, ctx: MacroContext, actual_arg_types: list[str] = None):
        args_str = ctx.compiler.get_metadata(ctx.node, Args)
        args = args_str.split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")

        fn = args[0]

        all_possible_conventions = []
        all_possible_conventions.extend(self._resolve_local_definition(ctx, fn))
        all_possible_conventions.extend(self._resolve_builtin_call(ctx, fn))
        all_possible_conventions.extend(self._resolve_dynamic_convention(ctx, fn))

        default_logger.log("testing_123", f"all_possible_conventions: {repr(all_possible_conventions)}")

        convention = None
        if actual_arg_types:
            matching_conventions = []
            for conv in all_possible_conventions:
                if self._matches_signature(actual_arg_types, conv.demands):
                    matching_conventions.append(conv)
            
            if len(matching_conventions) > 1:
                # Choose the most specific match based on demand specificity
                def specificity_score(conv):
                    if not hasattr(conv, 'demands') or not conv.demands:
                        return (0, 0)  # No demands, least specific
                    # Count non-wildcard types (higher score = more specific)
                    specific_count = sum(1 for d in conv.demands if d != "*")
                    # Tie-breaker: prefer shorter signatures when specificity is equal
                    return (specific_count, -len(conv.demands))
                
                most_specific = max(matching_conventions, key=specificity_score)
                max_score = specificity_score(most_specific)
                
                # Check if there are multiple conventions with the same highest specificity
                equally_specific = [conv for conv in matching_conventions if specificity_score(conv) == max_score]
                
                if len(equally_specific) > 1:
                    def overload_to_dict(o):
                        d = asdict(o)
                        d["convention"] = type(o).__name__
                        return d
                    matching_overloads = [overload_to_dict(o) for o in equally_specific]
                    ctx.compiler.assert_(False, ctx.node, f"multiple equally specific overloads match for {fn} with arguments {actual_arg_types}", ErrorType.AMBIGUOUS_OVERLOAD, extra_fields={"matching_overloads": matching_overloads})
                else:
                    convention = most_specific
            elif len(matching_conventions) == 1:
                convention = matching_conventions[0]
        else:
            # If no type information, filter by argument count and pick the first one
            if all_possible_conventions:
                # Filter conventions that match the argument count
                arg_count = len(ctx.node.children)
                count_matching_conventions = []
                for conv in all_possible_conventions:
                    if conv.demands is None or len(conv.demands) == arg_count:
                        count_matching_conventions.append(conv)
                
                if count_matching_conventions:
                    convention = count_matching_conventions[0]
                else:
                    # No conventions match the argument count
                    convention = None

        if not convention:
            def overload_to_dict(o):
                d = asdict(o)
                d["convention"] = type(o).__name__
                return d
            available_overloads = [overload_to_dict(o) for o in all_possible_conventions]
            ctx.compiler.assert_(False, ctx.node, f"could not find a matching overload for {fn} with arguments {actual_arg_types}", ErrorType.NO_MATCHING_OVERLOAD, extra_fields={"visible_overloads": available_overloads})

        return convention

    def typecheck(self, ctx: MacroContext):
        # First, determine the actual parameter types
        args: list[str | None] = []
        for child in ctx.node.children:
            # Find the typecheck step to handle type checking
            typecheck_step = ctx.current_step
            # Import here to avoid circular imports
            from pipeline.steps import TypeCheckingStep
            assert isinstance(typecheck_step, TypeCheckingStep)
            received = typecheck_step.process_node(replace(ctx, node=child))
            args.append(received)
        args = [a for a in args if a]

        # Now resolve the convention with actual parameter types
        convention = self.resolve_convention(ctx, args)
        
        # Store the resolved convention in metadata for later use during compilation
        ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention(convention=convention))

        # TODO: add assertion for argument count
        if convention.demands:
            i = 0
            for received, demanded in zip(args, convention.demands):
                i += 1
                if "*" in {demanded, received}:
                    # TODO. generics!
                    continue
                default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received}")
                # TODO - this should point to the child node that we received from, actually...
                ctx.compiler.assert_(type_checker.is_subtype(received, demanded), ctx.node, f"argument {i} demands {demanded} and is given {received}", ErrorType.ARGUMENT_TYPE_MISMATCH)

        return convention.returns or "*"

    def emission(self, ctx: MacroContext):
        try:
            args_str = ctx.compiler.get_metadata(ctx.node, Args)
            args1 = args_str.split(" ")
            ident = ctx.compiler.get_new_ident("_".join(args1))
            
            # Try to get the resolved convention from metadata first
            try:
                resolved_conv = ctx.compiler.get_metadata(ctx.node, ResolvedConvention)
                convention = resolved_conv.convention
            except KeyError:
                # Fallback to the old method if metadata not available
                convention = self.resolve_convention(ctx)
            
            args = collect_child_expressions(ctx)

            call = convention.compile(args)

            ctx.statement_out.write(f"const {ident} = await {call}\n")
            ctx.expression_out.write(ident)
        except Exception as e:
            # If the entire call emission fails, produce invalid JavaScript to prevent cascading crashes
            default_logger.debug(f"Call emission failed for {ctx.node.content}: {e}, producing error marker")
            args_str = ctx.compiler.get_metadata(ctx.node, Args)
            args1 = args_str.split(" ")
            ident = ctx.compiler.get_new_ident("_".join(args1))
            ctx.statement_out.write(f"const {ident} = ??????COMPILE_ERROR;\n")
            ctx.expression_out.write(ident)
