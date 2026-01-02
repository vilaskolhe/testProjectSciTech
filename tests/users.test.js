const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const ajv = new Ajv({ allErrors: true });
const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schema/user.schema.json'), 'utf8'));
const validate = ajv.compile(userSchema);

// helper to reset between tests
beforeEach(() => { store.reset(); });

describe('User API - happy path', () => {
  test.each([
    [{ name: 'Alice', email: 'alice@example.com' }],
    [{ name: 'Bob', email: 'bob@example.com', age: 30 }]
  ])('POST /api/users data-driven -> %p', async (payload) => {
    const res = await request(app).post('/api/users').send(payload).expect(201);
    expect(validate(res.body)).toBe(true);
  });

  test('GET /api/users returns list', async () => {
    await request(app).post('/api/users').send({ name: 'X', email: 'x@x.com' });
    const res = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test('GET /api/users/:id returns user', async () => {
    const created = (await request(app).post('/api/users').send({ name: 'C', email: 'c@c.com' })).body;
    const res = await request(app).get(`/api/users/${created.id}`).expect(200);
    expect(validate(res.body)).toBe(true);
    expect(res.body.id).toBe(created.id);
  });

  test('PUT /api/users/:id updates user', async () => {
    const created = (await request(app).post('/api/users').send({ name: 'C', email: 'c@c.com' })).body;
    const res = await request(app).put(`/api/users/${created.id}`).send({ name: 'C2' }).expect(200);
    expect(res.body.name).toBe('C2');
  });

  test('DELETE /api/users/:id deletes user', async () => {
    const created = (await request(app).post('/api/users').send({ name: 'D', email: 'd@d.com' })).body;
    await request(app).delete(`/api/users/${created.id}`).expect(200);
    await request(app).get(`/api/users/${created.id}`).expect(404);
  });
});

describe('User API - negative cases & validation', () => {
  test('POST /api/users invalid email -> 400', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Bad', email: 'not-an-email' }).expect(400);
    expect(res.body.errors && res.body.errors.length > 0).toBeTruthy();
  });

  test('GET /api/users/:id not found -> 404', async () => {
    await request(app).get('/api/users/nonexistent').expect(404);
  });

  test('PUT /api/users/:id not found -> 404', async () => {
    await request(app).put('/api/users/nonexistent').send({ name: 'Nope' }).expect(404);
  });

  test('DELETE /api/users/:id not found -> 404', async () => {
    await request(app).delete('/api/users/none').expect(404);
  });
});

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
