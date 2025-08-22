#!/usr/bin/env python3
"""
TypeScript parser with preprocessed bracket tree structure.

This parser preprocesses all brackets into a tree structure before parsing,
eliminating bracket-related issues by design.
"""

from dataclasses import dataclass
from typing import List, Optional, Union, Any
from typescript_tokenizer import Token, TokenType, tokenize_typescript


@dataclass
class BracketNode:
    """A node in the bracket tree."""
    opener: Optional[Token]  # None for root
    closer: Optional[Token]  # None if not yet closed
    tokens: List[Union[Token, 'BracketNode']]  # Mix of tokens and nested brackets
    
    def is_complete(self) -> bool:
        """Check if this bracket node has been closed."""
        return self.closer is not None
    
    def flatten(self) -> str:
        """Flatten this node back to a string for type annotations."""
        result = []
        if self.opener:
            result.append(self.opener.value)
        for item in self.tokens:
            if isinstance(item, Token):
                result.append(item.value)
            else:
                result.append(item.flatten())
        if self.closer:
            result.append(self.closer.value)
        return "".join(result)


def preprocess_brackets(tokens: List[Token]) -> BracketNode:
    """
    Preprocess tokens into a bracket tree structure.
    
    CRASH HARD: Any bracket mismatch is a fatal error.
    """
    root = BracketNode(opener=None, closer=None, tokens=[])
    stack = [root]
    bracket_pairs = {"(": ")", "{": "}", "[": "]", "<": ">"}
    reverse_pairs = {v: k for k, v in bracket_pairs.items()}
    
    for token in tokens:
        if token.type == TokenType.EOF:
            # EOF is special - add to root but don't process further
            root.tokens.append(token)
            break
            
        current = stack[-1]
        
        if token.type == TokenType.SYMBOL and token.value in bracket_pairs:
            # Opening bracket - create new node
            new_node = BracketNode(opener=token, closer=None, tokens=[])
            current.tokens.append(new_node)
            stack.append(new_node)
            
        elif token.type == TokenType.SYMBOL and token.value in reverse_pairs:
            # Closing bracket - must match current node
            if len(stack) == 1:
                # CRASH HARD: Closing bracket with no opener
                raise RuntimeError(f"Unmatched closing bracket '{token.value}' at line {token.line}, column {token.column}")
            
            expected_opener = reverse_pairs[token.value]
            if current.opener.value != expected_opener:
                # CRASH HARD: Mismatched brackets
                raise RuntimeError(
                    f"Bracket mismatch: opened with '{current.opener.value}' at line {current.opener.line}, "
                    f"but closing with '{token.value}' at line {token.line}, column {token.column}"
                )
            
            current.closer = token
            stack.pop()
            
        else:
            # Regular token
            current.tokens.append(token)
    
    # CRASH HARD: Unclosed brackets
    if len(stack) > 1:
        unclosed = stack[-1]
        raise RuntimeError(
            f"Unclosed bracket '{unclosed.opener.value}' opened at line {unclosed.opener.line}, "
            f"column {unclosed.opener.column}"
        )
    
    return root


@dataclass
class TSParameter:
    name: str
    type: str
    optional: bool = False


@dataclass
class TSFunction:
    name: str
    parameters: List[TSParameter]
    return_type: str


@dataclass
class TSProperty:
    name: str
    property_type: str
    settable: bool = True
    optional: bool = False


@dataclass
class TSInterface:
    name: str
    extends: List[str]
    members: List[Any]


@dataclass
class TSTypeAlias:
    name: str
    target: str = ""
    members: List[str] = None


@dataclass
class TSDeclare:
    declaration_type: str
    name: str
    type_annotation: str = ""

@dataclass 
class TSConstructor:
    name: str
    parameters: List[TSParameter]
    return_type: str


class TypeScriptParser:
    """Parser that operates on a preprocessed bracket tree."""
    
    def __init__(self, tree: BracketNode, filename: str = "unknown"):
        self.tree = tree
        self.filename = filename
        self.pos = 0
        self.items = tree.tokens  # Current level items (mix of tokens and bracket nodes)
    
    def current_item(self) -> Optional[Union[Token, BracketNode]]:
        """Get current item (token or bracket node)."""
        if self.pos >= len(self.items):
            return None
        return self.items[self.pos]
    
    def current_token(self) -> Optional[Token]:
        """Get current token, or None if current item is a bracket node."""
        item = self.current_item()
        if isinstance(item, Token):
            return item
        return None
    
    def peek_item(self, offset: int = 1) -> Optional[Union[Token, BracketNode]]:
        """Peek ahead at an item."""
        peek_pos = self.pos + offset
        if peek_pos >= len(self.items):
            return None
        return self.items[peek_pos]
    
    def peek_token(self, offset: int = 1) -> Optional[Token]:
        """Peek ahead at a token."""
        item = self.peek_item(offset)
        if isinstance(item, Token):
            return item
        return None
    
    def advance(self) -> None:
        """Advance position."""
        self.pos += 1
    
    def match_token(self, token_type: TokenType, value: str = None) -> bool:
        """Check if current item is a token matching the criteria."""
        token = self.current_token()
        if not token or token.type != token_type:
            return False
        if value and token.value != value:
            return False
        return True
    
    def expect_token(self, token_type: TokenType, value: str = None) -> Token:
        """Expect a specific token. CRASH HARD if not found."""
        token = self.current_token()
        if not token:
            # CRASH HARD: Expected token but got bracket or EOF
            item = self.current_item()
            if isinstance(item, BracketNode):
                raise RuntimeError(
                    f"Expected {token_type} token, got bracket '{item.opener.value}' "
                    f"at line {item.opener.line} in {self.filename}"
                )
            else:
                raise RuntimeError(f"Expected {token_type} token, got EOF in {self.filename}")
        
        if token.type != token_type:
            # CRASH HARD: Wrong token type
            raise RuntimeError(
                f"Expected {token_type}, got {token.type} '{token.value}' "
                f"at line {token.line}, column {token.column} in {self.filename}"
            )
        
        if value and token.value != value:
            # CRASH HARD: Wrong token value
            raise RuntimeError(
                f"Expected '{value}', got '{token.value}' "
                f"at line {token.line}, column {token.column} in {self.filename}"
            )
        
        self.advance()
        return token
    
    def expect_bracket(self, bracket_type: str) -> BracketNode:
        """Expect a specific bracket. CRASH HARD if not found."""
        item = self.current_item()
        if not isinstance(item, BracketNode):
            # CRASH HARD: Expected bracket but got token or EOF
            if isinstance(item, Token):
                raise RuntimeError(
                    f"Expected '{bracket_type}' bracket, got token '{item.value}' "
                    f"at line {item.line}, column {item.column} in {self.filename}"
                )
            else:
                raise RuntimeError(f"Expected '{bracket_type}' bracket, got EOF in {self.filename}")
        
        if item.opener.value != bracket_type:
            # CRASH HARD: Wrong bracket type
            raise RuntimeError(
                f"Expected '{bracket_type}' bracket, got '{item.opener.value}' "
                f"at line {item.opener.line} in {self.filename}"
            )
        
        bracket = item
        self.advance()
        return bracket
    
    def consume_bracket_node(self, expected_opener: str = None) -> BracketNode:
        """Consume a bracket node. CRASH HARD if not a bracket or wrong type."""
        item = self.current_item()
        if not isinstance(item, BracketNode):
            # CRASH HARD: Expected bracket node
            if isinstance(item, Token):
                raise RuntimeError(
                    f"Expected bracket node, got token '{item.value}' "
                    f"at line {item.line}, column {item.column} in {self.filename}"
                )
            else:
                raise RuntimeError(f"Expected bracket node, got None in {self.filename}")
        
        if expected_opener and item.opener.value != expected_opener:
            # CRASH HARD: Wrong bracket type
            raise RuntimeError(
                f"Expected '{expected_opener}' bracket, got '{item.opener.value}' "
                f"at line {item.opener.line}, column {item.opener.column} in {self.filename}"
            )
        
        self.advance()
        return item
    
    def parse_interface(self) -> Optional[TSInterface]:
        """Parse an interface declaration."""
        # Must start with 'interface' keyword
        if not self.match_token(TokenType.KEYWORD, "interface"):
            return None
        
        self.advance()  # consume 'interface'
        
        # Get interface name
        interface_name = self.expect_token(TokenType.IDENTIFIER).value
        
        # Skip generic type parameters if present
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "<":
                self.advance()  # consume the angle bracket node
        
        # Handle optional 'extends' clause
        parent_interfaces = []
        if self.match_token(TokenType.KEYWORD, "extends"):
            self.advance()  # consume 'extends'
            
            # Parse comma-separated parent interfaces
            while True:
                parent_interfaces.append(self.expect_token(TokenType.IDENTIFIER).value)
                
                # Skip generic type parameters if present
                if isinstance(self.current_item(), BracketNode):
                    item = self.current_item()
                    if item.opener.value == "<":
                        self.advance()  # consume the angle bracket node
                
                # Check for more parent interfaces
                if not self.match_token(TokenType.SYMBOL, ","):
                    break
                self.advance()  # consume ','
        
        # Expect opening brace - it MUST be a bracket node
        brace_node = self.consume_bracket_node("{")
        
        # Parse members inside the brace node
        members = []
        member_parser = TypeScriptParser(brace_node, self.filename)
        
        while member_parser.current_item():
            token = member_parser.current_token()
            if token and token.type == TokenType.EOF:
                break
            
            # Try to parse a member
            member = member_parser.parse_interface_member()
            if member:
                members.append(member)
            else:
                # CRASH HARD: Unparseable interface member
                item = member_parser.current_item()
                if isinstance(item, Token):
                    raise RuntimeError(
                        f"Cannot parse interface member starting with '{item.value}' "
                        f"at line {item.line}, column {item.column} in {self.filename}"
                    )
                else:
                    raise RuntimeError(
                        f"Cannot parse interface member starting with bracket '{item.opener.value}' "
                        f"at line {item.opener.line} in {self.filename}"
                    )
        
        # Consume optional semicolon after closing brace
        if self.match_token(TokenType.SYMBOL, ";"):
            self.advance()
        
        return TSInterface(
            name=interface_name,
            extends=parent_interfaces,
            members=members
        )
    
    def parse_interface_member(self) -> Optional[Any]:
        """Parse an interface member (property, method, index signature, call signature)."""
        
        # Skip 'readonly' if present
        is_readonly = False
        if self.match_token(TokenType.KEYWORD, "readonly"):
            is_readonly = True
            self.advance()
        
        # Check for getter/setter
        is_getter = False
        is_setter = False
        if self.match_token(TokenType.KEYWORD, "get"):
            next_item = self.peek_item()
            if isinstance(next_item, Token) and next_item.type == TokenType.IDENTIFIER:
                is_getter = True
                self.advance()
        elif self.match_token(TokenType.KEYWORD, "set"):
            next_item = self.peek_item()
            if isinstance(next_item, Token) and next_item.type == TokenType.IDENTIFIER:
                is_setter = True
                self.advance()
        
        # Handle computed property names [Symbol.iterator] or index signatures [key: type]: value
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "[":
                bracket_node = item
                self.advance()  # consume bracket node
                
                # Check what comes after the bracket to distinguish computed names vs index signatures
                next_item = self.current_item()
                
                if isinstance(next_item, BracketNode) and next_item.opener.value == "(":
                    # This is a computed property method like [Symbol.asyncIterator]()
                    self.advance()  # consume parentheses
                    
                    # Expect colon and return type
                    if not self.match_token(TokenType.SYMBOL, ":"):
                        # CRASH HARD: Method without return type
                        token = self.current_token()
                        if token:
                            raise RuntimeError(
                                f"Expected ':' after method parameters, got '{token.value}' "
                                f"at line {token.line}, column {token.column} in {self.filename}"
                            )
                        else:
                            raise RuntimeError(
                                f"Expected ':' after method parameters, got bracket or EOF in {self.filename}"
                            )
                    self.advance()  # consume ':'
                    
                    return_type = self.collect_type_until_semicolon()
                    
                    # Consume semicolon if present
                    if self.match_token(TokenType.SYMBOL, ";"):
                        self.advance()
                    
                    return TSFunction(
                        name=bracket_node.flatten(),
                        parameters=[],
                        return_type=return_type
                    )
                
                elif isinstance(next_item, Token) and next_item.value == ":":
                    # This is an index signature [key: type]: value
                    self.advance()  # consume ':'
                    
                    # Collect value type
                    value_type = self.collect_type_until_semicolon()
                    
                    # Consume semicolon if present
                    if self.match_token(TokenType.SYMBOL, ";"):
                        self.advance()
                    
                    return TSProperty(
                        name=bracket_node.flatten(),
                        property_type=value_type,
                        settable=not is_readonly,
                        optional=False
                    )
                
                else:
                    # CRASH HARD: Bracket not followed by expected tokens
                    if isinstance(next_item, Token):
                        raise RuntimeError(
                            f"Unexpected token '{next_item.value}' after computed property name "
                            f"at line {next_item.line}, column {next_item.column} in {self.filename}"
                        )
                    elif isinstance(next_item, BracketNode):
                        raise RuntimeError(
                            f"Unexpected bracket '{next_item.opener.value}' after computed property name "
                            f"at line {next_item.opener.line} in {self.filename}"
                        )
                    else:
                        raise RuntimeError(
                            f"Unexpected EOF after computed property name in {self.filename}"
                        )
        
        # Handle call signatures with or without generics: (params): return or <T>(params): return
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "(" or item.opener.value == "<":
                # This is a call signature, possibly with generics
                
                # If it starts with <, consume the generic bracket and expect parentheses next
                if item.opener.value == "<":
                    self.advance()  # consume angle brackets
                    
                    # Now expect parentheses
                    if not isinstance(self.current_item(), BracketNode) or self.current_item().opener.value != "(":
                        # CRASH HARD: Generics not followed by parentheses
                        next_item = self.current_item()
                        if isinstance(next_item, Token):
                            raise RuntimeError(
                                f"Expected '(' after generic parameters, got '{next_item.value}' "
                                f"at line {next_item.line}, column {next_item.column} in {self.filename}"
                            )
                        elif isinstance(next_item, BracketNode):
                            raise RuntimeError(
                                f"Expected '(' after generic parameters, got '{next_item.opener.value}' "
                                f"at line {next_item.opener.line} in {self.filename}"
                            )
                        else:
                            raise RuntimeError(
                                f"Expected '(' after generic parameters, got EOF in {self.filename}"
                            )
                
                # Consume parentheses
                self.advance()  # consume parentheses
                
                # Expect colon and return type
                return_type = "void"
                if self.match_token(TokenType.SYMBOL, ":"):
                    self.advance()
                    return_type = self.collect_type_until_semicolon()
                
                # Consume semicolon if present
                if self.match_token(TokenType.SYMBOL, ";"):
                    self.advance()
                
                return TSFunction(
                    name="__call__",
                    parameters=[],
                    return_type=return_type
                )
        
        # Get member name
        member_name = None
        if self.match_token(TokenType.IDENTIFIER) or self.match_token(TokenType.KEYWORD) or self.match_token(TokenType.STRING) or self.match_token(TokenType.NUMBER):
            member_name = self.current_token().value
            if self.current_token().type == TokenType.STRING:
                member_name = member_name.strip('"\'')
            self.advance()
        else:
            return None
        
        # Skip generic type parameters if present
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "<":
                self.advance()
        
        # Check for optional marker
        optional = False
        if self.match_token(TokenType.SYMBOL, "?"):
            optional = True
            self.advance()
        
        # Check if this is a method (has parentheses)
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "(":
                # This is a method - parse parameters from the bracket node
                params_node = item
                self.advance()  # consume parentheses
                
                # Parse parameters inside the bracket node
                parameters = self.parse_parameters(params_node)
                
                # Parse return type
                return_type = "void"
                if self.match_token(TokenType.SYMBOL, ":"):
                    self.advance()
                    return_type = self.collect_type_until_semicolon()
                
                # Consume semicolon if present
                if self.match_token(TokenType.SYMBOL, ";"):
                    self.advance()
                
                return TSFunction(
                    name=member_name,
                    parameters=parameters,
                    return_type=return_type
                )
        
        # Regular property - expect colon
        if not self.match_token(TokenType.SYMBOL, ":"):
            # CRASH HARD: Property without type annotation
            token = self.current_token()
            if token:
                raise RuntimeError(
                    f"Expected ':' after property name '{member_name}', got '{token.value}' "
                    f"at line {token.line}, column {token.column} in {self.filename}"
                )
            else:
                raise RuntimeError(
                    f"Expected ':' after property name '{member_name}', got bracket or EOF in {self.filename}"
                )
        self.advance()
        
        # Parse type
        property_type = self.collect_type_until_semicolon()
        
        # Consume semicolon if present
        if self.match_token(TokenType.SYMBOL, ";"):
            self.advance()
        
        return TSProperty(
            name=member_name,
            property_type=property_type,
            settable=not is_readonly and not is_getter,
            optional=optional
        )
    
    def collect_type_until_semicolon(self) -> str:
        """Collect tokens as a type string until semicolon or end of current scope."""
        type_parts = []
        
        while self.current_item():
            if self.match_token(TokenType.SYMBOL, ";"):
                break
            if self.match_token(TokenType.EOF):
                break
            
            item = self.current_item()
            if isinstance(item, Token):
                # Don't collect closing braces at this level
                if item.value == "}":
                    break
                type_parts.append(item.value)
                self.advance()
            else:
                # Bracket node - add its flattened content
                type_parts.append(item.flatten())
                self.advance()
        
        return "".join(type_parts).strip()
    
    def parse_parameters(self, params_node: BracketNode) -> List[TSParameter]:
        """Parse parameters from a parentheses bracket node."""
        # Create a parser for the contents of the bracket node
        param_parser = TypeScriptParser(params_node, self.filename)
        parameters = []
        
        while param_parser.current_item():
            token = param_parser.current_token()
            if token and token.type == TokenType.EOF:
                break
            
            # Parse parameter: name[?]: type (handle identifiers, 'this' keyword, and rest parameters)
            param_name = None
            
            # Handle rest parameters like ...argArray or ...[value]
            if param_parser.match_token(TokenType.SYMBOL, "..."):
                param_parser.advance()  # consume ...
                # Now expect parameter name or destructured parameter
                if param_parser.match_token(TokenType.IDENTIFIER):
                    param_name = "..." + param_parser.current_token().value
                    param_parser.advance()
                elif isinstance(param_parser.current_item(), BracketNode):
                    # Destructured parameter like ...[value] - use bracket content as name
                    bracket_node = param_parser.current_item()
                    param_name = "..." + bracket_node.flatten()
                    param_parser.advance()
                else:
                    # CRASH HARD: Rest parameter without name
                    token = param_parser.current_token()
                    if token:
                        raise RuntimeError(
                            f"Expected parameter name after '...', got '{token.value}' "
                            f"at line {token.line}, column {token.column} in {self.filename}"
                        )
                    else:
                        raise RuntimeError(
                            f"Expected parameter name after '...', got bracket or EOF in {self.filename}"
                        )
            elif param_parser.match_token(TokenType.IDENTIFIER) or param_parser.match_token(TokenType.KEYWORD):
                param_name = param_parser.current_token().value
                param_parser.advance()
            else:
                # CRASH HARD: Parameter without name
                item = param_parser.current_item()
                if isinstance(item, Token):
                    raise RuntimeError(
                        f"Expected parameter name, got '{item.value}' "
                        f"at line {item.line}, column {item.column} in {self.filename}"
                    )
                else:
                    break  # No more parameters
            
            # Check for optional marker
            param_optional = False
            if param_parser.match_token(TokenType.SYMBOL, "?"):
                param_optional = True
                param_parser.advance()
            
            # Expect colon
            if not param_parser.match_token(TokenType.SYMBOL, ":"):
                # CRASH HARD: Parameter without type
                token = param_parser.current_token()
                if token:
                    raise RuntimeError(
                        f"Expected ':' after parameter '{param_name}', got '{token.value}' "
                        f"at line {token.line}, column {token.column} in {self.filename}"
                    )
                else:
                    raise RuntimeError(
                        f"Expected ':' after parameter '{param_name}', got bracket or EOF in {self.filename}"
                    )
            param_parser.advance()  # consume ':'
            
            # Collect parameter type until comma or end
            param_type_parts = []
            while param_parser.current_item():
                if param_parser.match_token(TokenType.SYMBOL, ","):
                    break
                if param_parser.match_token(TokenType.EOF):
                    break
                
                item = param_parser.current_item()
                if isinstance(item, Token):
                    param_type_parts.append(item.value)
                    param_parser.advance()
                else:
                    # Bracket node - add its flattened content
                    param_type_parts.append(item.flatten())
                    param_parser.advance()
            
            param_type = "".join(param_type_parts).strip()
            
            parameters.append(TSParameter(
                name=param_name,
                type=param_type,
                optional=param_optional
            ))
            
            # Consume comma if present
            if param_parser.match_token(TokenType.SYMBOL, ","):
                param_parser.advance()
        
        return parameters
    
    def parse_type_alias(self) -> Optional[TSTypeAlias]:
        """Parse a type alias."""
        if not self.match_token(TokenType.KEYWORD, "type"):
            return None
        
        self.advance()  # consume 'type'
        
        # Get type name
        type_name = self.expect_token(TokenType.IDENTIFIER).value
        
        # Skip generic type parameters if present
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "<":
                self.advance()
        
        # Expect equals sign
        self.expect_token(TokenType.SYMBOL, "=")
        
        # Collect type definition
        type_def = self.collect_type_until_semicolon()
        
        # Consume semicolon if present
        if self.match_token(TokenType.SYMBOL, ";"):
            self.advance()
        
        # Check if this is a union type
        if "|" in type_def:
            members = [member.strip().strip('"\'') for member in type_def.split("|")]
            return TSTypeAlias(
                name=type_name,
                target="",
                members=members
            )
        else:
            return TSTypeAlias(
                name=type_name,
                target=type_def,
                members=None
            )
    
    def parse_declare(self) -> Optional[Any]:
        """Parse a declare statement."""
        if not self.match_token(TokenType.KEYWORD, "declare"):
            return None
        
        self.advance()  # consume 'declare'
        
        # Skip optional modifiers
        while self.match_token(TokenType.KEYWORD, "abstract") or self.match_token(TokenType.KEYWORD, "async"):
            self.advance()
        
        # Get declaration type
        if not (self.match_token(TokenType.KEYWORD) or self.match_token(TokenType.IDENTIFIER)):
            # CRASH HARD: Invalid declare statement
            token = self.current_token()
            if token:
                raise RuntimeError(
                    f"Expected declaration type after 'declare', got '{token.value}' "
                    f"at line {token.line}, column {token.column} in {self.filename}"
                )
            else:
                raise RuntimeError(f"Expected declaration type after 'declare', got bracket or EOF in {self.filename}")
        
        declaration_type = self.current_token().value
        self.advance()
        
        # Handle 'declare var ConstructorName: { new(...): Type; ... }' 
        if declaration_type == "var":
            return self.parse_declare_var()
        
        # Get declared name (special case for 'global')
        if declaration_type == "global":
            # 'declare global' is followed by a block, not a name
            declared_name = "global"
        else:
            declared_name = self.expect_token(TokenType.IDENTIFIER).value
        
        # Collect type annotation
        type_annotation = self.collect_type_until_semicolon()
        
        # Consume semicolon if present
        if self.match_token(TokenType.SYMBOL, ";"):
            self.advance()
        
        return TSDeclare(
            declaration_type=declaration_type,
            name=declared_name,
            type_annotation=type_annotation
        )
    
    def parse_declare_var(self) -> Optional[Any]:
        """Parse 'declare var' statements - either constructors or simple type aliases."""
        # Get var name
        var_name = self.expect_token(TokenType.IDENTIFIER).value
        
        # Expect colon
        self.expect_token(TokenType.SYMBOL, ":")
        
        # Check if it's a brace block (constructor) or something else
        if isinstance(self.current_item(), BracketNode) and self.current_item().opener.value == "{":
            # Parse as constructor
            brace_node = self.expect_bracket("{")
            
            # Create a parser for the contents of the brace block
            brace_parser = TypeScriptParser(brace_node, self.filename)
            
            constructor_info = None
            
            while brace_parser.current_item():
                # Look for 'new' keyword
                if brace_parser.match_token(TokenType.KEYWORD, "new"):
                    brace_parser.advance()  # consume 'new'
                    
                    # Parse parameters if they exist
                    params = []
                    if isinstance(brace_parser.current_item(), BracketNode) and brace_parser.current_item().opener.value == "(":
                        params_node = brace_parser.current_item()
                        brace_parser.advance()  # consume parameter list
                        params = brace_parser.parse_parameters(params_node)
                    
                    # Expect colon
                    if brace_parser.match_token(TokenType.SYMBOL, ":"):
                        brace_parser.advance()
                        
                        # Get return type (var_name by default)
                        return_type = var_name
                        if brace_parser.match_token(TokenType.IDENTIFIER):
                            return_type = brace_parser.current_token().value
                            brace_parser.advance()
                        
                        constructor_info = TSConstructor(
                            name=var_name,
                            parameters=params,
                            return_type=return_type
                        )
                        break
                else:
                    brace_parser.advance()
            
            # Consume semicolon if present
            if self.match_token(TokenType.SYMBOL, ";"):
                self.advance()
            
            # Return constructor if found, or a placeholder TSDeclare to indicate we consumed the declaration
            if constructor_info:
                return constructor_info
            else:
                # We consumed a declare var but it wasn't a constructor - return a TSDeclare so we don't fail
                return TSDeclare(
                    declaration_type="var",
                    name=var_name,
                    type_annotation=brace_node.flatten()
                )
        else:
            # Not a brace block - collect type annotation until semicolon
            type_annotation = self.collect_type_until_semicolon()
            
            # Consume semicolon if present
            if self.match_token(TokenType.SYMBOL, ";"):
                self.advance()
            
            return TSDeclare(
                declaration_type="var",
                name=var_name,
                type_annotation=type_annotation
            )
    
    def parse_export(self) -> Optional[str]:
        """Parse and skip export statements."""
        if not self.match_token(TokenType.KEYWORD, "export"):
            return None
        
        self.advance()  # consume 'export'
        
        # If it's export {}, consume it
        if isinstance(self.current_item(), BracketNode):
            item = self.current_item()
            if item.opener.value == "{":
                self.advance()  # consume the brace node
                
                # Skip optional 'from' clause
                if self.match_token(TokenType.KEYWORD, "from"):
                    self.advance()
                    if self.match_token(TokenType.STRING):
                        self.advance()
                
                # Skip semicolon if present
                if self.match_token(TokenType.SYMBOL, ";"):
                    self.advance()
        
        return "export_statement"


def parse_typescript_content(content: str, filename: str = "unknown") -> List[Any]:
    """Parse TypeScript content and return list of parsed declarations."""
    tokens = tokenize_typescript(content)
    # Filter out whitespace tokens
    tokens = [token for token in tokens if token.type != TokenType.WHITESPACE]
    
    # Preprocess brackets into tree structure
    tree = preprocess_brackets(tokens)
    
    # Parse the tree
    parser = TypeScriptParser(tree, filename)
    declarations = []
    
    while parser.current_item():
        token = parser.current_token()
        if token and token.type == TokenType.EOF:
            break
        
        # Remember starting position
        start_pos = parser.pos
        
        # Try parsers in order
        result = None
        
        # Try export first
        result = parser.parse_export()
        if result:
            # Skip export statements
            continue
        
        # Reset position and try interface
        parser.pos = start_pos
        result = parser.parse_interface()
        if result:
            declarations.append(result)
            continue
        
        # Reset position and try type alias
        parser.pos = start_pos
        result = parser.parse_type_alias()
        if result:
            declarations.append(result)
            continue
        
        # Reset position and try declare
        parser.pos = start_pos
        result = parser.parse_declare()
        if result:
            declarations.append(result)
            continue
        
        # CRASH HARD: No parser matched
        item = parser.current_item()
        if isinstance(item, Token):
            raise RuntimeError(
                f"No parser matched token '{item.value}' at line {item.line}, "
                f"column {item.column} in {filename}"
            )
        else:
            raise RuntimeError(
                f"No parser matched bracket '{item.opener.value}' at line {item.opener.line} in {filename}"
            )
    
    return declarations