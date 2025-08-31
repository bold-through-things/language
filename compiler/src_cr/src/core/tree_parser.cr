# core/tree_parser.cr

require "./../utils/strutil"
require "./node"
require "./../utils/logger"

class TrimStack(T)
  def initialize
    @data = [] of T
  end

  def []=(index : Int, value : T)
    if index == @data.size
      @data << value
    elsif 0 <= index < @data.size
      @data[index] = value
    else
      raise IndexError.new("Index out of bounds (can only set existing index or append)")
    end
  end

  def [](index : Int) : T
    @data[index]
  end

  def trim(max_index : Int)
    if max_index < 0
      @data.clear
    else
      # inclusive slice
      new_size = Math.min(max_index + 1, @data.size)
      @data = @data[0, new_size]
    end
  end

  def size : Int32
    @data.size
  end

  def to_s(io : IO) : Nil
    io << "#{self.class.name}(#{@data})"
  end
end

class ParsingNode
  getter content : String
  getter position : Position
  getter children : Array(ParsingNode)

  def initialize(@content : String, @position : Position, @children = [] of ParsingNode)
  end

  def to_node : Node
    Node.new(
      content: content,
      pos: position,
      children: children.map(&.to_node)
    )
  end
end

class TreeParser
  def parse_tree(code : String, compiler = nil) : Node
    code = "\n#{code}\n"

    scope = TrimStack(ParsingNode).new
    root = ParsingNode.new("67lang:file", Position.new(0))
    scope[0] = root
    line_num = 0

    lines = code.split('\n')
    default_logger.log("parse", "processing #{lines.size} lines")

    lines.each do |raw|
      line_num += 1

      line, indent = extract_indent(raw, max: scope.size - 1)
      indent += 1

      next if line.strip.empty?

      default_logger.log("parse", "line #{line_num}: indent=#{indent}, content='#{line}'")
      node = ParsingNode.new(line, Position.new(line_num))
      scope[indent - 1].children << node
      scope[indent] = node
      scope.trim(indent)
    end

    root.to_node
  end
end
