"""Utility functions for processing steps."""

from utils.strutil import cut


def unroll_parent_chain(n) -> list:
    """Walk up the parent chain and return all nodes"""
    from core.node import Node
    rv: list[Node] = []
    while n:
        rv.append(n)
        n = n.parent
    return rv


def seek_child_macro(n, macro: str):
    """Find a child node with a specific macro"""
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            return child
        

def seek_all_child_macros(n, macro: str):
    """Find all child nodes with a specific macro"""
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            yield child


TYPICAL_IGNORED_MACROS = {"type", "noscope"}

def filter_child_macros(n):
    """Filter out typical ignored macros from children"""
    def get_macro(n): 
        macro, _ = cut(n.content, " ")
        return macro
    return [c for c in n.children if get_macro(c) not in TYPICAL_IGNORED_MACROS]