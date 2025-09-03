# macros/for_macro.cr

require "../core/macro_registry"
require "../utils/error_types"
require "../core/node"

class For_macro_provider
  include Macro_preprocess_provider

  private def assert_for_syntax!(ctx : MacroContext, parts : Array(String))
    ctx.compiler.assert_(parts.size >= 3, ctx.node, "must have a syntax: for $ident in")
    ctx.compiler.assert_(parts[0] == "for", ctx.node, "must start with `for`")
    ctx.compiler.assert_(parts[2] == "in", ctx.node, "must have a syntax: for $ident in")
  end

  private def find_body_node(node : Node) : Node?
    # top-level block is literally "do"
    node.children.find { |c| c.content == "do" }
  end

  # Return the single non-`do` child (the iterable AST node).
  private def take_iterable_child!(ctx : MacroContext) : Node
    expr_nodes = ctx.node.children.select { |c| c.content != "do" }
    ctx.compiler.assert_(
      expr_nodes.size == 1,
      ctx.node,
      "must have a single argument, the list provider (got #{expr_nodes.map(&.content)})",
      ErrorType::WRONG_ARG_COUNT
    )
    expr_nodes.first
  end

  def preprocess(ctx : MacroContext) : Nil
    parts = ctx.node.content.split(" ")
    assert_for_syntax!(ctx, parts)

    loop_var = parts[1]
    pos      = ctx.node.pos.not_nil!

    body_node = find_body_node(ctx.node)
    ctx.compiler.assert_(!body_node.nil?, ctx.node, "must have a `do` block")

    # Hoist the iterable expression as AST, no stringification.
    iterable_ast = take_iterable_child!(ctx)

    # Fresh locals
    idx_ident  = ctx.compiler.get_new_ident("for_#{loop_var}__index")
    list_ident = ctx.compiler.get_new_ident("for_#{loop_var}__list")

    # local <idx_ident> ; int 0
    local_idx = ctx.compiler.make_node("local #{idx_ident}", pos: pos, children: [] of Node)
    local_idx.append_child(ctx.compiler.make_node("int 0", pos: pos, children: [] of Node))

    # local <list_ident> ; <iterable_ast>
    local_list = ctx.compiler.make_node("local #{list_ident}", pos: pos, children: [] of Node)
    local_list.append_child(iterable_ast) # reparent the iterable under the local

    # while (asc idx (length list)) do ...
    cond = ctx.compiler.make_node("do asc", pos: pos, children: [] of Node)
    cond.append_child(ctx.compiler.make_node("get #{idx_ident}", pos: pos, children: [] of Node))
    cond.append_child(ctx.compiler.make_node("get length from #{list_ident}", pos: pos, children: [] of Node))

    while_node = ctx.compiler.make_node("while", pos: pos, children: [] of Node)
    while_node.append_child(cond)

    # do-block:
    #   local <loop_var>
    #     do # the <list_ident>
    #       get <idx_ident>
    bind_item = ctx.compiler.make_node("local #{loop_var}", pos: pos, children: [] of Node)
    bind_expr = ctx.compiler.make_node("do # the #{list_ident}", pos: pos, children: [] of Node)
    bind_expr.append_child(ctx.compiler.make_node("get #{idx_ident}", pos: pos, children: [] of Node))
    bind_item.append_child(bind_expr)

    #   do <idx_ident>
    #     do add the <idx_ident>
    #       int 1
    inc_idx = ctx.compiler.make_node("do #{idx_ident}", pos: pos, children: [] of Node)
    add_the = ctx.compiler.make_node("do add the #{idx_ident}", pos: pos, children: [] of Node)
    add_the.append_child(ctx.compiler.make_node("int 1", pos: pos, children: [] of Node))
    inc_idx.append_child(add_the)

    new_do = ctx.compiler.make_node("do", pos: pos, children: [] of Node)
    new_do.append_child(bind_item)
    new_do.append_child(inc_idx)

    # Move original body statements under the new do-block.
    # `children` returns a copy, which is exactly what we want to iterate safely.
    body_node.not_nil!.children.each do |stmt|
      new_do.append_child(stmt) # append_child should reparent cleanly
    end

    while_node.append_child(new_do)

    # Wrap everything so we can 1-for-1 replace `for`
    replacement = ctx.compiler.make_node("do", pos: pos, children: [] of Node)
    replacement.append_child(local_idx)
    replacement.append_child(local_list)
    replacement.append_child(while_node)

    # Replace original node with the desugared form
    parent = ctx.node.parent
    ctx.compiler.assert_(!parent.nil?, ctx.node, "internal error: for-node has no parent")
    parent.not_nil!.replace_child(ctx.node, replacement)

    # Let the rest of the preprocess pipeline chew on the fresh nodes
    replacement.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end
end
