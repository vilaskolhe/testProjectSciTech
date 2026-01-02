const express = require('express');
const router = express.Router();
const store = require('../store');
const { createUserRules, updateUserRules, validate } = require('../validation');
const emitter = require('../eventEmitter');

// POST /api/users
router.post('/', createUserRules, validate, (req, res, next) => {
  try {
    const created = store.create(req.body);
    // emit event for optional async flows (WS/Kafka)
    emitter.emit('UserCreated', created);
    return res.status(201).json(created);
  } catch (err) { next(err); }
});

// GET /api/users
router.get('/', (req, res) => {
  res.json(store.getAll());
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = store.getById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// PUT /api/users/:id
router.put('/:id', updateUserRules, validate, (req, res) => {
  const updated = store.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ success: true });
});

module.exports = router;