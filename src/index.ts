import { Server } from 'ws';

let wss: Server;
const port = 8080;
export const startWebSocketServer = () => {
    // Create WebSocket server
    wss = new Server({ port: port });

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
};

export const stopWebSocketServer = () => {
    if (wss) {
        wss.close(() => {
            console.log('WebSocket server stopped');
        });
    }
};

startWebSocketServer();
process.on('SIGINT', stopWebSocketServer);
