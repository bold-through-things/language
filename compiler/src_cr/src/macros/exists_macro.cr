# macros/exists_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"

class Exists_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    target = nil.as(Node?)
    others = [] of Node

    ctx.node.children.each do |child|
      mname, _ = cut(child.content, " ")
      if mname == "inside"
        args_str = ctx.compiler.get_metadata(child, Args).to_s
        ctx.compiler.assert_(args_str.strip.empty?, child, "inside must have no arguments")
        ctx.compiler.assert_(child.children.size == 1, child, "inside must have one child")
        target = child.children[0]
      else
        others << child
      end
    end

    ctx.compiler.assert_(!target.nil?, ctx.node, "exists must have an inside modifier")
    ctx.compiler.compile_fn_call(ctx, "await _67lang.exists_inside(", [target.not_nil!] + others)
  end
end
