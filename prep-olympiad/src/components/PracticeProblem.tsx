'use client';
import { useState } from 'react';
import { getQuestions } from '../data/sample-questions';

interface Choice {
  text: string;
  image: string | null;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
  difficulty: string;
  subject: string;
}

interface PracticeProblemProps {
  subject: string;
}

export default function PracticeProblem({ subject }: PracticeProblemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (choiceIndex: number) => {
    setSelectedAnswer(String.fromCharCode(65 + choiceIndex)); // Convert to A, B, C, D
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Question {currentQuestion.id}</span>
          <span className="text-sm text-gray-500">{currentQuestion.difficulty}</span>
        </div>
        
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: currentQuestion.content }} />
        </div>
      </div>

      <div className="space-y-4">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-4 text-left border rounded-lg ${
              selectedAnswer === String.fromCharCode(65 + index)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + index)})</span>
            {choice.text}
            {choice.image && (
              <img 
                src={`data:image/png;base64,${choice.image}`} 
                alt={`Choice ${String.fromCharCode(65 + index)}`}
                className="mt-2 max-w-full"
              />
            )}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Correct Answer: {
              String.fromCharCode(65 + currentQuestion.choices.findIndex(c => c.isCorrect))
            }</h3>
          </div>
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
} 