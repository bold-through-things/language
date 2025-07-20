class _scope:
    def __enter__(self):
        # no setup needed
        return None

    def __exit__(self, exc_type, exc_value, traceback):
        # no cleanup needed
        return False  # don't suppress exceptions
    
scope = _scope()