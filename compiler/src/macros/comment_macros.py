from core.macro_registry import MacroRegistry

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

class Comment_macro_provider:
    """Dynamic provider that shadows all processing steps for comment macros"""
    
    def __getattr__(self, step_name: str):
        """Dynamically return no-op function for any step name"""
        def no_op(_):
            pass
        return no_op