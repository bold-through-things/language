#!/usr/bin/env python3
"""
pre-commit hook logic - called by git-hooks/pre-commit via subprocess.
this handles test execution and artifact management with proper module imports.
"""

import subprocess
import sys
from pathlib import Path

# import shared test discovery logic to avoid duplication
from test_discovery import discover_tests, get_test_artifacts

def run_command(cmd, cwd=None):
    """run a command and return returncode, stdout, stderr"""
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd)
    return result.returncode, result.stdout, result.stderr

def main():
    repo_root = Path(__file__).parent
    
    print("running tests before commit...")
    
    # run tests with compilation only (faster)
    returncode, stdout, stderr = run_command(
        ["python3", "test", "--compile"],
        cwd=repo_root
    )
    
    if returncode != 0:
        print("tests failed - commit aborted")
        print(stderr)
        return 1
    
    print("tests passed, adding valuable test artifacts...")
    
    # discover all test cases using shared logic
    test_cases = discover_tests(repo_root / "tests")
    
    # collect all artifacts from all test cases
    all_artifacts = []
    for test_case in test_cases:
        artifacts = get_test_artifacts(test_case)
        all_artifacts.extend(artifacts)
    
    if all_artifacts:
        # remove duplicates while preserving order
        unique_artifacts = []
        seen = set()
        for artifact in all_artifacts:
            if artifact not in seen:
                unique_artifacts.append(artifact)
                seen.add(artifact)
        
        artifact_paths = [str(artifact) for artifact in unique_artifacts]
        returncode, stdout, stderr = run_command(
            ["git", "add"] + artifact_paths,
            cwd=repo_root
        )
        
        if returncode != 0:
            print(f"failed to add artifacts: {stderr}")
            return 1
            
        print("added valuable test artifacts to commit:")
        for artifact in unique_artifacts:
            print(f"  {artifact.relative_to(repo_root)}")
    else:
        print("no test artifacts found to add")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())