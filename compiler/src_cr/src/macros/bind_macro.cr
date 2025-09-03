# macros/bind_macro.cr
require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"
require "../utils/logger"
require "../utils/error_types"
require "../pipeline/builtin_calls"
require "../pipeline/call_conventions"
require "../pipeline/call_resolver"          # NEW reuse
require "../compiler_types/proper_types"

class Bind_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider
  include Macro_typecheck_provider
  include CallResolver                     # NEW

  private def placeholder?(node : Node) : Bool
    c = node.content
    c == "_" || c.starts_with?("_ ")
  end

  private def placeholder_name(idx : Int32, node : Node) : String
    c = node.content
    if c.starts_with?("_ ")
      raw = c.split(" ", 2)[1].strip
      return raw.empty? ? "arg#{idx}" : raw
    end
    "arg#{idx}"
  end

  def preprocess(ctx : MacroContext) : Nil
    parts = ctx.node.content.split
    ctx.compiler.assert_(
      parts.size == 5 && parts[0] == "bind" && parts[1] == "fn" && parts[3] == "as" && parts[4] == "callable",
      ctx.node,
      "bind syntax should be: bind fn <function_name> as callable"
    )
    # Just walk children to let upstream metadata/type passes run
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  private def pick_convention(
    ctx : MacroContext,
    name : String,
    arity : Int32,
    bound_pairs : Array({Int32, Type})
  ) : {convention: Call_convention, subs: Hash(String, Type)}
    candidates = resolve_candidates(ctx, name)
      .select { |c| c.responds_to?(:demands) && c.responds_to?(:returns) }
      .select { |c| (c.demands || [] of Type).size == arity }

    ctx.compiler.assert_(!candidates.empty?, ctx.node, "No candidates for '#{name}'")

    candidates.each do |cand|
      dmds = cand.demands.not_nil!
      # unify only bound positions
      bound_actuals = [] of Type
      bound_sigs    = [] of Type
      bound_pairs.each do |(idx, at)|
        bound_actuals << at
        bound_sigs    << dmds[idx]
      end

      ok, computed = unify_types(bound_actuals, bound_sigs)
      next unless ok

      # enforce assignability after substitution
      subst = TypeSubstitution.new(computed)
      compatible = bound_pairs.all? do |(idx, at)|
        demanded = subst.apply(dmds[idx])
        at.is_assignable_to(demanded)
      end
      next unless compatible

      return { convention: cand, subs: computed }
    end

    ctx.compiler.assert_(false, ctx.node,
      "No overload of '#{name}' matches the bound arguments")
    raise "unreachable"
  end

  def typecheck(ctx : MacroContext) : TCResult
    parts = ctx.node.content.split
    desired_fn_name = parts[2]

    bound_pairs = [] of {Int32, Type}   # index -> actual type
    unbound_ix  = [] of Int32

    # collect bound vs skip without ever inventing a fake '*'
    i = -1
    ctx.node.children.each do |child|
      i += 1
      if placeholder?(child)
        unbound_ix << i
      else
        t = ctx.current_step.not_nil!.process_node(ctx.clone_with(node: child))
        ctx.compiler.assert_(!!t, child, "cannot infer type for bound argument")
        at = t.not_nil!
        raise "wtf?" if at.is_a?(TypeParameter)
        bound_pairs << {i, at}
      end
    end

    # choose a convention by trying candidates until one unifies on bound positions
    chosen = pick_convention(ctx, desired_fn_name, ctx.node.children.size, bound_pairs)
    conv   = chosen[:convention]
    subs   = chosen[:subs]

    ctx.compiler.assert_(
      conv.responds_to?(:demands) && conv.responds_to?(:returns),
      ctx.node,
      "Function '#{desired_fn_name}' must expose demands/returns to be bindable"
    )

    dmds = conv.demands.not_nil!
    ret  = conv.returns.not_nil!

    # propagate parameter types for skips after substitution
    subst       = TypeSubstitution.new(subs)
    param_types = unbound_ix.map { |idx| subst.apply(dmds[idx]) }
    result_type = subst.apply(ret)

    # remember the exact convention we picked for emission
    ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention.new(convention: conv))

    ComplexType.new("callable", param_types + [result_type])
  end

  def emission(ctx : MacroContext) : Nil
    parts = ctx.node.content.split
    desired_fn_name = parts[2]

    resolved = ctx.compiler.maybe_metadata(ctx.node, ResolvedConvention)
    ctx.compiler.assert_(resolved != nil, ctx.node,
    "emission: convention must be resolved", ErrorType::INVALID_MACRO)
    conv = resolved.not_nil!.convention.not_nil! # guh ?!

    # Build parameter list for holes and argument expressions in order
    unbound_names = [] of String
    args_in_order = [] of String
    hole_idx = 0

    ctx.node.children.each_with_index do |child, idx|
      if placeholder?(child)
        pname = placeholder_name(hole_idx, child)
        unbound_names << pname
        args_in_order << pname
        hole_idx += 1
      else
        obuf = IndentedStringIO.new
        child_ctx = ctx.clone_with(node: child, expression_out: obuf)
        ctx.current_step.not_nil!.process_node(child_ctx)
        args_in_order << obuf.gets_to_end
      end
    end

    # Emit: ((args...) => Actual.fn(args...))
    ctx.expression_out << "(("
    ctx.expression_out << unbound_names.join(", ") unless unbound_names.empty?
    ctx.expression_out << ") => "
    ctx.expression_out << conv.compile(args_in_order)
    ctx.expression_out << ")"
  end
end
