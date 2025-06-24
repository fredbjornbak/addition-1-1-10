
import React from 'react';

interface SimpleFeedbackProps {
  isCorrect: boolean | null;
  correctAnswer: number;
  show: boolean;
}

const SimpleFeedback: React.FC<SimpleFeedbackProps> = ({ isCorrect, correctAnswer, show }) => {
  if (!show) return null;

  return (
    <div className={`text-center p-4 rounded-lg font-dm-sans text-grade-body-lg font-bold ${
      isCorrect 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {isCorrect ? (
        <div>
          🎉 Excellent! You correctly represented both numbers and their sum!
        </div>
      ) : (
        <div>
          Try again! Make sure to represent both addends correctly and drag blocks to show the total of {correctAnswer}
        </div>
      )}
    </div>
  );
};

export default SimpleFeedback;
