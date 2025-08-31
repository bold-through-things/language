# utils/logger.cr

require "json"
require "set"

class SmartIndentContext
  getter tag : String
  getter message : String
  getter indent_level : Int32
  property had_output : Bool = false
  property header_printed : Bool = false

  def initialize(@tag : String, @message : String, @indent_level : Int32)
  end
end

class Logger
  @output : IO
  @enabled_tags : Set(String)? = nil   # nil => all tags enabled
  @indent_level : Int32 = 0
  @lock = Mutex.new
  @context_stack = [] of SmartIndentContext

  def initialize(@output : IO = STDERR)
  end

  def enable_tags(tags : Set(String))
    # empty set => disable all logging
    @enabled_tags = tags
  end

  def enable_all_tags
    @enabled_tags = nil
  end

  def is_tag_enabled(tag : String) : Bool
    return true if @enabled_tags.nil?
    @enabled_tags.not_nil!.includes?(tag)
  end

  def log(tag : String, message : String) : Nil
    return unless is_tag_enabled(tag)

    @lock.synchronize do
      ensure_headers_printed

      @context_stack.each { |c| c.had_output = true }

      indent = "  " * @indent_level
      @output << "#{indent}[#{tag}] #{message}\n"
      @output.flush
    end
  end

  private def ensure_headers_printed
    @context_stack.each do |c|
      next if c.header_printed
      indent = "  " * c.indent_level
      @output << "#{indent}[#{c.tag}] begin: #{c.message}\n"
      @output.flush
      c.header_printed = true
    end
  end

  def indent(tag : String, message : String, &block : ->) : Nil
    unless is_tag_enabled(tag)
      yield
      return
    end

    context = SmartIndentContext.new(tag, message, @indent_level)

    @lock.synchronize do
      @context_stack << context
      @indent_level += 1
    end

    begin
      yield
    ensure
      @lock.synchronize do
        @context_stack.delete(context)
        @indent_level -= 1
        if context.had_output && context.header_printed
          indent = "  " * @indent_level
          @output << "#{indent}[#{tag}] done: #{message}\n"
          @output.flush
        end
      end
    end
  end

  # Convenience methods generated at compile time.
  {% for tag in %w(debug typecheck macro compile codegen parse registry metadata_debug) %}
    def {{tag.id}}(message : String) : Nil
      log({{tag}}, message)
    end
  {% end %}
end

# global logger (constant + accessor)
DEFAULT_LOGGER = Logger.new

def default_logger : Logger
  DEFAULT_LOGGER
end

def configure_logger_from_args(log_tags : String?) : Nil
  if log_tags.nil?
    # disable all logging by default (empty set)
    default_logger.enable_tags(Set(String).new)
  else
    tags = log_tags.split(',').map(&.strip).reject(&.empty?)
    default_logger.enable_tags(tags.to_set)
  end
end
