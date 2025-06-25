
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
          🎉 Perfect! You correctly represented both numbers! Moving to the next question...
        </div>
      ) : (
        <div>
          Place the correct number of blocks for each number to continue
        </div>
      )}
    </div>
  );
};

export default SimpleFeedback;
