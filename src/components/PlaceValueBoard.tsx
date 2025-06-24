
import React from 'react';
import { Card } from '@/components/ui/card';

interface PlaceValueBoardProps {
  tensBlocks: number;
  onesBlocks: number;
  userAnswer: number;
}

const PlaceValueBoard: React.FC<PlaceValueBoardProps> = ({ 
  tensBlocks, 
  onesBlocks, 
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
      <h3 className="font-space-grotesk text-3xl font-bold text-center mb-6 text-grade-purple">
        📊 Place Value Board
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Tens Column */}
        <div 
          className="rounded-2xl p-4 min-h-[200px] border-4"
          style={{
            backgroundColor: 'rgba(0, 38, 255, 0.1)',
            borderColor: '#0026FF'
          }}
          role="region"
          aria-label={`Tens column with ${tensBlocks} blocks`}
        >
          <div className="font-dm-sans text-center font-bold mb-4 text-2xl text-grade-blue">
            TENS
          </div>
          <div className="grid gap-2">
            {Array.from({ length: tensBlocks }, (_, i) => (
              <div 
                key={i} 
                className="h-10 rounded-lg flex items-center justify-center font-dm-sans text-grade-body font-bold text-grade-white bg-grade-blue animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                aria-label="Ten block"
              >
                10
              </div>
            ))}
          </div>
        </div>

        {/* Ones Column */}
        <div 
          className="rounded-2xl p-4 min-h-[200px] border-4"
          style={{
            backgroundColor: 'rgba(255, 111, 0, 0.1)',
            borderColor: '#FF6F00'
          }}
          role="region"
          aria-label={`Ones column with ${onesBlocks} blocks`}
        >
          <div className="font-dm-sans text-center font-bold mb-4 text-2xl text-grade-orange">
            ONES
          </div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: onesBlocks }, (_, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-md flex items-center justify-center font-dm-sans text-sm font-bold text-grade-white bg-grade-orange animate-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
                aria-label="One block"
              >
                1
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Display */}
      <div className="text-center">
        <div className="font-space-grotesk text-3xl font-bold mb-2 text-grade-black">
          Your Answer: {userAnswer}
        </div>
        <div className="font-dm-sans text-grade-body text-grade-black">
          ({tensBlocks} tens + {onesBlocks} ones)
        </div>
      </div>
    </Card>
  );
};

export default PlaceValueBoard;
