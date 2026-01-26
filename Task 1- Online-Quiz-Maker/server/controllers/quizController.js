const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, difficulty, questions, timeLimit } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      category,
      difficulty,
      questions,
      timeLimit,
      creator: req.userId
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: { quiz }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllQuizzes = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    
    const filter = { isPublic: true };
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    const quizzes = await Quiz.find(filter)
      .populate('creator', 'name')
      .sort({ createdAt: -1 })
      .select('-questions.correctAnswer');

    res.json({
      success: true,
      data: { quizzes }
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('creator', 'name email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const quizData = quiz.toObject();
    if (!req.userId || quiz.creator._id.toString() !== req.userId) {
      quizData.questions = quizData.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options
      }));
    }

    res.json({
      success: true,
      data: { quiz: quizData }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ creator: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { quizzes }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.creator.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quiz'
      });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Quiz updated successfully',
      data: { quiz: updatedQuiz }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.creator.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quiz'
      });
    }

    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};