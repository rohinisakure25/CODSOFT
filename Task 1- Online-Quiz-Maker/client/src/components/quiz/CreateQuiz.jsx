import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { CATEGORIES, DIFFICULTIES } from '../../utils/constants';
import QuestionForm from './QuestionForm';
import Button from '../common/Button';

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: 'General Knowledge',
    difficulty: 'Medium',
    timeLimit: null
  });
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => {
    if (questions.length < 50) {
      setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const validateQuiz = () => {
    if (quizData.title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return false;
    }

    if (quizData.description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return false;
    }

    if (questions.length < 3) {
      setError('Quiz must have at least 3 questions');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.question.trim()) {
        setError(`Question ${i + 1} is empty`);
        return false;
      }

      const filledOptions = q.options.filter(opt => opt.trim());
      if (filledOptions.length < 2) {
        setError(`Question ${i + 1} must have at least 2 options`);
        return false;
      }

      if (q.correctAnswer >= filledOptions.length) {
        setError(`Question ${i + 1} has invalid correct answer`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateQuiz()) return;

    setLoading(true);

    try {
      const cleanedQuestions = questions.map(q => ({
        ...q,
        options: q.options.filter(opt => opt.trim())
      }));

      await api.post('/quizzes', {
        ...quizData,
        questions: cleanedQuestions
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Quiz</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={quizData.title}
                onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., World Geography Quiz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={quizData.category}
                onChange={(e) => setQuizData({ ...quizData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={quizData.description}
              onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows="3"
              placeholder="Brief description of what this quiz covers"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={quizData.difficulty}
                onChange={(e) => setQuizData({ ...quizData, difficulty: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit (minutes, optional)
              </label>
              <input
                type="number"
                min="1"
                value={quizData.timeLimit || ''}
                onChange={(e) => setQuizData({ ...quizData, timeLimit: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="No limit"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Questions</h2>
              <span className="text-sm text-gray-600">{questions.length} / 50</span>
            </div>

            {questions.map((question, index) => (
              <QuestionForm
                key={index}
                question={question}
                index={index}
                onUpdate={updateQuestion}
                onUpdateOption={updateOption}
                onRemove={() => removeQuestion(index)}
                canRemove={questions.length > 1}
              />
            ))}

            {questions.length < 50 && (
              <button
                type="button"
                onClick={addQuestion}
                className="w-full mt-4 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
              >
                + Add Question
              </button>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;

