#!/usr/bin/env python3

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

def discover_tests() -> list[Path]:
    tests = []
    for dirpath, _, filenames in os.walk(TEST_ROOT):
        files = set(filenames)
        if any(x in files for x in ("success.stdout", "compile.stderr", "runtime.stderr")):
            tests.append(Path(dirpath))
    return tests

def make_test_method(case_dir: Path):
    def test(self: unittest.TestCase) -> None:
        print(f"running test for {case_dir}")
        expected_compile_err = read_file(case_dir / "compile.stderr")
        expected_runtime_err = read_file(case_dir / "runtime.stderr")
        expected_stdout = read_file(case_dir / "success.stdout")
        stdin_text = read_file(case_dir / "stdin")
        print("stdin=")
        print(stdin_text)

        with tempfile.TemporaryDirectory() as tmpdir_str:
            tmpdir = Path(tmpdir_str)
            out_path = case_dir / EXECUTABLE
            shutil.copytree(case_dir, tmpdir, dirs_exist_ok=True)

            compiler_path = Path("compiler/src/main.py")
            print(f"{case_dir}: compiling...")
            compile_cmd = [compiler_path.absolute(), tmpdir.absolute(), out_path.absolute()]
            compile_proc = subprocess.run(compile_cmd, cwd=tmpdir, capture_output=True, text=True)
            print(f"{case_dir}: done compiling.")

            if expected_compile_err is not None:
                self.assertEqual(
                    compile_proc.stderr.strip(),
                    expected_compile_err.strip(),
                    msg="Compile stderr mismatch"
                )
                self.assertNotEqual(compile_proc.returncode, 0, msg="Expected compile to fail")
                return

            self.assertEqual(compile_proc.returncode, 0, msg=f"Compile failed unexpectedly\n{compile_proc.stderr}")

            exec_cmd = ["node", out_path.absolute()]
            print(f"{case_dir}: running...")
            returncode, stdout, stderr = run_with_input(exec_cmd, stdin=stdin_text, line_delayed=False)
            print(f"{case_dir}: complete.")
            print(stdout)

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

# Dynamically create test methods
class MyLangTestCase(unittest.TestCase): pass

for case_dir in discover_tests():
    parts = case_dir.relative_to(TEST_ROOT).parts
    name = "test_" + "_".join(parts)
    setattr(MyLangTestCase, name, make_test_method(case_dir))

if __name__ == "__main__":
    unittest.main()

