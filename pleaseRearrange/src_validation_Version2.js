// express-validator checks for user payload
const { body, validationResult } = require('express-validator');

const createUserRules = [
  body('name').isString().isLength({ min: 1 }).withMessage('name is required'),
  body('email').isEmail().withMessage('email must be valid'),
  body('age').optional().isInt({ min: 0 }).withMessage('age must be an integer >= 0')
];

const updateUserRules = [
  body('name').optional().isString().isLength({ min: 1 }),
  body('email').optional().isEmail(),
  body('age').optional().isInt({ min: 0 })
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });
  }
  next();
}

module.exports = { createUserRules, updateUserRules, validate };