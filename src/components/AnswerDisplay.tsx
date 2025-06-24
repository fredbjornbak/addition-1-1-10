
import React from 'react';

interface AnswerDisplayProps {
  userAnswer: number;
  tensCount: number;
  onesCount: number;
  hasBundle: boolean;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  userAnswer,
  tensCount,
  onesCount,
  hasBundle
}) => {
  return (
    <div className="text-center">
      <div className="font-space-grotesk text-4xl font-bold mb-2 text-grade-black">
        {userAnswer}
      </div>
      <div className="font-dm-sans text-grade-body text-grade-black">
        ({tensCount} tens + {onesCount} ones)
      </div>
      {hasBundle && (
        <div className="font-dm-sans text-sm text-purple-600 mt-2 animate-bounce">
          💡 You have 10 ones! Drag them to the tens column to make 1 ten!
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
