import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('quizzes');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quizzesRes, attemptsRes] = await Promise.all([
        api.get('/quizzes/my-quizzes'),
        api.get('/attempts/user')
      ]);

      setMyQuizzes(quizzesRes.data.data.quizzes);
      setAttempts(attemptsRes.data.data.attempts);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;

    try {
      await api.delete(`/quizzes/${quizId}`);
      setMyQuizzes(myQuizzes.filter(q => q._id !== quizId));
    } catch (error) {
      alert('Failed to delete quiz');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Manage your quizzes and track your progress</p>
      </div>

      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'quizzes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Quizzes ({myQuizzes.length})
            </button>
            <button
              onClick={() => setActiveTab('attempts')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'attempts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recent Attempts ({attempts.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'quizzes' ? (
            myQuizzes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">You haven't created any quizzes yet</p>
                <Link
                  to="/create"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Create Your First Quiz
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myQuizzes.map(quiz => (
                  <div key={quiz._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 mb-3">{quiz.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{quiz.questions.length} questions</span>
                          <span>•</span>
                          <span>{quiz.category}</span>
                          <span>•</span>
                          <span>{quiz.difficulty}</span>
                          <span>•</span>
                          <span>{quiz.attemptsCount} attempts</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link
                          to={`/quiz/${quiz._id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(quiz._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            attempts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No quiz attempts yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {attempts.map(attempt => (
                  <div key={attempt._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{attempt.quiz.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{attempt.quiz.category}</span>
                          <span>•</span>
                          <span>{attempt.quiz.difficulty}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          attempt.score >= 80 ? 'text-green-600' :
                          attempt.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {attempt.score}%
                        </div>
                        <p className="text-sm text-gray-600">
                          {attempt.correctAnswers}/{attempt.totalQuestions} correct
                        </p>
                        <Link
                          to={`/results/${attempt._id}`}
                          className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;