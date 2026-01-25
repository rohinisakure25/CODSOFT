const { body } = require('express-validator');
const { validate } = require('./authValidator');

exports.validateQuiz = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be 3-100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be 10-500 characters'),
  body('category')
    .isIn(['Science', 'History', 'Geography', 'Math', 'Literature', 'Technology', 'Sports', 'Entertainment', 'General Knowledge', 'Other'])
    .withMessage('Invalid category'),
  body('difficulty')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),
  body('questions')
    .isArray({ min: 3, max: 50 })
    .withMessage('Quiz must have 3-50 questions'),
  body('questions.*.question')
    .trim()
    .notEmpty()
    .withMessage('Question text required'),
  body('questions.*.options')
    .isArray({ min: 2, max: 4 })
    .withMessage('Each question needs 2-4 options'),
  body('questions.*.correctAnswer')
    .isInt({ min: 0, max: 3 })
    .withMessage('Correct answer must be 0-3'),
  validate
];