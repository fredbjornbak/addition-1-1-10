
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
    <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
      <div className="flex items-center justify-center gap-8 mb-4">
        <div className="text-center">
          <div className="text-green-600 font-bold text-lg mb-2">TENS</div>
          <div className="text-4xl font-bold text-green-600">{tensCount}</div>
        </div>
        
        <div className="text-4xl font-bold text-gray-600">+</div>
        
        <div className="text-center">
          <div className="text-blue-600 font-bold text-lg mb-2">ONES</div>
          <div className="text-4xl font-bold text-blue-600">{onesCount}</div>
        </div>
      </div>
      
      <div className="border-t-2 border-gray-300 pt-4">
        <div className="text-gray-600 font-bold text-lg mb-2">Total:</div>
        <div className="text-6xl font-bold text-gray-800">{userAnswer}</div>
      </div>
      
      {hasBundle && (
        <div className="font-dm-sans text-sm text-purple-600 mt-4 animate-bounce">
          💡 You have 10 ones! Click the purple area to bundle them into 1 ten!
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
