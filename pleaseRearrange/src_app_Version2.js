const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// base path per project spec
app.use('/api/users', usersRouter);

// basic error handling
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;