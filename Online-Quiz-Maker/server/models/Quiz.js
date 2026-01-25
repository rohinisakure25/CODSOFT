const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: 0,
    max: 3
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Quiz description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Science', 'History', 'Geography', 'Math', 'Literature', 'Technology', 'Sports', 'Entertainment', 'General Knowledge', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  questions: {
    type: [questionSchema],
    validate: {
      validator: function(questions) {
        return questions.length >= 3 && questions.length <= 50;
      },
      message: 'Quiz must have between 3 and 50 questions'
    }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  timeLimit: {
    type: Number,
    default: null
  },
  attemptsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

quizSchema.index({ title: 'text', description: 'text' });
quizSchema.index({ creator: 1 });
quizSchema.index({ category: 1 });

module.exports = mongoose.model('Quiz', quizSchema);