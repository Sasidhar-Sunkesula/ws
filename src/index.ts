import { Server } from 'ws';
import http from 'http';

// WebSocket server setup
let wss: Server;
const port = 8080;

export const startWebSocketServer = () => {
    // Create HTTP server to handle WebSocket upgrade
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('WebSocket server running');
    });

    // Create WebSocket server attached to HTTP server
    wss = new Server({ server });

    wss.on('connection', (ws) => {
        console.log('A new client has connected');

        ws.on('message', (message) => {
            // Echo back the message to the client
            ws.send(`Server: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Start HTTP server (this is required for WebSocket to upgrade)
    server.listen(port, () => {
        console.log(`WebSocket server started on wss://chat.nodown.me:${port}`);
    });
};

// Stop WebSocket server gracefully
export const stopWebSocketServer = () => {
    if (wss) {
        wss.clients.forEach((client) => {
            // Close each WebSocket client connection
            client.close();
        });

        wss.close(() => {
            console.log('WebSocket server stopped gracefully');
        });
    }
};

// Start the WebSocket server
startWebSocketServer();

// Handle process termination (e.g., Ctrl+C)
process.on('SIGINT', () => {
    stopWebSocketServer();
    process.exit();
});
