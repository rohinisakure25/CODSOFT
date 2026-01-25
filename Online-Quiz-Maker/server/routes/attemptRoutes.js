const express = require('express');
const { body } = require('express-validator');
const {
  submitAttempt,
  getAttemptById,
  getUserAttempts
} = require('../controllers/attemptController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../validators/authValidator');

const router = express.Router();

router.post('/', authenticate, [
  body('quizId').isMongoId().withMessage('Valid quiz ID required'),
  body('answers').isArray({ min: 1 }).withMessage('Answers array required'),
  body('timeTaken').optional().isInt({ min: 0 }).withMessage('Time must be positive'),
  validate
], submitAttempt);

router.get('/user', authenticate, getUserAttempts);
router.get('/:id', authenticate, getAttemptById);

module.exports = router;