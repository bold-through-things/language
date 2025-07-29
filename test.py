#!/usr/bin/env python3

from dataclasses import dataclass
import fnmatch
import json
import sys
import threading
import time
import unittest
import subprocess
import tempfile
import os
from pathlib import Path

import unittest
import subprocess
import tempfile
import shutil
import os
from pathlib import Path
from typing import Optional, Tuple
from subprocess import Popen, PIPE
from typing import List

TEST_ROOT = Path("test")
EXECUTABLE = "out.js"

def find_deno_executable() -> Path:
    """Find Deno executable, checking local installation first, then global."""
    # Check local installation first
    local_deno = Path(".deno/bin/deno")
    if local_deno.is_file():
        return local_deno
    
    # Check global installation via which
    import shutil
    global_deno = shutil.which("deno")
    if global_deno:
        return Path(global_deno)
    
    # Return local path as fallback (for error messaging)
    return local_deno

DENO_PATH = find_deno_executable()

def read_file(path: Path) -> Optional[str]:
    return path.read_text(encoding="utf-8") if path.exists() else None
def run_with_input(exec_cmd: List[str], stdin: str, line_delayed: bool = True) -> Tuple[int, str, str]:
    proc = Popen(exec_cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE, text=True, bufsize=1)

    output_lines: List[str] = []
    error_lines: List[str] = []

    def read_output() -> None:
        for line in proc.stdout:
            output_lines.append(line)

    def read_error() -> None:
        for line in proc.stderr:
            error_lines.append(line)

    threading.Thread(target=read_output, daemon=True).start()
    threading.Thread(target=read_error, daemon=True).start()

    if proc.stdin:
        if line_delayed:
            for line in stdin.splitlines():
                time.sleep(0.6)
                proc.stdin.write(line + "\n")
                proc.stdin.flush()
        else:
            proc.stdin.write(stdin)
            proc.stdin.flush()
        proc.stdin.close()

    proc.wait()

    if proc.stdout:
        proc.stdout.close()
    if proc.stderr:
        proc.stderr.close()

    return proc.returncode, "".join(output_lines), "".join(error_lines)

@dataclass(kw_only=True)
class TestCase:
    name: str = ""
    def_path: Path
    case_path: Path
    code_path: Path

import json
from pathlib import Path
from typing import TypeAlias
from itertools import product

def discover_tests(args) -> list[TestCase]:
    def resolve(pattern: str, base: Path) -> list[Path]:
        if not pattern:
            raise ValueError(f"Empty pattern in {base}")
        return list(base.glob(pattern)) if "*" in pattern else [base / pattern]

    import re

    glob = lambda x: True
    if args.glob:
        pattern = fnmatch.translate(f"**{args.glob}**") # TODO - might fail with --glob anagra*
        glob = re.compile(pattern)
        glob = glob.match

    tests: list[TestCase] = []

    for tests_json_path in TEST_ROOT.rglob("tests.json"):

        with open(tests_json_path, "r") as f:
            # TODO - instead of JSON leverage our own format
            entries = json.load(f)

        base_dir = tests_json_path.parent

        for entry in entries:
            code_glob = entry["code"]
            case_glob = entry["case"]

            code_paths = resolve(code_glob, base_dir)
            case_paths = resolve(case_glob, base_dir)

            for code_path, case_path in product(code_paths, case_paths):
                def_parts = base_dir.relative_to(TEST_ROOT).parts
                code_parts = code_path.relative_to(base_dir).parts
                case_parts = case_path.relative_to(base_dir).parts
                name = "test_" + "_".join(def_parts + code_parts + case_parts)
                if not glob(str(name)):
                    print(f"ignoring `{name}` per midglob `{args.glob}`")
                    continue
                tests.append(TestCase(def_path=base_dir, case_path=case_path, code_path=code_path, name=name))

    return tests

def make_test_method(tc: TestCase, args):
    def test(self: unittest.TestCase) -> None:
        case_dir = tc.case_path
        code_dir = tc.code_path
        print(tc.name)
        print(f"running test for {tc}")
        expected_compile_err = read_file(code_dir / "compile.stderr")
        expected_runtime_err = read_file(case_dir / "runtime.stderr")
        expected_stdout = read_file(case_dir / "success.stdout")
        if args.stdin:
            stdin_text = sys.stdin.read()
        else:
            stdin_text = read_file(case_dir / "stdin")

        with tempfile.TemporaryDirectory() as tmpdir_str:
            tmpdir = Path(tmpdir_str)
            compile_err_actual = code_dir / "compile.stderr.actual"
            if compile_err_actual.exists():
                os.remove(compile_err_actual)
            out_path = code_dir / EXECUTABLE

            # TODO - is this obsolete? what are we gaining from this copy ?
            shutil.copytree(code_dir, tmpdir, dirs_exist_ok=True)
            shutil.copytree(case_dir, tmpdir, dirs_exist_ok=True)

            if args.compile:
                compiler_path = Path("compiler/src/main.py")
                print(f"{case_dir}: compiling...")
                compile_cmd = [compiler_path.absolute(), tmpdir.absolute(), out_path.absolute(), "--errors-file", compile_err_actual.absolute()]
                compile_proc = subprocess.run(compile_cmd, cwd=tmpdir, capture_output=True, text=True)
                print(f"{case_dir}: done compiling. {compile_proc.returncode=}")
                print(compile_proc.stdout)
                print(compile_proc.stderr)

                if expected_compile_err is not None:
                    self.assertEqual(
                        read_file(compile_err_actual),
                        expected_compile_err,
                        msg="Compile stderr mismatch"
                    )
                    self.assertNotEqual(compile_proc.returncode, 0, msg="Expected compile to fail")
                    return

                self.assertEqual(compile_proc.returncode, 0, msg=f"Compile failed unexpectedly\n{compile_proc.stderr}")

            if args.run:
                fuck_you_python = lambda arg, if_cond: arg if if_cond else None
                
                exec_cmd = [DENO_PATH.absolute(), "run", fuck_you_python("--inspect-brk=127.0.0.1:9229", args.debug), out_path.absolute()]
                exec_cmd = list(filter(None, exec_cmd))
                print(f"{case_dir}: running... {exec_cmd}")
                returncode, stdout, stderr = run_with_input(exec_cmd, stdin=stdin_text, line_delayed=False)
                print(f"{case_dir}: complete.")
                print(stdout)

                if args.stdin:
                    pass # custom input? don't assert.
                else:
                    print(stdout.strip())
                    print(stderr.strip())
                    if expected_runtime_err is not None:
                        self.assertEqual(
                            stderr.strip(),
                            expected_runtime_err.strip(),
                            msg="Runtime stderr mismatch"
                        )
                        self.assertNotEqual(returncode, 0, msg="Expected runtime failure")
                    else:
                        self.assertEqual(
                            stdout.strip(),
                            expected_stdout.strip() if expected_stdout else "",
                            msg="Runtime stdout mismatch"
                        )
                        self.assertEqual(returncode, 0, msg="Runtime failed unexpectedly")
    return test

if __name__ == "__main__":
    # Dynamically create test methods
    class MyLangTestCase(unittest.TestCase): pass

    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-g", "--glob", help="Only run tests matching glob")
    parser.add_argument("-s", "--stdin", action='store_true', help="Pass the Python stdin to each test")
    parser.add_argument("-c", "--compile", action='store_true', help="Only check compilation of target tests")
    parser.add_argument("-d", "--debug", action='store_true', help="Execute runtime in debug mode")
    parser.add_argument("-r", "--run", action='store_true', help="Skip compilation. Assume the tests are already compiled, and only run the existing output")

    args, remaining = parser.parse_known_args()
    sys.argv = [sys.argv[0]] + remaining  # leave only unknown args for unittest

    if not args.compile and not args.run:
        # default behavior
        args.run = True
        args.compile = True

    if args.run:
        if not DENO_PATH.is_file():
            raise ValueError(
                "run with what? Deno pls.\n"
                "Install deno globally: curl -fsSL https://deno.land/install.sh | sh\n"
                "Or locally: curl -fsSL https://deno.land/install.sh | DENO_INSTALL=.deno sh"
            )
    
    for tc in discover_tests(args):
        setattr(MyLangTestCase, tc.name, make_test_method(tc, args))
    
    unittest.main()

