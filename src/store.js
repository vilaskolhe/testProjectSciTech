// Simple in-memory store. Exposed as an array and helper functions.
const { v4: uuidv4 } = require('uuid');

const users = [];

function getAll() {
  return users;
}
function getById(id) {
  return users.find(u => u.id === id);
}
function create(user) {
  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  return newUser;
}
function update(id, patch) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  return users[idx];
}
function remove(id) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}
function reset() {
  users.length = 0;
}
module.exports = { getAll, getById, create, update, remove, reset };
