#!/usr/bin/env python3
"""Test the TypeScript parser - crash hard on first failure."""

import sys
import os
import unittest
from pathlib import Path
from typescript_parser import parse_typescript_content


class TypeScriptParserTest(unittest.TestCase):
    """Test the TypeScript parser functionality."""
    pass


def make_file_test(filepath: Path):
    """Create a test method for a specific TypeScript file."""
    def test_method(self):
        print(f"Testing {filepath}...")
        with open(filepath) as f:
            content = f.read()
        
        # CRASH HARD: Any parsing failure is fatal
        declarations = parse_typescript_content(content, str(filepath))
        print(f"✓ Successfully parsed {len(declarations)} declarations")
        
        # Basic assertion that we got something
        self.assertIsInstance(declarations, list)
    
    return test_method


# Dynamically add test methods for each .d.ts file
typescript_defs_dir = Path(__file__).parent / "typescript_defs"
if not typescript_defs_dir.exists():
    raise RuntimeError(f"Directory {typescript_defs_dir} does not exist")

files = list(typescript_defs_dir.glob("*.d.ts"))
if not files:
    raise RuntimeError(f"No .d.ts files found in {typescript_defs_dir}")

for filepath in sorted(files):
    # Create a safe method name from the filename
    method_name = f"test_{filepath.stem.replace('-', '_').replace('.', '_')}"
    setattr(TypeScriptParserTest, method_name, make_file_test(filepath))


if __name__ == "__main__":
    unittest.main()