'use client';
import { useState } from 'react';
import { getQuestions } from '../data/sample-questions';
import { motion } from 'framer-motion';

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
  explanation?: string;
}

interface PracticeProblemProps {
  subject: string;
}

export default function PracticeProblem({ subject }: PracticeProblemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (choiceIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(String.fromCharCode(65 + choiceIndex)); // Convert to A, B, C, D
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get difficulty color
  const getDifficultyColor = () => {
    switch (currentQuestion?.difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Generate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isCorrectChoice = (index: number) => {
    return currentQuestion.choices[index].isCorrect;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {/* Question Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{currentQuestion.title || `${subject} Problem`}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
              {currentQuestion.difficulty}
            </span>
          </div>
        </div>
        
        {/* Question Content */}
        <div className="p-6">
          <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: currentQuestion.content }} />
          </div>

          {/* Answer Choices */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              const letter = String.fromCharCode(65 + index);
              const isSelected = selectedAnswer === letter;
              const isCorrect = isCorrectChoice(index);
              
              // Determine styling based on selection state
              let buttonStyle = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
              if (showExplanation) {
                if (isCorrect) {
                  buttonStyle = "border-green-500 bg-green-50";
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "border-red-500 bg-red-50";
                }
              } else if (isSelected) {
                buttonStyle = "border-indigo-500 bg-indigo-50";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${buttonStyle} flex items-start`}
                  disabled={showExplanation}
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-medium mr-3">
                    {letter}
                  </span>
                  <div className="flex-1">
                    <span className="text-gray-800" dangerouslySetInnerHTML={{ __html: choice.text }} />
                    {choice.image && (
                      <img 
                        src={`data:image/png;base64,${choice.image}`} 
                        alt={`Choice ${letter}`}
                        className="mt-3 max-w-full rounded-lg"
                      />
                    )}
                  </div>
                  {showExplanation && (
                    <span className="ml-2 flex-shrink-0">
                      {isCorrect ? (
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isSelected ? (
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explanation and Navigation */}
      {showExplanation && (
        <div className="mt-8 transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              {selectedAnswer === String.fromCharCode(65 + currentQuestion.choices.findIndex(c => c.isCorrect)) 
                ? '✅ Correct Answer!' 
                : '❌ Incorrect Answer'}
            </h3>
            
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700">
                The correct answer is <strong>{String.fromCharCode(65 + currentQuestion.choices.findIndex(c => c.isCorrect))}</strong>.
              </p>
              
              {currentQuestion.explanation && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium uppercase text-indigo-600 tracking-wide mb-2">Explanation</h4>
                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }} />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setShowExplanation(false);
                setSelectedAnswer(null);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors flex items-center"
            >
              <span>Next Question</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 