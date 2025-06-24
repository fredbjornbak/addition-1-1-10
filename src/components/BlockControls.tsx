
import React from 'react';
import { Card } from '@/components/ui/card';
import DraggableBlock from './DraggableBlock';

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
          color: '#FF6F00', 
          fontFamily: 'Space Grotesk',
          fontWeight: 700
        }}
      >
        🧮 Number Blocks
      </h3>

      {/* Tens Blocks Control */}
      <div className="mb-8">
        <div 
          className="text-xl font-bold mb-4"
          style={{ 
            color: '#0026FF', 
            fontFamily: 'DM Sans',
            fontWeight: 700,
            fontSize: '20px'
          }}
        >
          Add Tens Blocks:
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 2 }, (_, i) => (
            <DraggableBlock
              key={`tens-${i}`}
              value={10}
              type="tens"
              onClick={() => {
                if (tensBlocks < 2) {
                  onAddTens();
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Ones Blocks Control */}
      <div className="mb-8">
        <div 
          className="text-xl font-bold mb-4"
          style={{ 
            color: '#FF6F00', 
            fontFamily: 'DM Sans',
            fontWeight: 700,
            fontSize: '20px'
          }}
        >
          Add Ones Blocks:
        </div>
        <div className="grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <DraggableBlock
              key={`ones-${i}`}
              value={1}
              type="ones"
              onClick={onAddOnes}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BlockControls;
