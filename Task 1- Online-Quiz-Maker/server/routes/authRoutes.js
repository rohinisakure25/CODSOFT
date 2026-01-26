const express = require('express');
const { body } = require('express-validator');
const { signup, login, getCurrentUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../validators/authValidator');

const router = express.Router();

router.post('/signup', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
], signup);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
], login);

router.get('/me', authenticate, getCurrentUser);

module.exports = router;