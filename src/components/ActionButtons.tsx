
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
        className="px-8 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 min-w-[44px] min-h-[44px]"
        style={{
          backgroundColor: '#6F00FF',
          color: '#FAFAFA',
          borderRadius: '100px',
          border: 'none',
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41',
          boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.25)',
          fontFamily: 'DM Sans',
          fontSize: '20px',
          fontWeight: 700
        }}
      >
        ✓ Check Answer
      </button>
      
      <button
        onClick={onReset}
        className="px-6 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 min-w-[44px] min-h-[44px]"
        style={{
          backgroundColor: '#F0F0F0',
          color: '#2F2E41',
          borderRadius: '100px',
          border: '2px solid #E5E7EB',
          fontFamily: 'DM Sans',
          fontSize: '18px',
          fontWeight: 500
        }}
      >
        <RotateCcw className="w-5 h-5" />
        Reset
      </button>
      
      <button
        onClick={onShowSolution}
        className="px-6 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 min-w-[44px] min-h-[44px]"
        style={{
          backgroundColor: '#FF6F00',
          color: '#FAFAFA',
          borderRadius: '100px',
          border: 'none',
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41',
          boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.25)',
          fontFamily: 'DM Sans',
          fontSize: '18px',
          fontWeight: 700
        }}
      >
        <Lightbulb className="w-5 h-5" />
        Show Me
      </button>
    </div>
  );
};

export default ActionButtons;
