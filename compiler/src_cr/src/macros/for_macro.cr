# macros/for_macro.cr

require "../core/macro_registry"
require "../utils/strutil"
require "../utils/error_types"
require "../pipeline/steps/utils"
require "../core/node"

class For_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider

  def preprocess(ctx : MacroContext) : Nil
    # Hacky pre-pass: declare the loop variable as an assumed local.
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s
    name = args.split(" ")[0]? || ""
    new_node = ctx.compiler.make_node("67lang:assume_local_exists #{name}", pos: ctx.node.pos.not_nil!, children: [] of Node)
    ctx.node.prepend_child(new_node)

    # Recurse into children with current step
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  def emission(ctx : MacroContext) : Nil
    parts = ctx.node.content.split(" ")
    ctx.compiler.assert_(parts.size == 3, ctx.node, "must have a syntax: for $ident in")
    name = parts[1]
    ctx.compiler.assert_(parts[2] == "in", ctx.node, "must have a syntax: for $ident in")

    # Gather iterable expression (exactly one non-`do` child)
    exprs = [] of String
    ctx.node.children.each do |child|
      next if child.content.starts_with?("do")
      obuf = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: child, expression_out: obuf)
      ctx.current_step.not_nil!.process_node(child_ctx)
      v = obuf.gets_to_end
      exprs << v unless v.empty?
    end

    ctx.compiler.assert_(
      exprs.size == 1, ctx.node,
      "must have a single argument, the list provider (got #{exprs})",
      ErrorType::WRONG_ARG_COUNT
    )

    so = ctx.statement_out.as(IndentedStringIO)

    iter_ident = ctx.compiler.get_new_ident("iter")
    so.write("const #{iter_ident} = #{exprs[0]}[Symbol.iterator]();\n")
    so.write("while (true) {\n")
    so.with_indent do
      so.write("const { value, done } = #{iter_ident}.next();\n")
      so.write("if (done) { break; }\n")
      so.write("let #{name} = value;\n")

      body_node = seek_child_macro(ctx.node, "do")
      ctx.compiler.assert_(!body_node.nil?, ctx.node, "must have a `do` block")
      body_ctx = ctx.clone_with(node: body_node.not_nil!)
      ctx.current_step.not_nil!.process_node(body_ctx)
    end
    so.write("}")
  end
end
