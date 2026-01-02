// Simple WebSocket server using ws library that emits on 'UserCreated' events.
// The tests will connect and validate messages.
const WebSocket = require('ws');
const emitter = require('./eventEmitter');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: '/ws' });
  wss.on('connection', ws => {
    console.log('WS client connected');
    const handler = (payload) => {
      try {
        ws.send(JSON.stringify({ event: 'UserCreated', data: payload }));
      } catch (e) { /* ignore */ }
    };
    emitter.on('UserCreated', handler);
    ws.on('close', () => emitter.off('UserCreated', handler));
  });
  // expose for tests
  module.exports.wss = wss;
}

module.exports = { setupWebSocket };