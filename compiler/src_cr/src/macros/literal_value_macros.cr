# macros/literal_value_macros.cr

require "../core/macro_registry"
require "../utils/error_types"
require "../compiler_types/proper_types"
require "../core/node"

# ----- Number -----

class Number_macro_provider 
  include Macro_emission_provider
  include Macro_typecheck_provider
  def initialize(@number_type : Int32.class | Float64.class)
  end

  def preprocess(ctx : MacroContext) : Nil
    arg = ctx.compiler.get_metadata(ctx.node, Args).to_s
    ok =
      case @number_type
      when Int32.class
        begin
          # allow underscores? keep it strict like Python's int()
          Int32.new(arg)
          true
        rescue
          false
        end
      when Float64.class
        begin
          Float64.new(arg)
          true
        rescue
          false
        end
      end

    unless ok
      err = @number_type == Int32 ? ErrorType::INVALID_INT : ErrorType::INVALID_FLOAT
      ctx.compiler.assert_(false, ctx.node, "#{arg} must be a valid #{@number_type} string.", err)
    end
  end

  def typecheck(ctx : MacroContext)
    @number_type == Int32 ? INT : FLOAT
  end

  def emission(ctx : MacroContext) : Nil
    arg = ctx.compiler.get_metadata(ctx.node, Args).to_s
    ctx.expression_out << (arg)
  end
end

# ----- String / Regex -----

def collect_content(node : Node, depth : Int32, lines : Array(String))
  if (c = node.content) && !c.empty?
    lines << ("\t" * depth) + c
  end
  node.children.each { |ch| collect_content(ch, depth + 1, lines) }
end

class String_macro_provider
  include Macro_emission_provider
  def initialize(@kind : String) # "string" | "regex"
  end

  def preprocess(ctx : MacroContext) : Nil
    # allow multiline string content starting with whitespace; nothing to do here
  end

  def typecheck(ctx : MacroContext)
    @kind == "string" ? STRING : "regex" # TODO: create a proper Regex type
  end

  def code_linking(ctx : MacroContext) : Nil
    # no-op
  end

  def emission(ctx : MacroContext) : Nil
    s = ctx.compiler.get_metadata(ctx.node, Args).to_s
    if s.empty?
      # Multiline string: collect content from entire subtree, reconstructing indentation
      lines = [] of String

      ctx.node.children.each { |ch| collect_content(ch, 0, lines) }
      s = lines.join("\n")
    else
      delim = s[0]
      ctx.compiler.assert_(
        s.ends_with?(delim),
        ctx.node,
        "must be delimited on both sides with the same character"
      )
      s = s[1..-2] # strip the delimiters
    end

    s = s.gsub("\n", "\\n").gsub("\"", "\\\"")
    sep = @kind == "string" ? "\"" : "/"
    ctx.expression_out << ("#{sep}#{s}#{sep}")
  end
end
