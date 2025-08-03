# Legacy compatibility for literal_macros.py
# The actual JavaScriptEmissionStep has been moved to steps/javascript_emission_step.py
# This file now only exists for backward compatibility during the refactor

# Re-export the registries from literal_value_macros for backward compatibility
from macros.literal_value_macros import macros, typecheck

# Note: The actual JavaScriptEmissionStep implementation has been moved to steps/javascript_emission_step.py
# This file now only exists for backward compatibility during the refactor
                ctx.compiler.compile_error(ctx.node, f"unknown macro '{macro}' - is this supposed to exist? did you maybe typo something?", ErrorType.INVALID_MACRO)