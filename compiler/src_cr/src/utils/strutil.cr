# utils/strutil.cr

alias Nested = Array(String | Nested)

def cut(line : String, sep : String) : {String, String}
  idx = line.index(sep)
  return {line, ""} if idx.nil?
  i = idx.not_nil!
  { line[0, i], line[(i + sep.size)..-1] || "" }
end

def extract_indent(line : String, max : Int32? = nil) : {String, Int32}
  indent = 0
  s = line
  while s.starts_with?('\t') && (max.nil? || indent < max.not_nil!)
    indent += 1
    s = s.byte_slice(1)
  end
  {s, indent}
end

def join_nested(data : Nested, indent : Int32 = 2, level : Int32 = 0) : String
  stringify = ->(x : String | Nested) do
    x.is_a?(String) ? x : join_nested(x.as(Nested), indent, level + 1)
  end
  s = data.map { |item| stringify.call(item) }.join(" ")
  prefix = " " * (indent * level)
  s.split('\n').map { |ln| "#{prefix}#{ln}" }.join('\n')
end

class Joiner
  def initialize(@out : OutIO, @sep : String)
    @first = true
  end

  def use(&block : ->)
    unless @first
      @out << @sep
    end
    @first = false
    yield
  end
end

class IndentedStringIO
  @buf = [] of String
  @indent_str : String
  @indent_level = 0
  @at_line_start = true

  def initialize(indent : String = "    ")
    @indent_str = indent
  end

  def <<(str : String)
    write(str)
    return self
  end

  def write(s : String) : Int32
    s.each_line(chomp: false) do |line|
      if @at_line_start && !line.strip.empty?
        @buf << @indent_str * @indent_level
      end
      @buf << line
      @at_line_start = line.ends_with?('\n')
    end
    s.bytesize
  end

  def writeline(s : String = "")
    @buf << (@indent_str * @indent_level) if @at_line_start
    @buf << s
    @buf << '\n'
    @at_line_start = true
  end

  def indent(levels : Int32 = 1)
    @indent_level += levels
  end

  def dedent(levels : Int32 = 1)
    @indent_level = Math.max(0, @indent_level - levels)
  end

  def gets_to_end : String
    @buf.join
  end

  def reset
    @buf.clear
    @indent_level = 0
    @at_line_start = true
  end

  def to_s(io : IO) : Nil
    io << getvalue
  end

  def with_indent
    indent
    begin
      yield self
    ensure
      dedent
    end
  end
end
