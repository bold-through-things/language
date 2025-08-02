#!/usr/bin/env python3
"""
shared test discovery logic used by both ./test and git hooks
to avoid code duplication and ensure consistency
"""

import json
from pathlib import Path
from itertools import product
from typing import List, NamedTuple


class TestCase(NamedTuple):
    """represents a discovered test case"""
    def_path: Path  # directory containing tests.json
    case_path: Path  # specific case directory
    code_path: Path  # code directory
    name: str  # generated test name


def discover_tests(test_root: Path = None, glob_filter: str = None) -> List[TestCase]:
    """
    discover all test cases based on tests.json files
    
    Args:
        test_root: root directory to search for tests (defaults to "tests")
        glob_filter: optional glob pattern to filter test names
        
    Returns:
        list of TestCase objects
    """
    if test_root is None:
        test_root = Path("tests")
    
    def resolve(pattern: str, base: Path) -> List[Path]:
        if not pattern:
            raise ValueError(f"Empty pattern in {base}")
        return list(base.glob(pattern)) if "*" in pattern else [base / pattern]

    tests: List[TestCase] = []
    
    for tests_json_path in test_root.rglob("tests.json"):
        with open(tests_json_path, "r") as f:
            entries = json.load(f)
        
        base_dir = tests_json_path.parent
        
        for entry in entries:
            code_glob = entry["code"]
            case_glob = entry["case"]
            
            code_paths = resolve(code_glob, base_dir)
            case_paths = resolve(case_glob, base_dir)
            
            for code_path, case_path in product(code_paths, case_paths):
                def_parts = base_dir.relative_to(test_root).parts
                code_parts = code_path.relative_to(base_dir).parts
                case_parts = case_path.relative_to(base_dir).parts
                name = "test_" + "_".join(def_parts + code_parts + case_parts)
                
                # apply glob filter if provided
                if glob_filter:
                    import fnmatch
                    import re
                    pattern = fnmatch.translate(f"**{glob_filter}**")
                    if not re.compile(pattern).match(str(name)):
                        continue
                
                tests.append(TestCase(
                    def_path=base_dir,
                    case_path=case_path,
                    code_path=code_path,
                    name=name
                ))
    
    return tests


def get_test_artifacts(test_case: TestCase) -> List[Path]:
    """
    get all valuable test artifacts that should be tracked for a given test case
    
    Returns:
        list of artifact paths that actually exist
    """
    artifacts = []
    
    # artifacts in the case directory
    case_artifacts = [
        test_case.case_path / ".67lang.expanded",  # macro expansion history
        test_case.case_path / "out.js",            # JS emission history
        test_case.case_path / "success.stdout.actual",     # actual test output
        test_case.case_path / "runtime.stderr.actual",     # actual runtime errors
    ]
    
    # artifacts in the code directory  
    code_artifacts = [
        test_case.code_path / ".67lang.expanded",  # macro expansion history
        test_case.code_path / "out.js",            # JS emission history
        test_case.code_path / "compile.stderr.actual",     # actual compile errors
    ]
    
    # only include artifacts that actually exist
    for artifact in case_artifacts + code_artifacts:
        if artifact.exists():
            artifacts.append(artifact)
    
    return artifacts