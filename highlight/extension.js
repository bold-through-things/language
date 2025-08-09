const { window, TextEditorDecorationType, Position, Range, workspace, ConfigurationTarget, ThemeColor, commands, TextEdit, WorkspaceEdit } = require('vscode');

let gradientDecorationTypes = [];

// Helper function to convert hex color to rgba
function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    // Handle #RRGGBB format
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatDocument() {
    const editor = window.activeTextEditor;
    if (!editor) {
        return; // No active editor
    }

    const document = editor.document;
    if (document.languageId !== '67lang') {
        return; // Not a 67lang document
    }

    const edit = new WorkspaceEdit();
    const tabRegex = /^	+/;

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        if (line.text.trim() === '') {
            let intendedIndentationLevel = 0;
            // Look ahead for the next non-empty line to determine intended indentation
            for (let k = i + 1; k < document.lineCount; k++) {
                const nextLine = document.lineAt(k);
                if (nextLine.text.trim() !== '') {
                    const nextLineMatch = tabRegex.exec(nextLine.text);
                    if (nextLineMatch) {
                        intendedIndentationLevel = nextLineMatch[0].length;
                    }
                    break; // Found the next non-empty line, stop searching
                }
            }

            const currentIndentation = line.text.length - line.text.trimStart().length;
            if (currentIndentation < intendedIndentationLevel) {
                const newIndentation = '\t'.repeat(intendedIndentationLevel);
                const range = new Range(line.lineNumber, 0, line.lineNumber, line.text.length);
                edit.replace(document.uri, range, newIndentation);
            }
        }
    }

    workspace.applyEdit(edit);
}

function activate(context) {
    const colors = ['#8B0000', '#B22222', '#FF4500', '#FF8C00', '#FFD700']; // Dark red to gold
    const backgroundColor = new ThemeColor('editor.background');

    context.subscriptions.push(commands.registerCommand('67lang.formatDocument', formatDocument));

    colors.forEach(color => {
        gradientDecorationTypes.push(window.createTextEditorDecorationType({
            backgroundColor: hexToRgba(color, 0.67),
            // TODO. this still a very half arsed h*ck, and in particular it ruins text selection
            //  because the blue selection overlay isn't actually rendered onto the borders.
            borderWidth: '6.7px 2.3px',
            borderColor: backgroundColor,
            borderStyle: 'solid'
        }));
    });

    function updateTabDecorations() {
        window.visibleTextEditors.forEach(editor => {
            // Clear existing decorations first
            gradientDecorationTypes.forEach(type => editor.setDecorations(type, []));

            const decorationsByLevel = new Map(); // Map to store decorations for each level

            const document = editor.document;

            // Only apply to '67lang' documents
            if (document.languageId !== '67lang') {
                return;
            }

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                let match;
                const tabRegex = /^\t+/; // Match one or more tabs at the beginning of the line
                match = tabRegex.exec(line.text);

                if (match) {
                    const tabs = match[0]; // The matched tabs string
                    for (let j = 0; j < tabs.length; j++) {
                        const startPos = new Position(line.lineNumber, match.index + j);
                        const endPos = new Position(line.lineNumber, match.index + j + 1);
                        const range = new Range(startPos, endPos);

                        // The indentation level is 'j' (0-indexed)
                        const decorationLevel = Math.min(j, gradientDecorationTypes.length - 1);

                        if (!decorationsByLevel.has(decorationLevel)) {
                            decorationsByLevel.set(decorationLevel, []);
                        }
                        decorationsByLevel.get(decorationLevel).push({ range });
                    }
                }
            }

            // Apply decorations for each level
            decorationsByLevel.forEach((decorations, level) => {
                editor.setDecorations(gradientDecorationTypes[level], decorations);
            });
        });
    }

    // Initial update
    updateTabDecorations();

    // Update decorations when the active editor changes
    window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateTabDecorations();
        }
    });

    // Update decorations when the document text changes
    workspace.onDidChangeTextDocument(event => {
        // Only update if the change is in a visible editor and is a '67lang' document
        window.visibleTextEditors.forEach(editor => {
            if (editor.document === event.document && editor.document.languageId === '67lang') {
                updateTabDecorations();
            }
        });
    });
}

function deactivate() {
    gradientDecorationTypes.forEach(type => type.dispose());
}

module.exports = { activate, deactivate };
