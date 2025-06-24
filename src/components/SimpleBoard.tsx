
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import DraggableBlock from './DraggableBlock';
import RegroupingModal from './RegroupingModal';

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
  const [showRegroupModal, setShowRegroupModal] = useState(false);

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setBlocks([]);
      setShowRegroupModal(false);
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
    
    // Check if we have exactly 10 ones after adding
    if (currentOnes + 1 === 10) {
      setTimeout(() => setShowRegroupModal(true), 500);
    }
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

  const handleRegroup = () => {
    // Remove 10 ones and add 1 ten
    const onesBlocks = blocks.filter(b => b.type === 'ones');
    const otherBlocks = blocks.filter(b => b.type !== 'ones');
    
    // Keep only the first ones block (remove 9 others) and add a ten
    const remainingOnes = onesBlocks.slice(0, 0); // Remove all ones for clean regroup
    
    const newTenBlock: Block = {
      id: `ten-${Date.now()}-${Math.random()}`,
      value: 10,
      type: 'tens',
      position: generatePosition('tens', otherBlocks.filter(b => b.type === 'tens').length)
    };
    
    setBlocks([...otherBlocks, ...remainingOnes, newTenBlock]);
    setShowRegroupModal(false);
    
    // Update parent component
    const tens = otherBlocks.filter(b => b.type === 'tens').length + 1;
    const ones = remainingOnes.length;
    onBlocksChange(tens, ones);
  };

  const tensCount = blocks.filter(b => b.type === 'tens').length;
  const onesCount = blocks.filter(b => b.type === 'ones').length;

  return (
    <>
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
            
            {/* Render one blocks */}
            {blocks
              .filter(block => block.type === 'ones')
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
        </div>

        {/* Answer Display */}
        <div className="text-center">
          <div className="font-space-grotesk text-4xl font-bold mb-2 text-grade-black">
            {userAnswer}
          </div>
          <div className="font-dm-sans text-grade-body text-grade-black">
            ({tensCount} tens + {onesCount} ones)
          </div>
        </div>
      </Card>

      <RegroupingModal
        isOpen={showRegroupModal}
        onRegroup={handleRegroup}
        onCancel={() => setShowRegroupModal(false)}
      />
    </>
  );
};

export default SimpleBoard;
