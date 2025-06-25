
import React from 'react';

interface SimpleFeedbackProps {
  isCorrect: boolean | null;
  correctAnswer: number;
  show: boolean;
  firstNumberOnes?: number;
  secondNumberOnes?: number;
}

const SimpleFeedback: React.FC<SimpleFeedbackProps> = ({ 
  isCorrect, 
  correctAnswer, 
  show, 
  firstNumberOnes = 0,
  secondNumberOnes = 0 
}) => {
  if (!show) return null;

  const needsRegrouping = firstNumberOnes >= 10 || secondNumberOnes >= 10;

  return (
    <div className={`text-center p-4 rounded-lg font-dm-sans text-grade-body-lg font-bold ${
      isCorrect 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {isCorrect ? (
        <div>
          🎉 Perfect! You correctly represented both numbers with proper place value! Moving to the next question...
        </div>
      ) : (
        <div>
          {needsRegrouping ? (
            <div>
              ⚠️ Remember: When you have 10 or more ones, drag them to the tens column to make groups of 10!
              <br />
              <span className="text-sm mt-2 block">
                Drag ones blocks into the tens area to regroup them properly.
              </span>
            </div>
          ) : (
            <div>
              Place the correct number of blocks for each number to continue
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleFeedback;
