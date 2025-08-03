# Steps package

# All processing steps are now organized here to avoid circular dependencies
# Each step follows dependency injection pattern with RegistryContainer

from .preprocessing_step import PreprocessingStep
from .code_linking_step import CodeBlockLinkingStep
from .typecheck_step import TypeCheckingStep
from .codegen_step import JavaScriptEmissionStep
from .must_compile_error_step import MustCompileErrorVerificationStep

__all__ = [
    'PreprocessingStep',
    'CodeBlockLinkingStep', 
    'TypeCheckingStep',
    'JavaScriptEmissionStep',
    'MustCompileErrorVerificationStep'
]