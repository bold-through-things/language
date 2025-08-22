#!/usr/bin/env python3
"""
Character-by-character TypeScript tokenizer.

Handles comments, strings, and produces a clean token stream for parsing.
"""

from dataclasses import dataclass
from enum import Enum
from typing import List, Optional, Iterator


class TokenType(Enum):
    IDENTIFIER = "identifier"
    KEYWORD = "keyword" 
    STRING = "string"
    NUMBER = "number"
    SYMBOL = "symbol"
    WHITESPACE = "whitespace"
    EOF = "eof"


@dataclass
class Token:
    type: TokenType
    value: str
    line: int
    column: int


class TypeScriptTokenizer:
    """Character-by-character TypeScript tokenizer that handles comments and strings properly."""
    
    def __init__(self, text: str):
        self.text = text
        self.pos = 0
        self.line = 1
        self.column = 1
        self.tokens: List[Token] = []
        
    def current_char(self) -> Optional[str]:
        if self.pos >= len(self.text):
            return None
        return self.text[self.pos]
    
    def peek_char(self, offset: int = 1) -> Optional[str]:
        peek_pos = self.pos + offset
        if peek_pos >= len(self.text):
            return None
        return self.text[peek_pos]
    
    def advance(self) -> None:
        if self.pos < len(self.text) and self.text[self.pos] == '\n':
            self.line += 1
            self.column = 1
        else:
            self.column += 1
        self.pos += 1
    
    def skip_whitespace(self) -> None:
        """Skip whitespace but track position."""
        start_line, start_col = self.line, self.column
        whitespace = ""
        
        while self.current_char() and self.current_char().isspace():
            whitespace += self.current_char()
            self.advance()
        
        if whitespace:
            self.tokens.append(Token(TokenType.WHITESPACE, whitespace, start_line, start_col))
    
    def skip_line_comment(self) -> None:
        """Skip // style comments."""
        self.advance()  # skip first /
        self.advance()  # skip second /
        
        while self.current_char() and self.current_char() != '\n':
            self.advance()
    
    def skip_block_comment(self) -> None:
        """Skip /* */ style comments."""
        self.advance()  # skip /
        self.advance()  # skip *
        
        while self.current_char():
            if self.current_char() == '*' and self.peek_char() == '/':
                self.advance()  # skip *
                self.advance()  # skip /
                break
            self.advance()
    
    def read_string(self, quote_char: str) -> str:
        """Read a string literal, handling escapes."""
        result = quote_char
        self.advance()  # skip opening quote
        
        while self.current_char() and self.current_char() != quote_char:
            if self.current_char() == '\\':
                result += self.current_char()
                self.advance()
                if self.current_char():
                    result += self.current_char()
                    self.advance()
            else:
                result += self.current_char()
                self.advance()
        
        if self.current_char() == quote_char:
            result += self.current_char()
            self.advance()  # skip closing quote
        
        return result
    
    def read_identifier(self) -> str:
        """Read an identifier or keyword."""
        result = ""
        while (self.current_char() and 
               (self.current_char().isalnum() or self.current_char() in '_$')):
            result += self.current_char()
            self.advance()
        return result
    
    def read_number(self) -> str:
        """Read a number literal."""
        result = ""
        while (self.current_char() and 
               (self.current_char().isdigit() or self.current_char() in '.')):
            result += self.current_char()
            self.advance()
        return result
    
    def tokenize(self) -> List[Token]:
        """Tokenize the input, filtering out comments."""
        keywords = {
            'interface', 'type', 'declare', 'var', 'function', 'class',
            'extends', 'implements', 'export', 'import', 'const', 'let',
            'readonly', 'public', 'private', 'protected', 'static', 'abstract',
            'new', 'this', 'void', 'undefined', 'null', 'any', 'unknown',
            'string', 'number', 'boolean', 'bigint', 'symbol', 'object',
            'get', 'set', 'async', 'from'
        }
        
        while self.current_char():
            start_line, start_col = self.line, self.column
            char = self.current_char()
            
            # Skip comments first (highest precedence)
            if char == '/' and self.peek_char() == '/':
                self.skip_line_comment()
                continue
            elif char == '/' and self.peek_char() == '*':
                self.skip_block_comment()
                continue
            
            # Handle whitespace
            elif char.isspace():
                self.skip_whitespace()
                continue
            
            # Handle string literals
            elif char in ['"', "'", '`']:
                string_val = self.read_string(char)
                self.tokens.append(Token(TokenType.STRING, string_val, start_line, start_col))
            
            # Handle numbers
            elif char.isdigit():
                number_val = self.read_number()
                self.tokens.append(Token(TokenType.NUMBER, number_val, start_line, start_col))
            
            # Handle identifiers and keywords
            elif char.isalpha() or char == '_' or char == '$':
                identifier_val = self.read_identifier()
                token_type = TokenType.KEYWORD if identifier_val in keywords else TokenType.IDENTIFIER
                self.tokens.append(Token(token_type, identifier_val, start_line, start_col))
            
            # Handle multi-character symbols first
            elif char == '=' and self.peek_char() == '>':
                self.tokens.append(Token(TokenType.SYMBOL, '=>', start_line, start_col))
                self.advance()  # consume =
                self.advance()  # consume >
            elif char == '.' and self.peek_char() == '.' and self.peek_char(2) == '.':
                self.tokens.append(Token(TokenType.SYMBOL, '...', start_line, start_col))
                self.advance()  # consume first .
                self.advance()  # consume second .
                self.advance()  # consume third .
            
            # Handle other symbols
            else:
                self.tokens.append(Token(TokenType.SYMBOL, char, start_line, start_col))
                self.advance()
        
        # Add EOF token
        self.tokens.append(Token(TokenType.EOF, "", self.line, self.column))
        return self.tokens
    
    def tokens_without_whitespace(self) -> List[Token]:
        """Get tokens with whitespace filtered out."""
        return [token for token in self.tokens if token.type != TokenType.WHITESPACE]


def tokenize_typescript(text: str) -> List[Token]:
    """Convenience function to tokenize TypeScript text."""
    tokenizer = TypeScriptTokenizer(text)
    return tokenizer.tokenize()