import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

const QuizResults = () => {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = async () => {
    try {
      const response = await api.get(`/attempts/${id}`);
      setAttempt(response.data.data.attempt);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!attempt) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${getScoreBg(attempt.score)} p-8 text-white text-center`}>
            <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
            <div className="text-6xl font-bold mb-2">{attempt.score}%</div>
            <p className="text-xl opacity-90">
              {attempt.correctAnswers} out of {attempt.totalQuestions} correct
            </p>
            {attempt.timeTaken && (
              <p className="mt-2 opacity-75">
                Time taken: {Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s
              </p>
            )}
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h2>

            <div className="space-y-6">
              {attempt.quiz.questions.map((question, qIndex) => {
                const answer = attempt.answers[qIndex];
                const isCorrect = answer.isCorrect;

                return (
                  <div
                    key={qIndex}
                    className={`border-2 rounded-lg p-6 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = answer.selectedAnswer === oIndex;
                        const isCorrectOption = answer.correctAnswer === oIndex;

                        let optionClass = 'bg-gray-100 border-gray-300';
                        if (isCorrectOption) {
                          optionClass = 'bg-green-100 border-green-500';
                        } else if (isSelected && !isCorrect) {
                          optionClass = 'bg-red-100 border-red-500';
                        }

                        return (
                          <div
                            key={oIndex}
                            className={`px-4 py-3 rounded-lg border-2 ${optionClass}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900">{option}</span>
                              {isCorrectOption && (
                                <span className="text-green-700 font-semibold text-sm">
                                  ✓ Correct Answer
                                </span>
                              )}
                              {isSelected && !isCorrect && (
                                <span className="text-red-700 font-semibold text-sm">
                                  Your Answer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Browse More Quizzes
              </Link>
              <Link
                to={`/quiz/${attempt.quiz._id}`}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Retake Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;