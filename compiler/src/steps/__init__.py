# Steps package

# TODO: Full steps reorganization deferred due to circular dependency issues.
# 
# The plan is to move all 5 processing steps into this steps/ folder:
# 1. PreprocessingStep (moved here)
# 2. CodeBlockLinkingStep (currently in code_block_linking.py)  
# 3. TypeCheckingStep (currently in typecheck_macros.py)
# 4. JavaScriptEmissionStep (currently in literal_macros.py)
# 5. MustCompileErrorVerificationStep (already here)
#
# Progress: Moving steps one by one to avoid breaking the build

from .must_compile_error_step import MustCompileErrorVerificationStep
from .preprocessing_step import PreprocessingStep

__all__ = [
    'MustCompileErrorVerificationStep',
    'PreprocessingStep'
]