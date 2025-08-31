#!/usr/bin/env python3
"""
py2cr_missing.py

Usage:
  python py2cr_missing.py /path/to/python_src /path/to/crystal_src

It scans all *.py files under the first directory, maps them to *.cr with the
same relative paths, and prints the ones that are missing from the Crystal tree.

Exit codes:
  0 = no files missing
  1 = some files missing
  2 = invalid input (dirs don't exist or not readable)
"""
from __future__ import annotations
import sys
import argparse
from pathlib import Path

DEFAULT_IGNORE_DIRS = {".git", ".hg", ".svn", "__pycache__", ".mypy_cache", ".venv", "venv", ".idea", ".vscode"}

def list_python_files(root: Path) -> set[Path]:
    files = set()
    for p in root.rglob("*.py"):
        # skip hidden or ignored directories in the relative path
        rel_parts = p.relative_to(root).parts
        if any(part.startswith(".") for part in rel_parts):
            continue
        if any(part in DEFAULT_IGNORE_DIRS for part in rel_parts):
            continue
        files.add(p)
    return files

def list_crystal_files(root: Path) -> set[Path]:
    files = set()
    for p in root.rglob("*.cr"):
        rel_parts = p.relative_to(root).parts
        if any(part.startswith(".") for part in rel_parts):
            continue
        if any(part in DEFAULT_IGNORE_DIRS for part in rel_parts):
            continue
        files.add(p)
    return files

def main() -> int:
    ap = argparse.ArgumentParser(description="Report Crystal files missing for Python sources.")
    ap.add_argument("python_dir", type=Path, help="Directory containing Python sources (*.py)")
    ap.add_argument("crystal_dir", type=Path, help="Directory containing Crystal sources (*.cr)")
    args = ap.parse_args()

    py_root: Path = args.python_dir.resolve()
    cr_root: Path = args.crystal_dir.resolve()

    if not py_root.is_dir() or not cr_root.is_dir():
        print("error: both arguments must be existing directories", file=sys.stderr)
        return 2

    py_files = list_python_files(py_root)
    cr_files = list_crystal_files(cr_root)

    # Build a set of relative Crystal paths that actually exist
    existing_cr_rel = {p.relative_to(cr_root) for p in cr_files}

    # For each Python file, compute expected Crystal relative path
    missing = []
    for py in py_files:
        rel_py = py.relative_to(py_root)
        rel_cr = rel_py.with_suffix(".cr")
        if rel_cr not in existing_cr_rel:
            missing.append(rel_cr)

    # Sort for stable, nice output
    missing_sorted = sorted(missing)

    if missing_sorted:
        for path in missing_sorted:
            print(str(path))
        return 1
    else:
        # No output if nothing is missing; still helpful to return 0
        return 0

if __name__ == "__main__":
    raise SystemExit(main())
