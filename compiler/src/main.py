#!/usr/bin/env python3

from io import StringIO
import json
from pathlib import Path
import argparse
import os
import sys
import traceback
from typing import Any, TextIO
from tree_parser import TreeParser
from compiler import Compiler
from logger import configure_logger_from_args, default_logger

def human_readable(inspections: list[dict[str, Any]]) -> None:
    for i, entry in enumerate(reversed(inspections), 1):
        out = StringIO()
        print(f"\n\n{i}:")
        for k, v in entry.items():
            out.write(f"{k} = {v}")
        print(out.getvalue())

def write_json(inspections: list[dict[str, Any]], output: TextIO) -> None:
    json.dump(inspections, output, indent=2)
    output.write('\n')
    output.flush()

parser = argparse.ArgumentParser()
parser.add_argument('input_dir')
parser.add_argument('output_file')
parser.add_argument('--errors-file', help="will output compilation errors and warnings (as JSON) into this file if specified")
parser.add_argument('--log', help="comma-separated list of log tags to enable (e.g., 'typecheck,macro'). omit to disable all logging.")
parser.add_argument('--expand', action='store_true', help="compile in two-step mode: .ind → .ind.expanded → .js")

args = parser.parse_args()

# configure logging based on command line args
configure_logger_from_args(args.log)

default_logger.compile("starting compilation process")
with default_logger.indent("compile", "initialization"):
    os.chdir(args.input_dir)
    result = list(Path(".").rglob("*.ind"))
    default_logger.compile(f"found {len(result)} .ind files: {[str(f) for f in result]}")
    compiler = Compiler()
    
    # Log macro registry summary if registry logging is enabled
    if default_logger.is_tag_enabled("registry"):
        from processor_base import unified_macros, unified_typecheck
        from preprocessing_macros import preprocessor
        default_logger.registry(f"macro registry initialized with {len(unified_macros.all())} codegen macros")
        default_logger.registry(f"typecheck registry initialized with {len(unified_typecheck.all())} typecheck macros")  
        default_logger.registry(f"preprocessor registry initialized with {len(preprocessor.all())} preprocessor macros")

parser = TreeParser()
with default_logger.indent("compile", "parsing files"):
    for filename in result:
        default_logger.compile(f"parsing {filename}")
        with open(filename) as file:
            node = parser.parse_tree(file.read())
            compiler.register(node)

crash = None
compiled = None

# Standard compilation: .ind → (.js or .ind.expanded)
with default_logger.indent("compile", "single-step compilation"):
    try:
        compiled = compiler.compile()
    except Exception as e:
        exc_info = sys.exc_info()
        crash = ''.join(traceback.format_exception(*exc_info))
        default_logger.compile(f"compilation crashed: {e}")

if args.expand:
    # Write .ind.expanded instead of .js
    if compiled:
        default_logger.compile(f"expand mode: writing expanded form to {args.output_file}")
        with open(args.output_file, "w") as f:
            for node in compiler.nodes:
                f.write(repr(node))
                f.write("\n\n")
else:
    # Write .js output
    if compiled:
        default_logger.compile(f"compilation successful, writing output to {args.output_file}")
        with open(args.output_file, "w") as f:
            f.write(compiled)

print("refactor confidently when the flame flickers.")

if len(compiler.compile_errors) != 0 or crash:
    if len(compiler.compile_errors) != 0:
        if args.errors_file:
            with open(args.errors_file, 'w') as f:
                write_json(compiler.compile_errors, f)
        else:
            human_readable(compiler.compile_errors)
    
    if crash:
        print(crash, end='')
    
    exit(1)