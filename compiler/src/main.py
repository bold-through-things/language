#!/usr/bin/env python3

from pathlib import Path
import argparse
import os
import streaming_compiler

parser = argparse.ArgumentParser()
parser.add_argument('input_dir')

args = parser.parse_args()

os.chdir(args.input_dir)
result = list(Path(".").rglob("*.ind"))
streaming = streaming_compiler.StreamingCompiler()

def read_file_lines():
    for filename in result:
        with open(filename) as file:
            for line in file:
                yield line
            return

lines = read_file_lines()
streaming.consume_all(lines)
streaming.compile()