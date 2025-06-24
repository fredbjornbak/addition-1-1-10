
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameCompleteProps {
  onStartNewGame: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ onStartNewGame }) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
        🎉 Great Job!
      </div>
      <div className="font-dm-sans text-grade-body-lg text-grade-black">
        You completed all 10 problems!
      </div>
      <Button 
        onClick={onStartNewGame}
        className="font-dm-sans text-grade-button font-bold bg-grade-purple hover:bg-grade-purple/90 text-white px-8 py-4 rounded-grade-pill min-h-[44px]"
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameComplete;
