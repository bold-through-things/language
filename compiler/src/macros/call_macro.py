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
from compiler_types.proper_types import TypeVariable, Type, TypeSubstitution
from core.exceptions import graceful_typecheck

class TypeHierarchyChecker:
    def __init__(self, hierarchy, unions):
        self.hierarchy = hierarchy
        self.unions = unions

    def is_subtype(self, child, parent):
        # Handle Type objects from new type system
        from compiler_types.proper_types import Type
        if isinstance(child, Type) and isinstance(parent, Type):
            return child.is_assignable_to(parent)
        
        # Convert Type objects to strings for legacy compatibility
        if isinstance(child, Type):
            child = str(child)
        if isinstance(parent, Type):
            parent = str(parent)
            
        if child == parent:
            return True

        if parent in self.unions:
            for member in self.unions[parent]:
                if self.is_subtype(child, member):
                    return True

        if child not in self.hierarchy:
            return False
        
        # Check all parent types (hierarchy[child] is now a list)
        parent_types = self.hierarchy[child]
        for parent_type in parent_types:
            if self.is_subtype(parent_type, parent):
                return True
        
        return False

type_checker = TypeHierarchyChecker(type_hierarchy, union_types)


def unify_types(actual_types: list, signature_types: list) -> tuple[bool, dict[str, Type]]:
    """
    Attempt to unify actual types with a polymorphic signature.
    Returns (success, substitutions) where substitutions maps type variable names to concrete types.
    """
    if len(actual_types) != len(signature_types):
        return False, {}
    
    substitutions = {}
    
    for actual, signature in zip(actual_types, signature_types):
        if not unify_single_type(actual, signature, substitutions):
            return False, {}
    
    return True, substitutions


def unify_single_type(actual: Type, signature: Type, substitutions: dict[str, Type]) -> bool:
    """Unify a single actual type with a signature type, updating substitutions."""
    from compiler_types.proper_types import ComplexType
    
    # Handle wildcards
    if isinstance(signature, str) and signature == "*":
        return True
    if isinstance(actual, str) and actual == "*":
        return True
    
    # If signature is a type variable, try to unify it
    if isinstance(signature, TypeVariable):
        var_name = signature.name
        
        if var_name in substitutions:
            # Type variable already has a substitution - check consistency
            existing = substitutions[var_name]
            return types_equivalent(actual, existing)
        else:
            # New type variable - record the substitution
            substitutions[var_name] = actual
            return True
    
    # If actual is a type variable, that's a compiler bug
    if isinstance(actual, TypeVariable):
        raise RuntimeError(f"Actual type should never be TypeVariable, got: {actual}")
    
    # If signature is a complex type with type variables, unify structurally
    if isinstance(signature, ComplexType) and isinstance(actual, ComplexType):
        if signature.name != actual.name:
            return False
        
        if len(signature.type_params) != len(actual.type_params):
            return False
        
        # Recursively unify type parameters
        for sig_param, actual_param in zip(signature.type_params, actual.type_params):
            if not unify_single_type(actual_param, sig_param, substitutions):
                return False
        
        return True
    
    # Both are concrete types - check assignability
    if isinstance(actual, Type) and isinstance(signature, Type):
        return actual.is_assignable_to(signature)
    
    # Mixed Type and string compatibility
    if isinstance(actual, Type) and isinstance(signature, str):
        return actual.is_assignable_to(signature)
    
    # Legacy string-based type checking
    if isinstance(actual, str) and isinstance(signature, str):
        return type_checker.is_subtype(actual, signature)
    
    return False


def types_equivalent(type1: Type, type2: Type) -> bool:
    """Check if two types are equivalent (for unification consistency)."""
    if isinstance(type1, Type) and isinstance(type2, Type):
        return type1.is_assignable_to(type2) and type2.is_assignable_to(type1)
    
    return str(type1) == str(type2)


class Call_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def _matches_signature(self, actual_types: list, demanded_types: list) -> bool:
        default_logger.typecheck(f"_matches_signature: actual={actual_types}, demanded={demanded_types}")
        if demanded_types is None:
            return True # No specific demands, so it matches
        
        # Try unification first (for polymorphic signatures)
        success, substitutions = unify_types(actual_types, demanded_types)
        if success:
            default_logger.typecheck(f"_matches_signature: unified with substitutions {substitutions}")
            return True
        
        # Fall back to legacy type checking
        if len(actual_types) != len(demanded_types):
            return False
        
        for actual, demanded in zip(actual_types, demanded_types):
            # "*" matches anything
            if demanded == "*" or actual == "*":
                continue
            
            from compiler_types.proper_types import Type
            if isinstance(actual, Type) and isinstance(demanded, str):
                if not actual.is_assignable_to(demanded):
                    default_logger.typecheck(f"_matches_signature: {actual} is not assignable to {demanded}")
                    return False
            elif not type_checker.is_subtype(actual, demanded):
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

    def resolve_convention(self, ctx: MacroContext, actual_arg_types: list = None):  # TODO: Proper Type objects
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
                    
                    # Only count specificity for positions where the actual argument is NOT "*"
                    # If the caller provides "*", it means "we don't know the type", so we shouldn't
                    # use that position to prefer one overload over another
                    specific_count = 0
                    for i, (actual, demanded) in enumerate(zip(actual_arg_types, conv.demands)):
                        if actual != "*" and demanded != "*":
                            specific_count += 1
                    
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

    @graceful_typecheck
    def typecheck(self, ctx: MacroContext):
        # First, determine the actual parameter types - now properly handling Type objects
        args = []  # TODO: Fully convert to Type objects throughout
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
            # Try unification to handle polymorphic types
            from compiler_types.proper_types import Type
            success, substitutions = unify_types(args, convention.demands)
            if success and substitutions:
                # Apply substitutions to validate the unified types
                subst = TypeSubstitution(substitutions)
                unified_demands = [subst.apply(demand) if isinstance(demand, Type) else demand 
                                 for demand in convention.demands]
                
                i = 0
                for received, unified_demand in zip(args, unified_demands):
                    i += 1
                    if "*" in {unified_demand, received}:
                        continue
                    
                    default_logger.typecheck(f"{ctx.node.content} demanded {unified_demand} (unified from {convention.demands[i-1]}) and was given {received}")
                    
                    from compiler_types.proper_types import Type
                    if isinstance(received, Type) and isinstance(unified_demand, str):
                        type_compatible = received.is_assignable_to(unified_demand)
                    elif isinstance(received, Type) and isinstance(unified_demand, Type):
                        type_compatible = received.is_assignable_to(unified_demand)
                    else:
                        type_compatible = type_checker.is_subtype(received, unified_demand)
                    
                    ctx.compiler.assert_(type_compatible, ctx.node, f"argument {i} demands {unified_demand} and is given {received}", ErrorType.ARGUMENT_TYPE_MISMATCH)
            else:
                # Fall back to original non-unified checking
                i = 0
                for received, demanded in zip(args, convention.demands):
                    i += 1
                    if "*" in {str(demanded), str(received)}:
                        continue
                    default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received}")
                    
                    from compiler_types.proper_types import Type
                    if isinstance(received, Type) and isinstance(demanded, str):
                        type_compatible = received.is_assignable_to(demanded)
                    else:
                        type_compatible = type_checker.is_subtype(received, demanded)
                    
                    ctx.compiler.assert_(type_compatible, ctx.node, f"argument {i} demands {demanded} and is given {received}", ErrorType.ARGUMENT_TYPE_MISMATCH)

        # Apply substitutions to return type if we have them
        if convention.demands:
            from compiler_types.proper_types import Type
            success, substitutions = unify_types(args, convention.demands)
            if success and substitutions:
                subst = TypeSubstitution(substitutions)
                if isinstance(convention.returns, Type):
                    return subst.apply(convention.returns)
        
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
