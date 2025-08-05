# Import macro modules to ensure they register with the unified registry
# TODO: Gradually remove imports as macros are converted to dependency injection
from . import access_macros
from . import builtin_macros  # TODO: Critical - contains print, add, etc. - needs DI conversion
from . import collection_macros
from . import comment_macros
from . import error_macros
from . import exists_macro  # TODO: Added separated exists macro
# from . import fn_macro  # TODO: Converted to DI - remove import-time registration
# from . import for_macro  # TODO: Converted to DI - remove import-time registration
# from . import if_macro  # TODO: Converted to DI - remove import-time registration
from . import lang_call_macro  # TODO: Added separated 67lang:call macro
from . import literal_value_macros
# from . import local_macro  # TODO: Converted to DI - remove import-time registration
# from . import noscope_macro  # TODO: Converted to DI - remove import-time registration
# from . import scope_macro  # TODO: Converted to DI - remove import-time registration
from . import solution_macro
from . import utility_macros
# from . import while_macro  # TODO: Converted to DI - remove import-time registration