const express = require('express');
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getMyQuizzes,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { validateQuiz } = require('../validators/quizValidator');

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/my-quizzes', authenticate, getMyQuizzes);
router.get('/:id', optionalAuth, getQuizById);
router.post('/', authenticate, validateQuiz, createQuiz);
router.put('/:id', authenticate, validateQuiz, updateQuiz);
router.delete('/:id', authenticate, deleteQuiz);

module.exports = router;