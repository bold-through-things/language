def cut(line:str, sep:str):
    index = line.find(sep)
    if index == -1:
        return line, ""
    return line[:index], line[index+len(sep):]
    
def extract_indent(line: str) -> tuple[str, int]:
    indent = 0
    while line.startswith('\t'):
        indent += 1
        line = line[1:]
    return line, indent