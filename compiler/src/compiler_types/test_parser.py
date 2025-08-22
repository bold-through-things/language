#!/usr/bin/env python3
"""Test the TypeScript parser - crash hard on first failure."""

import sys
import os
from pathlib import Path
from typescript_parser import parse_typescript_content

def test_all_files():
    """Test all .d.ts files in typescript_defs - crash hard on first failure."""
    typescript_defs_dir = Path("typescript_defs")
    if not typescript_defs_dir.exists():
        raise RuntimeError(f"Directory {typescript_defs_dir} does not exist")
    
    files = list(typescript_defs_dir.glob("*.d.ts"))
    if not files:
        raise RuntimeError(f"No .d.ts files found in {typescript_defs_dir}")
    
    print(f"Testing {len(files)} TypeScript definition files...")
    
    for filepath in sorted(files):
        print(f"Testing {filepath}...")
        with open(filepath) as f:
            content = f.read()
        
        # CRASH HARD: Any parsing failure is fatal
        declarations = parse_typescript_content(content, str(filepath))
        print(f"✓ Successfully parsed {len(declarations)} declarations")
    
    print("✓ All files parsed successfully")

if __name__ == "__main__":
    if len(sys.argv) == 1:
        # No arguments - test all files, crash hard on first failure
        test_all_files()
    else:
        # Specific file provided
        filepath = sys.argv[1]
        print(f"Testing {filepath}...")
        with open(filepath) as f:
            content = f.read()
        
        # CRASH HARD: Any parsing failure is fatal
        declarations = parse_typescript_content(content, filepath)
        print(f"✓ Successfully parsed {len(declarations)} declarations")