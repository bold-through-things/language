# pipeline/steps/utils.cr
# Utility functions for processing steps.

require "set"
require "../../utils/strutil"
require "../../core/node"

def unroll_parent_chain(n : Node?) : Array(Node)
  rv = [] of Node
  cur = n
  while cur
    rv << cur.not_nil!
    cur = cur.not_nil!.parent
  end
  rv
end

def seek_child_macro(n : Node, macro_name : String) : Node?
  n.children.each do |child|
    m, _ = cut(child.content, " ")
    return child if m == macro_name
  end
  nil
end

def seek_all_child_macros(n : Node, macro_name : String) : Array(Node)
  out = [] of Node
  n.children.each do |child|
    m, _ = cut(child.content, " ")
    out << child if m == macro_name
  end
  out
end

TYPICAL_IGNORED_MACROS = Set(String).new(%w[type noscope])

def filter_child_macros(n : Node) : Array(Node)
  n.children.select do |c|
    macro_name, _ = cut(c.content, " ")
    !TYPICAL_IGNORED_MACROS.includes?(macro_name)
  end
end
