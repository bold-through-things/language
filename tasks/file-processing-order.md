# File Processing Order

## Priority
**MEDIUM** - Needed for multi-file projects

## Problem
Multi-file compilation order is undefined:
- Technically supports multiple source files
- Order is unclear and unpredictable
- Classes and functions work due to recent type discovery changes

## Solution
Implement deterministic alphabetical file processing order:
- Simple, predictable, and blatantly a hack
- Works well with forward-reference capability
- Avoids complex dependency analysis

## Technical Details
- Sort source files alphabetically before compilation
- Leverage existing type discovery for forward references
- Minimal implementation complexity

## Future Considerations
- Visibility system for namespace management
- Advisory visibility labels (private, please_dont_use_this, etc.)
- Client code can still access "private" APIs if needed

## Impact
- Enables reliable multi-file projects
- Predictable compilation behavior
- Foundation for larger codebases