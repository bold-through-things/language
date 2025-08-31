# pipeline/steps/must_compile_error_verification.cr

require "json"
require "set"
require "./base"

# inside MustCompileErrorVerificationStep

private def mv_to_i(v) : Int32?
  case v
  when Int32
    v
  when Int64
    v.to_i32
  when Float64
    v.to_i32
  when String
    v.to_i?
  else
    nil
  end
end

private def mv_to_s(v) : String?
  case v
  when String
    v
  else
    nil
  end
end


# Step that handles must_compile_error nodes:
#  - extracts expectations,
#  - walks children,
#  - verifies that expected compile errors were produced.
class MustCompileErrorVerificationStep < MacroProcessingStep
  # keep (node, expected_errors_by_line) pairs
  class Expectation
    getter node : Node
    getter expected_errors : Hash(Int32, String)

    def initialize(@node : Node, @expected_errors : Hash(Int32, String)); end
  end

  def initialize(@macros)
    # super()
    @expectations = [] of Expectation
  end

  def process_node(ctx : MacroContext) : Nil
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s

    if macro_name == "must_compile_error"
      if exp = extract_expectations_from_node(ctx, ctx.node)
        @expectations << Expectation.new(ctx.node, exp)
      end
      # children were already processed by earlier steps; nothing else to do here
    else
      # normal tree walk
      ctx.node.children.each do |child|
        process_node(ctx.clone_with(node: child))
      end
    end

    # At the synthetic root, verify and reset.
    if ctx.node.content == "67lang:solution"
      verify_expectations(ctx, @expectations)
      @expectations.clear
    end
  end

  private def extract_expectations_from_node(ctx : MacroContext, node : Node) : Hash(Int32, String)?
    args = ctx.compiler.get_metadata(node, Args).to_s
    default_logger.macro(%(must_compile_error with args: "#{args}"))

    if args.strip.empty?
      ctx.compiler.compile_error(
        node,
        "must_compile_error macro requires arguments in format ERROR_TYPE=line or ERROR_TYPE=+offset",
        ErrorType::INVALID_MACRO
      )
      return nil
    end

    base_line = node.pos.try(&.line) || 0
    expected = {} of Int32 => String

    args.split.each do |pair|
      unless pair.includes?('=')
        ctx.compiler.compile_error(
          node,
          %(must_compile_error argument must contain '=': #{pair}),
          ErrorType::INVALID_MACRO
        )
        return nil
      end

      parts = pair.split('=', 2)
      error_type = parts[0].strip
      line_str   = parts[1].strip

      line_num = begin
        if line_str.starts_with?('+')
          off = line_str.byte_slice(1) # remove '+'
          off_i = off.to_i?
          if off_i.nil?
            nil
          else
            base_line + off_i
          end
        else
          line_str.to_i?
        end
      end

      if line_num.nil?
        ctx.compiler.compile_error(
          node,
          "invalid line number in must_compile_error: #{line_str} (use absolute line number or +offset)",
          ErrorType::INVALID_MACRO
        )
        return nil
      end

      expected[line_num.not_nil!] = error_type
    end

    expected
  end

  private def verify_expectations(ctx : MacroContext, expectations : Array(Expectation)) : Nil
    actual_by_line = Hash(Int32, Array(String)).new { |h, k| h[k] = [] of String }

    ctx.compiler.compile_errors.each do |err|
        line_v = err["line"]?
        next unless line_v
        line_i = mv_to_i(line_v)
        next unless line_i

        type_v = err["error_type"]?
        etype  = mv_to_s(type_v) || "UNKNOWN_ERROR"

        actual_by_line[line_i] << etype
    end

    consumed = Set(Int32).new

    expectations.each do |exp|
        exp.expected_errors.each do |expected_line, expected_type|
        actual_types = actual_by_line[expected_line]?

        if actual_types.nil?
            nearby = [] of String
            actual_by_line.keys.sort.each do |ln|
            nearby << "line #{ln}: #{actual_by_line[ln]}" if (ln - expected_line).abs <= 3
            end
            nearby_info = nearby.empty? ? "" : " (nearby errors: #{nearby.join("; ")})"
            ctx.compiler.compile_error(
            exp.node,
            "expected #{expected_type} error on line #{expected_line} but no error found#{nearby_info}",
            ErrorType::ASSERTION_FAILED
            )
        elsif !actual_types.includes?(expected_type)
            ctx.compiler.compile_error(
            exp.node,
            "expected #{expected_type} error on line #{expected_line} but found #{actual_types}",
            ErrorType::ASSERTION_FAILED
            )
        else
            consumed << expected_line
        end
        end
    end

    ctx.compiler.compile_errors.reject! do |err|
        if ln = mv_to_i(err["line"]?)
        consumed.includes?(ln)
        else
        false
        end
    end
    end

end
