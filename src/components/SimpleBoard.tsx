
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import DraggableBlock from './DraggableBlock';

interface Block {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  position: { x: number; y: number };
}

interface SimpleBoardProps {
  tensBlocks: number;
  onesBlocks: number;
  onAddTens: () => void;
  onAddOnes: () => void;
  userAnswer: number;
  onBlocksChange: (tens: number, ones: number) => void;
  resetTrigger: number;
}

const SimpleBoard: React.FC<SimpleBoardProps> = ({ 
  onAddTens,
  onAddOnes,
  userAnswer,
  onBlocksChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setBlocks([]);
    }
  }, [resetTrigger]);

  // Generate random position within column bounds
  const generatePosition = (type: 'tens' | 'ones', index: number) => {
    const columnWidth = 250;
    const maxX = type === 'tens' ? columnWidth - 80 : columnWidth - 40;
    const maxY = 200;
    
    // Arrange in a loose grid pattern
    const cols = type === 'tens' ? 2 : 5;
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    return {
      x: (col * (maxX / cols)) + Math.random() * 20,
      y: (row * 45) + Math.random() * 15
    };
  };

  // Generate bundled positions for 10 ones blocks
  const generateBundledPositions = () => {
    const positions = [];
    for (let i = 0; i < 10; i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      positions.push({
        x: 50 + (col * 35),
        y: 80 + (row * 35)
      });
    }
    return positions;
  };

  const addTenBlock = () => {
    const newBlock: Block = {
      id: `ten-${Date.now()}-${Math.random()}`,
      value: 10,
      type: 'tens',
      position: generatePosition('tens', blocks.filter(b => b.type === 'tens').length)
    };
    setBlocks(prev => [...prev, newBlock]);
    onAddTens();
  };

  const addOneBlock = () => {
    const currentOnes = blocks.filter(b => b.type === 'ones').length;
    
    const newBlock: Block = {
      id: `one-${Date.now()}-${Math.random()}`,
      value: 1,
      type: 'ones',
      position: generatePosition('ones', currentOnes)
    };
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onAddOnes();
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => {
      const newBlocks = prev.filter(block => block.id !== id);
      const tens = newBlocks.filter(b => b.type === 'tens').length;
      const ones = newBlocks.filter(b => b.type === 'ones').length;
      onBlocksChange(tens, ones);
      return newBlocks;
    });
  };

  const handleBundleClick = () => {
    // Remove all 10 ones and add 1 ten
    const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
    
    const newTenBlock: Block = {
      id: `ten-${Date.now()}-${Math.random()}`,
      value: 10,
      type: 'tens',
      position: generatePosition('tens', nonOnesBlocks.filter(b => b.type === 'tens').length)
    };
    
    setBlocks([...nonOnesBlocks, newTenBlock]);
    
    // Update parent component
    const tens = nonOnesBlocks.filter(b => b.type === 'tens').length + 1;
    onBlocksChange(tens, 0);
  };

  const tensCount = blocks.filter(b => b.type === 'tens').length;
  const onesCount = blocks.filter(b => b.type === 'ones').length;
  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const hasBundle = onesCount === 10;

  // Update ones block positions when bundling
  useEffect(() => {
    if (hasBundle) {
      const bundledPositions = generateBundledPositions();
      setBlocks(prev => prev.map((block, index) => {
        if (block.type === 'ones') {
          const onesIndex = prev.filter(b => b.type === 'ones').indexOf(block);
          return {
            ...block,
            position: bundledPositions[onesIndex] || block.position
          };
        }
        return block;
      }));
    }
  }, [hasBundle]);

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
          onClick={addTenBlock}
          className="relative rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
          
          {/* Render ten blocks */}
          {blocks
            .filter(block => block.type === 'tens')
            .map(block => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                position={block.position}
              />
            ))
          }
        </button>

        {/* Ones Column - Clickable */}
        <button
          onClick={addOneBlock}
          className="relative rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
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
          
          {/* Bundle container when we have exactly 10 ones */}
          {hasBundle && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleBundleClick();
              }}
              className="absolute bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-dashed border-purple-500 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
              style={{
                left: '40px',
                top: '70px',
                width: '180px',
                height: '100px',
                zIndex: 10
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-700 font-bold">
                <div className="text-lg">🔄 Click to</div>
                <div className="text-sm">Make 1 Ten!</div>
              </div>
            </div>
          )}
          
          {/* Render one blocks */}
          {onesBlocks.map(block => (
            <DraggableBlock
              key={block.id}
              id={block.id}
              value={block.value}
              type={block.type}
              onRemove={hasBundle ? () => {} : removeBlock} // Disable individual removal when bundled
              position={block.position}
            />
          ))}
        </button>
      </div>

      {/* Answer Display */}
      <div className="text-center">
        <div className="font-space-grotesk text-4xl font-bold mb-2 text-grade-black">
          {userAnswer}
        </div>
        <div className="font-dm-sans text-grade-body text-grade-black">
          ({tensCount} tens + {onesCount} ones)
        </div>
        {hasBundle && (
          <div className="font-dm-sans text-sm text-purple-600 mt-2 animate-bounce">
            💡 You have 10 ones! Click the purple area to bundle them into 1 ten!
          </div>
        )}
      </div>
    </Card>
  );
};

export default SimpleBoard;
