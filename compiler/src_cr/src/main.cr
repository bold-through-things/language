#!/usr/bin/env crystal

# main.cr — entrypoint

require "json"
require "option_parser"
require "path"
require "file_utils"

require "./utils/if_i_can_crystal.cr"

# configure logging before requiring modules that register macros
require "./utils/logger"          # expects: configure_logger_from_args(String?) and default_logger
configure_logger_from_args(nil)   # placeholder, will be overridden by --log if passed

# now load modules that may register macros and depend on logging being configured
require "./core/tree_parser"      # expects: class TreeParser with parse_tree(String, Macrocosm) : Node
require "./core/macrocosm"        # expects: create_macrocosm : Macrocosm

# ---- CLI parsing ----

input_dir   = ""
output_file = ""
errors_file : String? = nil
log_spec    : String? = nil
expand      = false
rte         = false

parser = OptionParser.new do |op|
  op.banner = "Usage: main [options] <input_dir> <output_file>"

  op.on("--errors-file FILE", "Write errors/warnings JSON to FILE") { |f| errors_file = f }
  op.on("--log TAGS", "Comma-separated log tags (e.g. typecheck,macro)") { |s| log_spec = s }
  op.on("--expand", "Two-step: write .67lang.expanded instead of .js") { expand = true }
  op.on("--rte", "Compile from .67lang.expanded → .js (changes input pattern)") { rte = true }
  op.on("-h", "--help", "Show this help") do
    puts op
    exit 0
  end
end

begin
  parser.parse(ARGV)
  if ARGV.size != 2
    STDERR.puts parser
    exit 2
  end
  input_dir, output_file = ARGV
rescue ex
  STDERR.puts ex.message
  STDERR.puts parser
  exit 2
end

# reconfigure logging with the user-provided tags
configure_logger_from_args(log_spec)

# ---- helpers ----

def human_readable(inspections : Array(Hash(String, MetaValue))) : Nil
  inspections.reverse_each.with_index(1) do |entry, i|
    io = IO::Memory.new
    puts "\n\n#{i}:"
    entry.each do |k, v|
      io << k.inspect
      io << " = "
      io << v.to_json
      io << "\n"
    end
    print io.to_s
  end
end

def write_json(inspections : JSON::Any, output : IO) : Nil
  inspections.to_pretty_json(output)
  output << '\n'
  output.flush
end

# ---- main flow ----

default_logger.compile("starting compilation process")

input_path   = Path[input_dir]
file_pattern = rte ? "**/*.67lang.expanded" : "**/*.67lang"

result = Dir.glob(input_path / file_pattern).select { |p| File.file?(p) }.map { |s| Path[s] }
default_logger.compile("found #{result.size} .67lang files: #{result.map(&.to_s)}")

its_just_macros = create_macrocosm

# registry summary (only strings; adjust .all return type in your reg impl as needed)
codegen_macros     = its_just_macros.registries["emission"].all.keys.join(", ")
typecheck_macros   = its_just_macros.registries["typecheck"].all.keys.join(", ")
preprocessor_macros= its_just_macros.registries["preprocess"].all.keys.join(", ")
default_logger.registry("macro registry initialized with codegen macros: #{codegen_macros}")
default_logger.registry("typecheck registry initialized with typecheck macros: #{typecheck_macros}")
default_logger.registry("preprocessor registry initialized with preprocessor macros: #{preprocessor_macros}")

parser_inst = TreeParser.new

default_logger.indent("compile", "parsing files") do
  result.each do |filename|
    default_logger.compile("parsing #{filename}")
    src = File.read(filename.to_s)
    node = parser_inst.parse_tree(src, its_just_macros)
    its_just_macros.register(node)
  end
end

crash    : String? = nil
compiled : String? = nil

default_logger.indent("compile", "single-step compilation") do
  begin
    compiled = its_just_macros.compile
  rescue ex
    crash = ex.inspect_with_backtrace
    default_logger.compile("compilation crashed: #{ex.message}")
  end
end

had_errors = its_just_macros.compile_errors.size != 0

if expand
  default_logger.compile("expand mode: writing expanded form to #{output_file}")
  File.open(output_file, "w") do |f|
    its_just_macros.nodes.each do |node|
      # expects Node#inspect or #to_s to produce repr-like output
      f.puts node.inspect
      f.puts
    end
  end
else
  if compiled && !had_errors
    default_logger.compile("compilation successful, writing output to #{output_file}")
    File.write(output_file, compiled)
  end
end

puts "refactor confidently when the flame flickers."

if had_errors || crash
  puts "#{its_just_macros.compile_errors.size} compile errors."

  if had_errors
    if errors_file
      File.open(errors_file.not_nil!, "w") do |f|
        write_json(compile_errors_to_json_any(its_just_macros.compile_errors), f)
      end
      puts "seek them in #{errors_file}."
    else
      human_readable(its_just_macros.compile_errors)
    end
  end

  if crash
    print crash
  end

  exit 1
end
