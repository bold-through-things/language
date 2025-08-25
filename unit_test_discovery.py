#!/usr/bin/env python3
"""
Unit test discovery for integration with the main test framework.
Discovers test_*.py files and extracts unittest.TestCase classes.
"""

import ast
import importlib.util
import sys
import unittest
from pathlib import Path
from typing import List, Tuple, Type, Dict, Any


def discover_unit_test_files(root_dir: Path = None) -> List[Path]:
    """Discover all test_*.py files in the project."""
    if root_dir is None:
        root_dir = Path(".")
    
    # Find all test_*.py files
    test_files = []
    for test_file in root_dir.rglob("test_*.py"):
        # Skip the main test file itself
        if test_file.name == "test" or test_file.suffix != ".py":
            continue
        test_files.append(test_file)
    
    return test_files


def extract_test_classes_from_module(module: Any) -> List[str]:
    """Extract TestCase class names from a loaded module."""
    test_classes = []
    
    for attr_name in dir(module):
        attr = getattr(module, attr_name)
        if (isinstance(attr, type) and 
            issubclass(attr, unittest.TestCase) and 
            attr != unittest.TestCase):
            test_classes.append(attr_name)
    
    return test_classes


def load_unit_test_module(filepath: Path) -> Any:
    """Dynamically load a Python module from file path."""
    spec = importlib.util.spec_from_file_location(filepath.stem, filepath)
    if spec is None or spec.loader is None:
        raise ImportError(f"Cannot load module from {filepath}")
    
    module = importlib.util.module_from_spec(spec)
    
    # Add the module directory to sys.path temporarily
    module_dir = str(filepath.parent)
    if module_dir not in sys.path:
        sys.path.insert(0, module_dir)
    
    try:
        spec.loader.exec_module(module)
        return module
    finally:
        # Clean up sys.path
        if module_dir in sys.path:
            sys.path.remove(module_dir)


def discover_unit_tests(root_dir: Path = None) -> List[Tuple[str, Type[unittest.TestCase]]]:
    """
    Discover all unit test classes and their test methods.
    
    Args:
        root_dir: root directory to search for unit tests
        
    Returns:
        list of (test_name, test_class) tuples
    """
    if root_dir is None:
        root_dir = Path(".")
    
    unit_tests = []
    test_files = discover_unit_test_files(root_dir)
    
    for test_file in test_files:
        try:
            # Load the module - this might crash if the module has import-time errors
            module = load_unit_test_module(test_file)
            
            # Find all TestCase classes in the module
            for attr_name in dir(module):
                attr = getattr(module, attr_name)
                if (isinstance(attr, type) and 
                    issubclass(attr, unittest.TestCase) and 
                    attr != unittest.TestCase):
                    
                    # Get all test methods from this class
                    test_methods = [method for method in dir(attr) 
                                  if method.startswith('test')]
                    
                    for test_method in test_methods:
                        test_name = f"unit_{test_file.stem}_{attr_name}_{test_method}"
                        unit_tests.append((test_name, attr, test_method))
                        
        except Exception as e:
            raise RuntimeError(f"Failed to load unit tests from {test_file}: {e}") from e
    
    return unit_tests


if __name__ == "__main__":
    # Test the discovery
    files = discover_unit_test_files()
    print(f"Found {len(files)} unit test files:")
    for f in files:
        print(f"  {f}")
        module = load_unit_test_module(f)
        classes = extract_test_classes_from_module(module)
        print(f"    Classes: {classes}")
    
    print("\nDiscovering all unit tests:")
    tests = discover_unit_tests()
    for name, cls in tests:
        print(f"  {name} -> {cls}")