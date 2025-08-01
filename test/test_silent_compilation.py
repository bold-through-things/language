#!/usr/bin/env python3
"""
Test that the compiler runs silently (no log output) when --log is not provided.
This test ensures that the log spam issue is fixed.
"""

import subprocess
import tempfile
import os
from pathlib import Path

def test_silent_compilation():
    """Test that compilation is silent by default using existing test case"""
    
    # Use an existing working test case
    test_dir = Path(__file__).parent / "basics" / "anagram_groups"
    
    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir_path = Path(tmpdir)
        output_file = tmpdir_path / "out.js"
        
        # Run compiler without --log
        compiler_path = Path(__file__).parent.parent / "compiler" / "src" / "main.py"
        result = subprocess.run(
            [str(compiler_path), str(test_dir), str(output_file)],
            capture_output=True,
            text=True,
            cwd=tmpdir_path
        )
        
        # Check that compilation succeeded
        assert result.returncode == 0, f"Compilation failed: {result.stderr}"
        
        # Check that stdout contains the final flicker message and stderr is empty
        stdout_lines = [line.strip() for line in result.stdout.strip().split('\n') if line.strip()]
        stderr_lines = [line.strip() for line in result.stderr.strip().split('\n') if line.strip()]
        expected_message = "refactor confidently when the flame flickers."
        
        # The flicker message should be the only output, either in stdout or stderr
        total_lines = stdout_lines + stderr_lines
        assert len(total_lines) == 1, f"Expected only the flicker message, but got stdout: {stdout_lines}, stderr: {stderr_lines}"
        assert total_lines[0] == expected_message, f"Expected '{expected_message}', got '{total_lines[0]}'"
        
        # Verify that output file was created
        assert output_file.exists(), "Output file was not created"

def test_verbose_compilation():
    """Test that compilation shows logs when --log is provided"""
    
    # Use an existing working test case
    test_dir = Path(__file__).parent / "basics" / "anagram_groups"
    
    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir_path = Path(tmpdir)
        output_file = tmpdir_path / "out.js"
        
        # Run compiler with --log registry
        compiler_path = Path(__file__).parent.parent / "compiler" / "src" / "main.py"
        result = subprocess.run(
            [str(compiler_path), str(test_dir), str(output_file), "--log", "registry"],
            capture_output=True,
            text=True,
            cwd=tmpdir_path
        )
        
        # Check that compilation succeeded
        assert result.returncode == 0, f"Compilation failed: {result.stderr}"
        
        # Check that stderr contains registry log messages
        stdout_lines = [line.strip() for line in result.stdout.strip().split('\n') if line.strip()]
        stderr_lines = [line.strip() for line in result.stderr.strip().split('\n') if line.strip()]
        
        all_output = result.stdout + result.stderr
        assert "[registry] registering macro" in all_output, "Expected registry log messages when --log registry is used"
        assert "refactor confidently when the flame flickers." in all_output, "Expected final flicker message"

if __name__ == "__main__":
    test_silent_compilation()
    test_verbose_compilation()
    print("✓ All silent compilation tests passed!")