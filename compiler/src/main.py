#!/usr/bin/env python3

from pathlib import Path
import argparse
import os
from tree_parser import TreeParser
from processor import Compiler

parser = argparse.ArgumentParser()
parser.add_argument('input_dir')
parser.add_argument('output_file')

args = parser.parse_args()

os.chdir(args.input_dir)
result = list(Path(".").rglob("*.ind"))
compiler = Compiler()

parser = TreeParser()
for filename in result:
    with open(filename) as file:
        node = parser.parse_tree(file.read())
        compiler.register(node)
        print(repr(node))

compiled = compiler.compile_JS()
open(args.output_file, "w").write(compiled)
