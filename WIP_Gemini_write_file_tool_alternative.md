# WIP: Alternative to `write_file` tool

This document summarizes the brainstorming session for creating a better file editing tool.

## Goal
To create a more robust and efficient file editing tool to be used from the CLI, replacing the need for cumbersome `write_file` or `replace` tool calls for every small change.

## Initial Proposal: `edit_file.py`

The initial idea was to create a Python script (`edit_file.py`) with the following features:

*   **Operations:** `insert`, `delete`, `replace`.
*   **Targeting:** Operations should support both line numbers and regular expressions.
*   **Regex Replace:** The `replace` operation should support capture group substitution.
*   **Concurrency Control:** A locking mechanism to prevent overwriting changes. The tool would require a hash of the file's modification time to be passed with any edit command.

## Challenge: Passing Multi-line Content

We encountered a challenge in how to pass multi-line strings to this new tool via the shell.

*   An attempt to use a `heredoc` within the `run_shell_command` tool failed because newlines were not preserved.
*   An alternative using `echo -e` was proposed but not pursued.

## New Direction: Model Context Protocol (MCP)

To address the issue of multiple tool calls for sequential operations (and the associated request quota), the user proposed investigating a "Model Context Protocol" (MCP).

*   **Goal:** Batch multiple operations into a single request.
*   **Research:** A web search for "Model Context Protocol Gemini CLI" did not yield any relevant public documentation, suggesting it might be a private or conceptual term.

## MCP Implementation Proposal (from Gemini)

Based on the goal of batching commands, I proposed the following implementation:

1.  Generate a Python script (`mcp_runner.py`) on the fly.
2.  This script would read a series of commands from a JSON file (`mcp_commands.json`).
3.  Commands would include actions like `read`, `write`, `shell`.
4.  The runner script and the commands file would be created and executed within a single `run_shell_command` call.

## Current Status

The user indicated that this MCP proposal was not quite right and that they need to think about the design in more detail. This document serves as a snapshot of our conversation to be resumed later.
