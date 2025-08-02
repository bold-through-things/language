const path = require('path');
const { workspace, ExtensionContext, window } = require('vscode');
const { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } = require('vscode-languageclient/node');
const net = require('net');
const { spawn } = require('child_process');

const host = "127.0.0.1"
const port = 64529;

let client;

console.log("INDENTIFIRE LSP");

let serverProcess; // Keep a reference to the process

function waitForTCPConnection(port, host, maxRetries = 10, delay = 500) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const tryConnect = () => {
            const socket = net.connect(port, host, () => {
                // Now the socket is connected, resolve the promise
                resolve(socket);
            });

            socket.on('error', (err) => {
                attempts++;
                if (attempts >= maxRetries) {
                    reject(new Error('Failed to connect to the language server within the timeout.'));
                } else {
                    setTimeout(tryConnect, delay); // Retry after a delay
                }
            });
        };

        tryConnect();
    });
}

function activate(context) {
    // Path to the Python server script
    const serverModule = context.asAbsolutePath(path.join('server', 'server.py'));
    console.info("INDENTIFIRE LSP starting:", serverModule);
    console.info("INDENTIFIRE LSP starting: env:", process.env);
    const serverOptions = async () => {
        serverProcess = spawn('python3', ['-u', serverModule], {
            env: {
                ...process.env,
                PATH: '/home/inrtstrrun/.pyenv/shims:'+process.env.PATH,
                PYTHONPATH: '/home/inrtstrrun/.pyenv/versions/3.13/lib/python3.13/site-packages'
            }
        });

        // Debug server output (optional)
        serverProcess.stdout.on('data', (data) => console.log(`Server stdout: ${data}`));
        serverProcess.stderr.on('data', (data) => console.error(`Server stderr: ${data}`));

        serverProcess.on('error', (err) => {
            console.error('Failed to start server process:', err);
            throw err;
        });

        try {
            const socket = await waitForTCPConnection(port, host);
            console.log('Language server is ready on', host, ":", port);
            return { reader: socket, writer: socket };
        } catch (err) {
            console.error('Could not connect to the language server:', err);
            throw err;
        }
    };

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: '67lang' }],
        outputChannelName: "67LANG LSP Client",
        traceOutputChannel: window.createOutputChannel("67LANG LSP Client trace")
    };

    client = new LanguageClient(
        '67lang_lsp',
        '67LANG Language Server',
        serverOptions,
        clientOptions
    );

    client.start().then(
        () => console.log("Language client started successfully!"),
        (error) => console.error("Language client failed to start:", error)
    );
}

function deactivate() {
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
    }
    if (client) {
        client.stop();
        client = null;
    }
}

module.exports = { activate, deactivate };