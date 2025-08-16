"""Core compiler exceptions."""


class MacroAssertFailed(Exception):
    """
    Raised by macros during processing to ensure said processing is possible.
    Compiler will recover during tree walks as soon as possible, thus making it possible
    to catch multiple assert failures.
    Automatically raised by Compiler.assert_ which you should use probably instead of manually
    raising this.
    """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)