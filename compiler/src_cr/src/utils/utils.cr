class TypeMap
  # Boxed storage so we can keep mixed types without using Object unions
  abstract class Box; end

  class TypedBox(T) < Box
    getter value : T
    def initialize(@value : T); end
  end

  def initialize
    @store = {} of String => Box
  end

  def [](klass : T.class) : T forall T
    key = klass.name
    if box = @store[key]?
      return box.as(TypedBox(T)).value
    end
    if factory = self.class.default_factory_for(klass)
      value = factory.call
      @store[key] = TypedBox(T).new(value)
      return value
    end
    raise KeyError.new("No entry or default factory registered for #{key}")
  end

  def maybe(klass : T.class) : T? forall T
    if box = @store[klass.name]?
      box.as(TypedBox(T)).value
    else
      nil
    end
  end

  def []=(klass : T.class, value : T) : Nil forall T
    @store[klass.name] = TypedBox(T).new(value)
  end

  # ---- default_factory_for ----
  # Always-present fallback (no factory)
  def self.default_factory_for(_klass : Class)
    nil
  end

  # Typed overloads for types you opt-in (only if they have a nullary .new)
  macro def_default_factory_for(*types)
    {% for t in types %}
      def self.default_factory_for(_klass : {{t}}.class) : Proc({{t}})?
        ->{ {{t}}.new }
      end
    {% end %}
  end
end


# no-op scope helper so code can write `scope { ... }`
def scope(&block : ->) : Nil
  yield
end

# dbg! — print + passthrough, with argument erasure (safe stringify)
macro dbg!(*xs)
  {% if xs.size == 0 %}
    STDERR.puts "(dbg) at #{__FILE__}:#{__LINE__}"
    nil
  {% elsif xs.size == 1 %}
    {{xs[0]}}.tap do |__v__|
      STDERR.puts({{xs[0].stringify}} + " ⇒ #{__v__.inspect} (#{__FILE__}:#{__LINE__})")
    end
  {% else %}
    {% for x, i in xs %}
      ({{x}}).tap do |__v__|
        STDERR.puts({{x.stringify}} + " ⇒ #{__v__.inspect} (#{__FILE__}:#{__LINE__})")
      end{% if i < xs.size - 1 %}, {% end %}
    {% end %}
  {% end %}
end

