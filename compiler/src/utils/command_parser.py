"""
Generic command parsing utilities for handling space-separated token syntax.
Extracted from then_macro.py for reuse across macros.
"""

from typing import Dict, List, Optional, Any
from abc import ABC, abstractmethod


class Command(ABC):
    """Base class for command words in token parsing."""
    
    @abstractmethod
    def execute(self, tokens: List[str], pos: int, result: Dict[str, Any]) -> int:
        """Execute this command, modify result as needed, return new position."""
        pass


class SetFieldCommand(Command):
    """Handle setting a field in the result dict."""
    
    def __init__(self, field_name: str, takes_argument: bool = True):
        self.field_name = field_name
        self.takes_argument = takes_argument
    
    def execute(self, tokens: List[str], pos: int, result: Dict[str, Any]) -> int:
        if not self.takes_argument:
            result[self.field_name] = True
            return pos
        
        if pos >= len(tokens):
            return pos  # Error: no argument
        
        result[self.field_name] = tokens[pos]
        return pos + 1


class AppendToListCommand(Command):
    """Handle appending values to a list field."""
    
    def __init__(self, field_name: str):
        self.field_name = field_name
    
    def execute(self, tokens: List[str], pos: int, result: Dict[str, Any]) -> int:
        if pos >= len(tokens):
            return pos  # Error: no argument
        
        if self.field_name not in result:
            result[self.field_name] = []
        
        result[self.field_name].append(tokens[pos])
        return pos + 1


class ConsumeRestCommand(Command):
    """Handle consuming all remaining tokens into a list."""
    
    def __init__(self, field_name: str):
        self.field_name = field_name
    
    def execute(self, tokens: List[str], pos: int, result: Dict[str, Any]) -> int:
        result[self.field_name] = tokens[pos:]
        return len(tokens)


class CommandParser:
    """Generic parser for space-separated command syntax."""
    
    def __init__(self, content: str, commands: Dict[str, Command], default_fields: Dict[str, Any] = None):
        self.tokens = content.split()
        self.commands = commands
        self.default_fields = default_fields or {}
    
    def parse(self) -> Optional[Dict[str, Any]]:
        """Parse command tokens into structured components."""
        result = self.default_fields.copy()
        pos = 0
        
        # Handle the case where first token is not a command (implicit main argument)
        if self.tokens and self.tokens[0] not in self.commands:
            # First token is the main type/operation name
            result['main'] = self.tokens[0]
            pos = 1
        
        # Scan remaining tokens
        while pos < len(self.tokens):
            token = self.tokens[pos]
            
            if token in self.commands:
                command = self.commands[token]
                pos = command.execute(self.tokens, pos + 1, result)
            else:
                return None  # Error: unknown token
        
        return result


# Pre-built command sets for common patterns

def create_type_commands() -> Dict[str, Command]:
    """Create command set for type expression parsing."""
    return {
        'for': SetFieldCommand('parameter_name'),
        'is': SetFieldCommand('base_type'),
        'extends': AppendToListCommand('constraints'),
    }


def create_pipeline_commands() -> Dict[str, Command]:
    """Create command set for pipeline parsing (from original then_macro)."""
    return {
        'do': SetFieldCommand('operation'),
        'get': SetFieldCommand('operation'),  # alias for do
        'set': SetFieldCommand('operation'),  # alias for do
        'chain': ConsumeRestCommand('chain_steps'),
        'as': SetFieldCommand('bind_name'),
        'into': SetFieldCommand('assign_name'),
        'the': SetFieldCommand('source_variable'),
        'from': SetFieldCommand('source_variable'),
        'in': SetFieldCommand('source_variable'),
    }