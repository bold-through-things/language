from processor_base import unified_macros

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry

@macros.add("noop", "type", "67lang:auto_type", "67lang:assume_local_exists")
def does_not_compile(_):
    # does not compile into code itself - nothing to do
    pass