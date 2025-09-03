# core/node.cr

require "../utils/utils"    # expects TypeMap.register
require "json"
require "../pipeline/call_conventions"

struct Position
  property line : Int32
  property char : Int32

  def initialize(@line : Int32, @char : Int32 = 0)
  end
end

class Node
  property content : String
  property pos : Position?

  def parent : Node?
    @parent
  end

  protected def parent=(n : Node?)
    old = @parent
    @parent = n
    old.assert_all_children_parented if old
  end

  def initialize(content : String?, pos : Position?, children : Array(Node)?)
    @content = content || ""
    @children = [] of Node
    @parent = nil
    children.each { |ch| append_child(ch) }
    assert_all_children_parented
    @pos = pos
  end

  def assert_all_children_parented
    @children.each { |ch| assert(ch.parent == self) }
  end

  def children : Array(Node)
    assert_all_children_parented
    @children.dup
  end

  def replace_child(target : Node, new_child : Node | Array(Node) | Nil) : Nil
    matches = [] of Int32
    @children.each_with_index { |ch, i| matches << i if ch == target }
    raise ArgumentError.new("target child not found") if matches.empty?
    raise ArgumentError.new("target child appears multiple times") if matches.size > 1

    index = matches.first
    @children.delete_at(index)
    target.parent = nil
    insert_child(index, new_child)
    notify_tree_change
  end

  def append_child(new_child : Node | Array(Node) | Nil) : Nil
    insert_child(@children.size, new_child)
    notify_tree_change
  end

  def prepend_child(new_child : Node | Array(Node) | Nil) : Nil
    insert_child(0, new_child)
    notify_tree_change
  end

  private def insert_child(index : Int32, new_child : Node | Array(Node) | Nil) : Nil
    replacement =
      case new_child
      when Nil
        [] of Node
      when Node
        [new_child]
      else
        new_child.as(Array(Node))
      end

    replacement.reverse_each do |child|
      # detach from old parent if present
      if (p = child.parent)
        if (idx = p.@children.index(child))
          p.@children.delete_at(idx)
        end
        child.parent = nil
        p.assert_all_children_parented
      end
      child.parent = self
      @children.insert(index, child)
    end
    assert_all_children_parented
  end

  protected def notify_tree_change : Nil
    # hook for compiler metadata invalidation
  end

  def indented_repr(indent : String = "") : String
    next_indent = "\t" + indent
    String.build do |io|
      io << indent << @content << '\n'
      @children.each { |ch| io << ch.indented_repr(next_indent) << '\n' }
    end.rstrip('\n')
  end

  def inspect(io : IO) : Nil
    io << indented_repr
  end

  def copy_recursive : Node
    new_node = Node.new(@content, @pos, [] of Node)
    @children.each do |ch|
      child_copy = ch.copy_recursive
      new_node.@children << child_copy
      child_copy.parent = new_node
    end
    new_node
  end
end

# --- Metadata holder types ---

class Indexers
  property mapping : Hash(String, JSON::Any)

  def initialize
    @mapping = {} of String => JSON::Any
  end
end

class Callers
  property mapping : Hash(String, JSON::Any)

  def initialize
    @mapping = {} of String => JSON::Any
  end
end

class Params
  property mapping : Hash(String, Bool)

  def initialize
    @mapping = {} of String => Bool
  end
end

class Inject_code_start
  property code : Array(String)

  def initialize
    @code = [] of String
  end
end

# src/core/meta_types.cr (or wherever)

struct Macro
  getter value : String
  def initialize(@value : String); end
  def to_s(io : IO) : Nil; io << @value; end

  # make common stringy things work without call-site changes
  def ==(other : String) : Bool; @value == other; end
  def ==(other : Macro) : Bool;  @value == other.value; end
  def empty? : Bool;             @value.empty?; end
  def strip : String;            @value.strip; end
  def split(sep : String) : Array(String); @value.split(sep); end
  def starts_with?(p : String) : Bool; @value.starts_with?(p); end
  def ends_with?(s : String) : Bool;   @value.ends_with?(s); end
end

struct Args
  getter value : String
  def initialize(@value : String); end
  def to_s(io : IO) : Nil; io << @value; end
  def ==(other : String) : Bool; @value == other; end
  def empty? : Bool;             @value.empty?; end
  def strip : String;            @value.strip; end
  def split(sep : String) : Array(String); @value.split(sep); end
end

struct SaneIdentifier
  getter value : String
  def initialize(@value : String); end
  def to_s(io : IO) : Nil; io << @value; end
  def ==(other : String) : Bool; @value == other; end
end

# TODO: remove and store Type objects directly
class FieldDemandType
  property tc : TCResult
  def initialize(@tc : TCResult); end
end

class TypeFieldNames
  property names : Array(String)

  def initialize(@names : Array(String)); end
end

# Stores the resolved calling convention for a function call
class ResolvedConvention
  property convention : Call_convention?

  def initialize(@convention : Reference? = nil)
  end
end

# optional factory funcs (compatibility with prior registrations if needed)
def __indexers : Indexers; Indexers.new; end
def __callers : Callers; Callers.new; end
def __params : Params; Params.new; end
