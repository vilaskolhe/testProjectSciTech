// lightweight event emitter for the optional async flow (used by websocket/kafka)
const EventEmitter = require('events');
const emitter = new EventEmitter();

// emit: 'UserCreated' with payload
module.exports = emitter;