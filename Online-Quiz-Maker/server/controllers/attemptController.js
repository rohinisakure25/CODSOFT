const Attempt = require('../models/Attempt');
const Quiz = require('../models/Quiz');

exports.submitAttempt = async (req, res, next) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      return {
        questionId: question._id,
        selectedAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect: answer === question.correctAnswer
      };
    });

    const correctAnswers = processedAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    const attempt = await Attempt.create({
      quiz: quizId,
      user: req.userId,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeTaken
    });

    await Quiz.findByIdAndUpdate(quizId, {
      $inc: { attemptsCount: 1 }
    });

    const populatedAttempt = await Attempt.findById(attempt._id)
      .populate('quiz', 'title description')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: { attempt: populatedAttempt }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAttemptById = async (req, res, next) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate('quiz')
      .populate('user', 'name email');

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Attempt not found'
      });
    }

    if (attempt.user._id.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this attempt'
      });
    }

    res.json({
      success: true,
      data: { attempt }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserAttempts = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ user: req.userId })
      .populate('quiz', 'title category difficulty')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: { attempts }
    });
  } catch (error) {
    next(error);
  }
};