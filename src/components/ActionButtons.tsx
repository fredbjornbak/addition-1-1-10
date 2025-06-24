
import React from 'react';
import { RotateCcw, Lightbulb } from 'lucide-react';

interface ActionButtonsProps {
  onCheckAnswer: () => void;
  onReset: () => void;
  onShowSolution: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onCheckAnswer, 
  onReset, 
  onShowSolution 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={onCheckAnswer}
        className="px-8 py-4 font-dm-sans text-grade-button text-grade-white font-bold 
                   bg-grade-purple rounded-grade-pill border-0 shadow-grade-button
                   transition-all duration-200 hover:scale-105 active:scale-95 
                   focus:outline-none focus:ring-4 focus:ring-grade-purple focus:ring-opacity-50
                   hover:bg-purple-600 min-w-[44px] min-h-[44px]"
        style={{
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41'
        }}
        aria-label="Check your answer"
      >
        ✓ Check Answer
      </button>
      
      <button
        onClick={onReset}
        className="px-6 py-4 font-dm-sans text-grade-body text-grade-black font-medium
                   bg-grade-gray rounded-grade-pill border-2 border-grade-border
                   transition-all duration-200 hover:scale-105 active:scale-95 
                   focus:outline-none focus:ring-4 focus:ring-grade-border focus:ring-opacity-50
                   hover:bg-gray-200 flex items-center gap-2 min-w-[44px] min-h-[44px]"
        aria-label="Reset the canvas"
      >
        <RotateCcw className="w-5 h-5" aria-hidden="true" />
        Reset
      </button>
      
      <button
        onClick={onShowSolution}
        className="px-6 py-4 font-dm-sans text-grade-body text-grade-white font-bold
                   bg-grade-orange rounded-grade-pill border-0 shadow-grade-button
                   transition-all duration-200 hover:scale-105 active:scale-95 
                   focus:outline-none focus:ring-4 focus:ring-grade-orange focus:ring-opacity-50
                   hover:bg-orange-600 flex items-center gap-2 min-w-[44px] min-h-[44px]"
        style={{
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41'
        }}
        aria-label="Show me the solution"
      >
        <Lightbulb className="w-5 h-5" aria-hidden="true" />
        Show Me
      </button>
    </div>
  );
};

export default ActionButtons;
