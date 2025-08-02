# Steps package

# TODO: Full steps reorganization deferred due to circular dependency issues.
# 
# The plan is to move all 5 processing steps into this steps/ folder:
# 1. PreprocessingStep (currently in preprocessing_macros.py)
# 2. CodeBlockLinkingStep (currently in code_block_linking.py)  
# 3. TypeCheckingStep (currently in typecheck_macros.py)
# 4. JavaScriptEmissionStep (currently in literal_macros.py)
# 5. MustCompileErrorVerificationStep (already here)
#
# However, there are complex circular import dependencies between these modules:
# - preprocessing_macros imports from literal_macros
# - literal_macros imports from preprocessing_macros
# - typecheck_macros imports from processor_base
# - processor_base imports unified registries that depend on these modules
#
# A proper solution requires restructuring the entire module dependency graph,
# which is beyond the scope of this PR. This should be tackled as a separate
# architectural improvement.

from .must_compile_error_step import MustCompileErrorVerificationStep

__all__ = [
    'MustCompileErrorVerificationStep'
]