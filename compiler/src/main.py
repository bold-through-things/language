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
parser.add_argument('--log', help="comma-separated list of log tags to enable (e.g., 'typecheck,macro'). omit to enable all logging.")
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

parser = TreeParser()
with default_logger.indent("compile", "parsing files"):
    for filename in result:
        default_logger.compile(f"parsing {filename}")
        with open(filename) as file:
            node = parser.parse_tree(file.read())
            compiler.register(node)

crash = None
compiled = None

if args.expand:
    # Two-step compilation: .ind → .ind.expanded → .js
    default_logger.compile("two-step compilation mode enabled")
    
    # Step 1: .ind → .ind.expanded  
    expanded_file = Path(args.output_file).parent / ".ind.expanded"
    with default_logger.indent("compile", "step 1: .ind → .ind.expanded"):
        try:
            compiler.compile()  # This processes and expands the nodes
        except Exception as e:
            exc_info = sys.exc_info()
            crash = ''.join(traceback.format_exception(*exc_info))
            default_logger.compile(f"step 1 compilation crashed: {e}")
        
        if not crash and len(compiler.compile_errors) == 0:
            default_logger.compile(f"writing expanded form to {expanded_file}")
            with open(expanded_file, "w") as f:
                for node in compiler.nodes:
                    f.write(repr(node))
                    f.write("\n\n")
    
    # Step 2: .ind.expanded → .js
    if not crash and len(compiler.compile_errors) == 0:
        with default_logger.indent("compile", "step 2: .ind.expanded → .js"):
            # Create new compiler for step 2
            compiler2 = Compiler()
            parser2 = TreeParser()
            
            # Parse the expanded file
            default_logger.compile(f"parsing expanded file {expanded_file}")
            with open(expanded_file) as file:
                expanded_content = file.read()
                # Split by double newlines to get individual nodes
                node_texts = [text.strip() for text in expanded_content.split("\n\n") if text.strip()]
                for node_text in node_texts:
                    try:
                        node = parser2.parse_tree(node_text)
                        compiler2.register(node)
                    except Exception as e:
                        default_logger.compile(f"failed to parse expanded node: {e}")
                        # For now, continue with other nodes
            
            try:
                compiled = compiler2.compile()
                default_logger.compile("step 2 compilation successful")
            except Exception as e:
                exc_info = sys.exc_info()
                crash = ''.join(traceback.format_exception(*exc_info))
                default_logger.compile(f"step 2 compilation crashed: {e}")
                
            # Merge any compile errors from step 2
            compiler.compile_errors.extend(compiler2.compile_errors)
else:
    # Standard single-step compilation: .ind → .js
    with default_logger.indent("compile", "single-step compilation"):
        try:
            compiled = compiler.compile()
        except Exception as e:
            exc_info = sys.exc_info()
            crash = ''.join(traceback.format_exception(*exc_info))
            default_logger.compile(f"compilation crashed: {e}")

    # Always write expanded file for debugging purposes
    expanded_file = Path(args.output_file).parent / ".ind.expanded"
    default_logger.compile(f"writing expanded form to {expanded_file}")
    with open(expanded_file, "w") as f:
        for node in compiler.nodes:
            f.write(repr(node))
            f.write("\n\n")

if compiled:
    default_logger.compile(f"compilation successful, writing output to {args.output_file}")
    with open(args.output_file, "w") as f:
        f.write(compiled)

default_logger.compile("refactor confidently when the flame flickers.")

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