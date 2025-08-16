# Contextual Logging System

## Priority
**MEDIUM** - Developer experience improvement

## Problem
Current tag-based logging is too noisy:
- Single tag + few statements = thousands of logs for all nodes
- Need to target specific code areas (e.g., lines 42-47)
- Makes debugging existing tests tedious
- Alternative is extracting mini reproducibles, which is time-consuming

## Solution
Implement line-range based logging:
- "Log everything happening in lines X-Y of file Z"
- Context-aware filtering instead of just tags
- More surgical debugging approach

## Technical Details
- Extend logging system with line/file context matching
- Node position tracking integration
- Preserve existing tag system as fallback
- CLI interface for specifying ranges

## Benefits
- Dramatically reduces log noise
- Faster debugging of test failures
- No need to create minimal reproducibles
- Better developer experience