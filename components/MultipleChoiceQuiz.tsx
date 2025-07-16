
import React, { useState } from 'react';
import ContentPanel from './ContentPanel';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    question: "What is a Stack data structure?",
    options: ["First-In-First-Out (FIFO)", "Last-In-First-Out (LIFO)", "A type of tree", "A sorting algorithm"],
    correctAnswerIndex: 1,
  },
  {
    question: "Which of the following is a non-linear data structure?",
    options: ["Array", "Stack", "Queue", "Tree"],
    correctAnswerIndex: 3,
  },
  {
    question: "What does SQL stand for?",
    options: ["Strong Question Language", "Structured Query Language", "Simple Query Logic", "System Query Link"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the time complexity of a binary search algorithm in the worst case?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correctAnswerIndex: 1,
  }
];

const MultipleChoiceQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; 

    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };
  
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  }

  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return "bg-gray-700 hover:bg-gray-600";
    }
    if (index === currentQuestion.correctAnswerIndex) {
      return "bg-green-600";
    }
    if (index === selectedAnswer) {
      return "bg-red-600";
    }
    return "bg-gray-700 cursor-not-allowed opacity-50";
  };

  if (showResult) {
    return (
      <ContentPanel title="Quiz Result">
        <div className="text-center">
            <p className="text-xl text-gray-300">You scored <span className="font-bold text-blue-400">{score}</span> out of <span className="font-bold text-blue-400">{questions.length}</span>!</p>
            <button
                onClick={handleReset}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
            >
                Try Again
            </button>
        </div>
      </ContentPanel>
    )
  }

  return (
    <ContentPanel title={`Question ${currentQuestionIndex + 1}/${questions.length}`}>
      <h3 className="text-xl font-semibold mb-6 text-gray-200">{currentQuestion.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${getButtonClass(index)}`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer !== null && (
         <div className="mt-6 text-right">
             <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
             >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
             </button>
         </div>
      )}
    </ContentPanel>
  );
};

export default MultipleChoiceQuiz;
