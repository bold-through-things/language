# core/exceptions.cr

# Raised by macros during processing to signal failed assertions.
# The compiler can recover during tree walks, allowing multiple errors to be reported.
class MacroAssertFailed < Exception
  def initialize(@message : String)
    super(@message)
  end
end

# graceful_typecheck: wraps a function to catch MacroAssertFailed
# and return "*" to prevent cascading errors.
def graceful_typecheck(&block : -> T) : T | String forall T
  begin
    yield
  rescue MacroAssertFailed
    "*"
  end
end
