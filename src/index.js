// Entry: start the HTTP server and optional WebSocket server
const app = require('./app');
const http = require('http');
const { setupWebSocket } = require('./websocket'); // optional
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Optional: start WebSocket server (emits events on user creation)
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`User API listening on http://localhost:${PORT}`);
});

module.exports = server;
