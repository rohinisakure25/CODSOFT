const QuestionForm = ({ question, index, onUpdate, onUpdateOption, onRemove, canRemove }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={question.question}
            onChange={(e) => onUpdate(index, 'question', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter your question"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer Options (at least 2) <span className="text-red-500">*</span>
          </label>
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name={`correct-${index}`}
                checked={question.correctAnswer === oIndex}
                onChange={() => onUpdate(index, 'correctAnswer', oIndex)}
                className="w-4 h-4 text-blue-600"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => onUpdateOption(index, oIndex, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder={`Option ${oIndex + 1}`}
              />
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-2">Select the correct answer by clicking the radio button</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;