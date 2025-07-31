"""
improved test error reporting for the language compiler tests.
handles large diffs gracefully and stores full output for debugging.
"""

import difflib
import tempfile
from pathlib import Path
from typing import Optional, Tuple

class TestDiffReporter:
    """handles test output comparison with better diff reporting."""
    
    def __init__(self, test_case_path: Path):
        self.test_case_path = test_case_path
        self.diff_dir = test_case_path / "test_diffs"
        self.diff_dir.mkdir(exist_ok=True)
    
    def compare_text(self, actual: str, expected: str, output_type: str) -> Tuple[bool, Optional[str]]:
        """
        compare actual vs expected text and return (is_equal, error_message).
        if not equal, stores full diff in test directory and returns helpful error message.
        """
        if actual.strip() == expected.strip():
            return True, None
        
        # store the actual output for debugging
        actual_file = self.diff_dir / f"actual_{output_type}.txt"
        with open(actual_file, 'w', encoding='utf-8') as f:
            f.write(actual)
        
        # store the expected output for comparison
        expected_file = self.diff_dir / f"expected_{output_type}.txt"
        with open(expected_file, 'w', encoding='utf-8') as f:
            f.write(expected)
        
        # generate unified diff
        diff_lines = list(difflib.unified_diff(
            expected.splitlines(keepends=True),
            actual.splitlines(keepends=True),
            fromfile=f"expected_{output_type}",
            tofile=f"actual_{output_type}",
            lineterm=""
        ))
        
        # store full diff
        diff_file = self.diff_dir / f"diff_{output_type}.txt"
        with open(diff_file, 'w', encoding='utf-8') as f:
            f.writelines(diff_lines)
        
        # create error message
        diff_preview = '\n'.join(diff_lines[:50])  # first 50 lines of diff
        if len(diff_lines) > 50:
            diff_preview += f"\n... (and {len(diff_lines) - 50} more lines)\n"
        
        error_msg = f"""{output_type} mismatch.

preview of differences:
{diff_preview}

full diff stored in: {diff_file}
actual output stored in: {actual_file}
expected output stored in: {expected_file}

to review:
  cat {diff_file}
  diff {expected_file} {actual_file}
"""
        
        return False, error_msg

def create_test_diff_reporter(test_case: "TestCase") -> TestDiffReporter:
    """create a diff reporter for the given test case."""
    return TestDiffReporter(test_case.case_path)