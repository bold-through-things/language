
class Node:
    def __init__(self, content: str) -> None:
        self.content = content
        self.children: list[Node] = []

    def __repr__(self):
        return self.indented_repr()
        
    def indented_repr(self, indent=""):
        next_indent = "\t"+indent
        return f"{indent}`{self.content}`:\n{"\n".join([node.indented_repr(next_indent) for node in self.children])}"