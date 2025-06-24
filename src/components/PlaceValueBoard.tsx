
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
      className="p-6 shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '50px',
        border: 'none',
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <h3 
        className="text-3xl font-bold text-center mb-6"
        style={{ 
          color: '#6F00FF', 
          fontFamily: 'Space Grotesk',
          fontWeight: 700
        }}
      >
        📊 Place Value Board
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Tens Column */}
        <div 
          className="rounded-2xl p-4 min-h-[200px]"
          style={{
            backgroundColor: '#0026FF',
            opacity: 0.1,
            border: '4px solid #0026FF'
          }}
        >
          <div 
            className="text-center font-bold mb-4 text-2xl"
            style={{ 
              color: '#0026FF', 
              fontFamily: 'DM Sans',
              fontWeight: 700
            }}
          >
            TENS
          </div>
          <div className="grid gap-2">
            {Array.from({ length: tensBlocks }, (_, i) => (
              <div 
                key={i} 
                className="h-10 rounded-lg flex items-center justify-center font-bold"
                style={{
                  backgroundColor: '#0026FF',
                  color: '#FAFAFA',
                  fontFamily: 'DM Sans',
                  fontSize: '18px'
                }}
              >
                10
              </div>
            ))}
          </div>
        </div>

        {/* Ones Column */}
        <div 
          className="rounded-2xl p-4 min-h-[200px]"
          style={{
            backgroundColor: '#FF6F00',
            opacity: 0.1,
            border: '4px solid #FF6F00'
          }}
        >
          <div 
            className="text-center font-bold mb-4 text-2xl"
            style={{ 
              color: '#FF6F00', 
              fontFamily: 'DM Sans',
              fontWeight: 700
            }}
          >
            ONES
          </div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: onesBlocks }, (_, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: '#FF6F00',
                  color: '#FAFAFA',
                  fontFamily: 'DM Sans'
                }}
              >
                1
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Display */}
      <div className="text-center">
        <div 
          className="text-3xl font-bold mb-2"
          style={{ 
            color: '#2F2E41', 
            fontFamily: 'Space Grotesk',
            fontWeight: 700
          }}
        >
          Your Answer: {userAnswer}
        </div>
        <div 
          className="text-xl"
          style={{ 
            color: '#2F2E41', 
            fontFamily: 'DM Sans',
            fontSize: '18px'
          }}
        >
          ({tensBlocks} tens + {onesBlocks} ones)
        </div>
      </div>
    </Card>
  );
};

export default PlaceValueBoard;
