"""Then pipeline macro for handling pipeline syntax."""

from dataclasses import replace
from core.macro_registry import MacroContext, Macro_preprocess_provider
from core.node import Args, Position
from pipeline.steps import PreprocessingStep
from pipeline.local_lookup import Upwalker, LastThenSearchStrategy
from utils.common_utils import get_single_arg


class ThenCommand:
    """Base class for then command words"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        """Execute this command, modify result as needed, return new position"""
        raise NotImplementedError


class DoCommand(ThenCommand):
    """Handle 'do <method>' - single method call"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        if pos >= len(tokens):
            return pos  # Error: no method name
        
        method_name = tokens[pos]
        result['operation_command'] = 'do'
        result['operation_args'] = [method_name]
        return pos + 1


class ChainCommand(ThenCommand):
    """Handle 'chain <step1> <step2> ...' - method chaining via nesting"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        # Chain consumes ALL remaining tokens
        steps = tokens[pos:]
        result['operation_command'] = 'chain'
        result['operation_args'] = steps
        return len(tokens)


class AsCommand(ThenCommand):
    """Handle 'as <name>' - set bind name"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        if pos >= len(tokens):
            return pos  # Error: no name
        
        name = tokens[pos]
        result['bind_name'] = name
        return pos + 1


class IntoCommand(ThenCommand):
    """Handle 'into <name>' - set assign name"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        if pos >= len(tokens):
            return pos  # Error: no name
        
        name = tokens[pos]
        result['assign_name'] = name
        return pos + 1


class SourceCommand(ThenCommand):
    """Handle 'the <name>', 'from <name>', 'in <name>' - set source variable"""
    def execute(self, tokens: list[str], pos: int, result: dict) -> int:
        if pos >= len(tokens):
            return pos  # Error: no name
        
        name = tokens[pos]
        result['source_variable'] = name
        return pos + 1


# Command registry - get and set are aliases for do, the/from/in are aliases for source
THEN_COMMANDS = {
    'do': DoCommand(),
    'get': DoCommand(),  # alias
    'set': DoCommand(),  # alias
    'chain': ChainCommand(),
    'as': AsCommand(),
    'into': IntoCommand(),
    'the': SourceCommand(),
    'from': SourceCommand(),
    'in': SourceCommand(),
}


class ThenCommandParser:
    """Parser for then pipeline command syntax with flexible order"""
    
    def __init__(self, args: str):
        self.tokens = args.split()
    
    def parse(self):
        """Parse then command into structured components"""
        result = {
            'bind_name': None,
            'assign_name': None,
            'operation_command': None,
            'operation_args': [],
            'source_variable': None
        }
        
        pos = 0
        
        # Scan tokens in flexible order
        while pos < len(self.tokens):
            token = self.tokens[pos]
            
            if token in THEN_COMMANDS:
                command = THEN_COMMANDS[token]
                pos = command.execute(self.tokens, pos + 1, result)
            else:
                return None  # Error: unknown token
        
        return result


def create_operation_call_node(ctx: MacroContext, operation_command: str, operation_args: list[str], 
                              children: list, source_value_name: str):
    """Create the appropriate call node based on operation command and args"""
    p0 = Position(0, 0)
    
    if operation_command == 'do':
        if len(operation_args) != 1:
            ctx.compiler.assert_(False, ctx.node, "do requires exactly one method name")
            return None
        
        operation_children = []
        # Add source value as first argument if we have one
        if source_value_name is not None:
            operation_children.append(ctx.compiler.make_node(f"67lang:call {source_value_name}", ctx.node.pos or p0, []))
        # Add any additional children
        operation_children.extend(children)
        
        return ctx.compiler.make_node(f"67lang:call {operation_args[0]}", ctx.node.pos or p0, operation_children)
    
    elif operation_command == 'chain':
        if len(operation_args) == 0:
            ctx.compiler.assert_(False, ctx.node, "chain requires at least one step")
            return None
        
        # Build the chain by nesting calls
        if source_value_name is not None:
            current_value = ctx.compiler.make_node(f"67lang:call {source_value_name}", ctx.node.pos or p0, [])
        else:
            ctx.compiler.assert_(False, ctx.node, "chain requires a source value")
            return None
        
        for i, step in enumerate(operation_args):
            step_children = [current_value]
            # Only the last step gets the children (arguments)
            if i == len(operation_args) - 1:
                step_children.extend(children)
            
            current_value = ctx.compiler.make_node(f"67lang:call {step}", ctx.node.pos or p0, step_children)
        
        return current_value
    
    else:
        ctx.compiler.assert_(False, ctx.node, f"unknown operation command: {operation_command}")
        return None


class Pipeline_macro_provider(Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        """
        Handle pipeline syntax for both starting and continuation.
        
        Starting: `do func the var`, `get var`, `do func`
        Continuation: `then do func`, `then get field`
        If-then: `then` with no inline args (just children) - existing behavior
        """
        args = ctx.compiler.get_metadata(ctx.node, Args)
        content = ctx.node.content
        
        # Check if this is a continuation (starts with "then")
        is_continuation = content.startswith("then")
        
        if is_continuation:
            # Remove "then" prefix and parse the rest
            if not args.strip():
                # This is if-then - let the existing if macro handle it
                return
            parse_content = args
        else:
            # This is a starting point
            parse_content = content
        
        parent = ctx.node.parent
        assert parent is not None
        
        # Parse the command
        parser = ThenCommandParser(parse_content)
        parsed = parser.parse()
        
        if parsed is None:
            ctx.compiler.assert_(False, ctx.node, "pipeline requires a valid command")
            return
            
        # Must have an operation command
        if not parsed['operation_command']:
            ctx.compiler.assert_(False, ctx.node, "pipeline requires an operation (do, get, set, or chain)")
            return
            
        p0 = Position(0, 0)
        
        # Determine the source value to pipe
        source_value_name = None
        
        if is_continuation:
            # Find the most recent 67lang:last_then local using upwalker
            upwalker = Upwalker(LastThenSearchStrategy())
            last_then_result = upwalker.find(ctx)
            
            if last_then_result is None:
                ctx.compiler.assert_(False, ctx.node, "then used but no previous expression to pipe from")
                return
                
            # Get the identifier of the last_then_local
            source_value_name = get_single_arg(replace(ctx, node=last_then_result.node))
            
            # Remove the 67lang:last_then marker from the previous local (if not into)
            if not parsed['assign_name']:
                if (len(last_then_result.node.children) > 0 and 
                    last_then_result.node.children[0].content == "67lang:last_then"):
                    last_then_result.node.replace_child(last_then_result.node.children[0], None)
        else:
            # Use source variable from command parsing (set by the/from/in commands)
            source_value_name = parsed['source_variable']
        
        # Create the operation call
        call_node = create_operation_call_node(ctx, parsed['operation_command'], parsed['operation_args'], 
                                             ctx.node.children, source_value_name)
        
        if call_node is None:
            return  # Error already reported
        
        # Determine what kind of node to create
        if parsed['assign_name']:
            # into <name> - assign to existing local using setter call
            new_node = ctx.compiler.make_node(f"67lang:call {parsed['assign_name']}", ctx.node.pos or p0, [call_node])
        elif parsed['bind_name']:
            # as <name> - bind with 67lang:last_then marker
            new_node = ctx.compiler.make_node(f"local {parsed['bind_name']}", ctx.node.pos or p0, [
                ctx.compiler.make_node("67lang:last_then", ctx.node.pos or p0, []),
                call_node
            ])
        else:
            # anonymous - generate name with 67lang:last_then marker
            result_name = ctx.compiler.get_new_ident("pipeline_result")
            new_node = ctx.compiler.make_node(f"local {result_name}", ctx.node.pos or p0, [
                ctx.compiler.make_node("67lang:last_then", ctx.node.pos or p0, []),
                call_node
            ])
        
        # Replace the node with the new node
        parent.replace_child(ctx.node, [new_node])
        
        # Process the new node
        if isinstance(ctx.current_step, PreprocessingStep):
            ctx.current_step.process_node(replace(ctx, node=new_node))


# Keep old name for backward compatibility
Then_macro_provider = Pipeline_macro_provider