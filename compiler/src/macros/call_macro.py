from dataclasses import asdict, replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtin_calls, DirectCall, seek_child_macro, cut, to_valid_js_ident,
    walk_upwards_for_local_definition, LocalAccessCall
)
from macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, ResolvedConvention
from common_utils import collect_child_expressions, get_single_arg, get_two_args
from error_types import ErrorType
from logger import default_logger
from type_hierarchy import type_hierarchy, union_types

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

    def resolve_convention(self, ctx: MacroContext, actual_arg_types: list[str] = None):
        args_str = ctx.compiler.get_metadata(ctx.node, Args)
        args = args_str.split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
        
        fn = args[0]

        convention = None
        res = walk_upwards_for_local_definition(ctx, fn)
        if res:
            from processor_base import LocalAccessCall
            macro = ctx.compiler.get_metadata(res.node, Macro)
            if macro == "fn":
                fn = ctx.compiler.get_metadata(res.node, SaneIdentifier)
                convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)
            elif macro in {"local", "67lang:assume_local_exists"}:
                name = get_single_arg(replace(ctx, node=res.node))
                fn = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
                convention = LocalAccessCall(fn=fn, demands=[res.type], returns=res.type)
        elif fn in builtin_calls:
            overloads = builtin_calls[fn]
            if isinstance(overloads, list):
                # Multiple overloads - need to match by parameter types
                if actual_arg_types:
                    for overload in overloads:
                        if self._matches_signature(actual_arg_types, overload.demands):
                            convention = overload
                            break
                    else:
                        # No matching overload found
                        def overload_to_dict(o):
                            d = asdict(o)
                            d["convention"] = type(o).__name__
                            return d
                        available_overloads = [overload_to_dict(o) for o in overloads]
                        ctx.compiler.assert_(False, ctx.node, f"could not find a matching overload for {fn} with arguments {actual_arg_types}", ErrorType.NO_MATCHING_OVERLOAD, extra_fields={"visible_overloads": available_overloads})
                else:
                    # No type information available, use first overload
                    convention = overloads[0]
            else:
                # Legacy single overload
                convention = overloads
        elif fn in builtins:
            convention = DirectCall(fn=builtins[fn], demands=None, receiver="_67lang", returns=None)
        else:
            # TODO should use a different ErrorType..?
            ctx.compiler.assert_(False, ctx.node, f"{fn} must refer to a defined function or local", ErrorType.NO_MATCHING_OVERLOAD)

        return convention

    def typecheck(self, ctx: MacroContext):
        # First, determine the actual parameter types
        args: list[str | None] = []
        for child in ctx.node.children:
            # Find the typecheck step to handle type checking
            typecheck_step = ctx.current_step
            # Import here to avoid circular imports
            from typecheck_macros import TypeCheckingStep
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
