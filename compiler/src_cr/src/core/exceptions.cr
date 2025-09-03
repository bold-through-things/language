# core/exceptions.cr

# Raised by macros during processing to signal failed assertions.
# The compiler can recover during tree walks, allowing multiple errors to be reported.
class MacroAssertFailed < Exception
  def initialize(@message : String)
    super(@message)
  end
end

# graceful_typecheck: wraps a function to catch MacroAssertFailed
# and return NEVER to prevent cascading errors.
def graceful_typecheck(&block : -> T) : T forall T
  begin
    rv = yield
    return rv
  rescue MacroAssertFailed
    return NEVER
  end
end
