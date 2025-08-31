# utils/command_parser.cr

# A tiny, generic parser for space-separated command syntax.
# It maps command words to small handlers that mutate a result Hash.

alias ResultValue = String | Array(String) | Bool
alias ResultHash  = Hash(String, ResultValue)

# Base class for command words
abstract class Command
  abstract def execute(tokens : Array(String), pos : Int32, result : ResultHash) : Int32
end

# Sets a field to either `true` (flag) or to the next token
class SetFieldCommand < Command
  getter field_name : String
  getter takes_argument : Bool

  def initialize(@field_name : String, @takes_argument : Bool = true)
  end

  def execute(tokens : Array(String), pos : Int32, result : ResultHash) : Int32
    unless @takes_argument
      result[@field_name] = true
      return pos
    end

    return pos if pos >= tokens.size
    result[@field_name] = tokens[pos]
    pos + 1
  end
end

# Appends the next token into a list at result[field_name]
class AppendToListCommand < Command
  getter field_name : String

  def initialize(@field_name : String)
  end

  def execute(tokens : Array(String), pos : Int32, result : ResultHash) : Int32
    return pos if pos >= tokens.size
    list = result[@field_name]?.as?(Array(String)) || [] of String
    list << tokens[pos]
    result[@field_name] = list
    pos + 1
  end
end

# Consumes all remaining tokens into a list at result[field_name]
class ConsumeRestCommand < Command
  getter field_name : String

  def initialize(@field_name : String)
  end

  def execute(tokens : Array(String), pos : Int32, result : ResultHash) : Int32
    result[@field_name] = tokens[pos..-1]
    tokens.size
  end
end

# Generic parser
class CommandParser
  @tokens : Array(String)
  @commands : Hash(String, Command)
  @default_fields : ResultHash

  def initialize(content : String, commands : Hash(String, Command), default_fields : ResultHash? = nil)
    @tokens = content.split
    @commands = commands
    @default_fields = default_fields || ResultHash.new
  end

  def parse : ResultHash?
    result = @default_fields.dup
    pos = 0

    # If the first token isn't a command, treat it as the main argument
    if @tokens.size > 0 && !@commands.has_key?(@tokens[0])
      result["main"] = @tokens[0]
      pos = 1
    end

    while pos < @tokens.size
      token = @tokens[pos]
      if cmd = @commands[token]?
        pos = cmd.execute(@tokens, pos + 1, result)
      else
        return nil
      end
    end

    result
  end
end

# Pre-built command sets

def create_type_commands : Hash(String, Command)
  {
    "for"     => SetFieldCommand.new("parameter_name"),
    "is"      => SetFieldCommand.new("base_type"),
    "extends" => AppendToListCommand.new("constraints"),
  }
end

def create_pipeline_commands : Hash(String, Command)
  {
    "do"    => SetFieldCommand.new("operation"),
    "get"   => SetFieldCommand.new("operation"),
    "set"   => SetFieldCommand.new("operation"),
    "chain" => ConsumeRestCommand.new("chain_steps"),
    "as"    => SetFieldCommand.new("bind_name"),
    "into"  => SetFieldCommand.new("assign_name"),
    "the"   => SetFieldCommand.new("source_variable"),
    "from"  => SetFieldCommand.new("source_variable"),
    "in"    => SetFieldCommand.new("source_variable"),
  }
end
