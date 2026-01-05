  const request = require('supertest');
const app = require('../src/app');

describe('Optional WebSocket flow', () => {
  let server;
  beforeAll(() => {
    server = require('../src/index'); // starts WS server too
  });
  afterAll((done) => server.close(done));

  test('WebSocket receives UserCreated event', done => {
    const WebSocket = require('ws');
    const url = `ws://localhost:${process.env.PORT || 3000}/ws`;
    const ws = new WebSocket(url);
    ws.on('open', async () => {
      // create user - server emits event
      await request(app).post('/api/users').send({ name: 'WSUser', email: 'ws@example.com' }).expect(201);
    });
    ws.on('message', msg => {
      const pkt = JSON.parse(msg.toString());
      expect(pkt.event).toBe('UserCreated');
      expect(pkt.data.email).toBe('ws@example.com');
      ws.close();
      done();
    });
    ws.on('error', err => done(err));
  }, 10000);
});