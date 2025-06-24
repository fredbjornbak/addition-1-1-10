
import React from 'react';
import { Card } from '@/components/ui/card';

interface BlockControlsProps {
  tensBlocks: number;
  onesBlocks: number;
  onAddTens: () => void;
  onAddOnes: () => void;
}

const BlockControls: React.FC<BlockControlsProps> = ({ 
  tensBlocks, 
  onesBlocks, 
  onAddTens, 
  onAddOnes 
}) => {
  return (
    <Card 
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <h3 className="font-space-grotesk text-3xl font-bold text-center mb-6 text-grade-orange">
        🧮 Number Blocks
      </h3>

      {/* Tens Blocks Control */}
      <div className="mb-8">
        <div className="font-dm-sans text-xl font-bold mb-4 text-grade-blue text-grade-body-lg">
          Add Tens Blocks:
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 2 }, (_, i) => (
            <button
              key={`tens-${i}`}
              onClick={() => {
                if (tensBlocks < 2) {
                  onAddTens();
                }
              }}
              className="cursor-pointer select-none font-dm-sans text-white font-bold
                         rounded-md border-2 border-gray-800 shadow-lg
                         transition-all duration-200 hover:scale-110 active:scale-95 
                         flex items-center justify-center"
              style={{
                backgroundColor: '#0026FF',
                width: '80px',
                height: '30px',
                fontSize: '14px'
              }}
              title="Click to add a ten block"
            >
              10
            </button>
          ))}
        </div>
      </div>

      {/* Ones Blocks Control */}
      <div className="mb-8">
        <div className="font-dm-sans text-xl font-bold mb-4 text-grade-orange text-grade-body-lg">
          Add Ones Blocks:
        </div>
        <div className="grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={`ones-${i}`}
              onClick={onAddOnes}
              className="cursor-pointer select-none font-dm-sans text-white font-bold
                         rounded-md border-2 border-gray-800 shadow-lg
                         transition-all duration-200 hover:scale-110 active:scale-95 
                         flex items-center justify-center"
              style={{
                backgroundColor: '#FF6F00',
                width: '40px',
                height: '40px',
                fontSize: '12px'
              }}
              title="Click to add a one block"
            >
              1
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BlockControls;
