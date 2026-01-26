import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${id}`);
      setQuiz(response.data.data.quiz);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/quiz/${id}/take`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quiz) return null;

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Hard: 'bg-red-100 text-red-700 border-red-300'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${difficultyColors[quiz.difficulty]}`}>
                {quiz.difficulty}
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                {quiz.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{quiz.title}</h1>
            <p className="text-lg opacity-90">{quiz.description}</p>
          </div>

          {/* Quiz Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {quiz.questions?.length || 0}
                </div>
                <div className="text-gray-600 font-medium">Questions</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {quiz.timeLimit || 'No'}
                </div>
                <div className="text-gray-600 font-medium">
                  {quiz.timeLimit ? 'Minutes' : 'Time Limit'}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {quiz.attemptsCount || 0}
                </div>
                <div className="text-gray-600 font-medium">Attempts</div>
              </div>
            </div>

            {/* Creator Info */}
            {quiz.creator && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {quiz.creator.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created by</p>
                    <p className="font-semibold text-gray-900">{quiz.creator.name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Instructions
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Answer all questions to complete the quiz
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  You can navigate between questions freely
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Your results will be shown immediately after submission
                </li>
                {quiz.timeLimit && (
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Complete the quiz within {quiz.timeLimit} minutes
                  </li>
                )}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleStartQuiz}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                {isAuthenticated ? 'Start Quiz' : 'Login to Start'}
              </button>
              <Link
                to="/"
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;