import sys

print("67LANG LSP Server - running on Python", sys.version)
print("Python executable:", sys.executable)
print("Python path:", sys.path)

from pygls.server import LanguageServer
from lsprotocol.types import Diagnostic, DiagnosticSeverity, Position, Range
from pygls.protocol import LanguageServerProtocol
from lsprotocol.types import DidOpenTextDocumentParams, DidChangeTextDocumentParams

class Lang67(LanguageServer):
    def __init__(self, **kwargs):
        super().__init__("67lang", "0.1", **kwargs)
    def report_server_error(self, error: Exception, source):
        print("error", error, source)
        pass

ls = Lang67()

def find_debug_words(text):
    """Find all occurrences of the word 'debug' and return their positions."""
    diagnostics = []
    for line_idx, line in enumerate(text.splitlines()):
        start_idx = 0
        while (start_idx := line.find("debug", start_idx)) != -1:
            start = Position(line=line_idx, character=start_idx)
            end = Position(line=line_idx, character=start_idx + len("debug"))
            range_ = Range(start=start, end=end)
            diagnostics.append(
                Diagnostic(
                    range=range_,
                    message="'debug' is not allowed.",
                    severity=DiagnosticSeverity.Error
                )
            )
            start_idx += len("debug")
    return diagnostics

@ls.feature("textDocument/didOpen")
@ls.feature("textDocument/didChange")
def validate_text(ls: LanguageServer, params: DidOpenTextDocumentParams | DidChangeTextDocumentParams):
    """Validate the text for 'debug' occurrences."""
    print("validate_text", params)
    document = ls.workspace.get_document(params.text_document.uri)
    diagnostics = find_debug_words(document.source)
    ls.publish_diagnostics(params.text_document.uri, diagnostics)

if __name__ == "__main__":
    ls.start_tcp("127.0.0.1", 64529)