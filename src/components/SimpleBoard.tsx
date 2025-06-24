
import React from 'react';
import { Card } from '@/components/ui/card';

interface SimpleBoardProps {
  tensBlocks: number;
  onesBlocks: number;
  onAddTens: () => void;
  onAddOnes: () => void;
  userAnswer: number;
}

const SimpleBoard: React.FC<SimpleBoardProps> = ({ 
  tensBlocks, 
  onesBlocks, 
  onAddTens,
  onAddOnes,
  userAnswer 
}) => {
  return (
    <Card 
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Tens Column - Clickable */}
        <button
          onClick={onAddTens}
          className="rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
          style={{
            backgroundColor: 'rgba(0, 38, 255, 0.1)',
            borderColor: '#0026FF'
          }}
          aria-label="Click to add ten blocks"
        >
          <div className="font-dm-sans text-center font-bold mb-4 text-3xl text-grade-blue">
            TENS
          </div>
          <div className="text-sm text-grade-blue mb-4 opacity-75">Click to add!</div>
          <div className="grid gap-2">
            {Array.from({ length: tensBlocks }, (_, i) => (
              <div 
                key={i} 
                className="h-12 rounded-lg flex items-center justify-center font-dm-sans text-grade-body font-bold text-grade-white bg-grade-blue animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                10
              </div>
            ))}
          </div>
        </button>

        {/* Ones Column - Clickable */}
        <button
          onClick={onAddOnes}
          className="rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
          style={{
            backgroundColor: 'rgba(255, 111, 0, 0.1)',
            borderColor: '#FF6F00'
          }}
          aria-label="Click to add one blocks"
        >
          <div className="font-dm-sans text-center font-bold mb-4 text-3xl text-grade-orange">
            ONES
          </div>
          <div className="text-sm text-grade-orange mb-4 opacity-75">Click to add!</div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: onesBlocks }, (_, i) => (
              <div 
                key={i} 
                className="w-10 h-10 rounded-md flex items-center justify-center font-dm-sans text-sm font-bold text-grade-white bg-grade-orange animate-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                1
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* Answer Display */}
      <div className="text-center">
        <div className="font-space-grotesk text-4xl font-bold mb-2 text-grade-black">
          {userAnswer}
        </div>
        <div className="font-dm-sans text-grade-body text-grade-black">
          ({tensBlocks} tens + {onesBlocks} ones)
        </div>
      </div>
    </Card>
  );
};

export default SimpleBoard;
