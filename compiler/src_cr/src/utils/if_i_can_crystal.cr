# utils/if_i_can_crystal.cr

# TODO comment this shit for proper docs

macro assert(invariant)
  if !({{invariant}})
    # TODO a clearer message
    raise("runtime_assert") 
  end
end

# Crystal fucking sucks. this would be so much better if it were
# receiver syntax
#
# `maybe_array.or_empty!`
def empty_Array_unless(arr : Array(T)?) : Array(T) forall T
  arr || [] of T
end

macro p67!(label, *args)
  %label = {{label}}
  %file = {{__FILE__.stringify}}
  %line = {{__LINE__}}
  %meth = {% if @def %} {{@def.name.stringify}} {% else %} "toplevel" {% end %}

  STDOUT.puts "\n\n#{%label} @ #{%meth} @ #{%file} : #{%line}"

  {% for arg in args %}
    begin
      %val = {{arg}}
      %s = (%val.is_a?(String) ? %val : %val.inspect).gsub("\n", "\n\t")
      STDOUT.puts "{{arg}} = #{%s}"
    rescue ex
      STDOUT.puts "{{arg}} = <error: #{ex.message}>"
    end
  {% end %}
end
