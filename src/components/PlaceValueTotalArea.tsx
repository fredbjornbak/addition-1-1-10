
import React, { useState, useEffect } from 'react';
import DraggableBlock from './DraggableBlock';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';

interface PlaceValueTotalAreaProps {
  expectedTotal: number;
  onTotalChange: (total: number) => void;
  resetTrigger: number;
}

const PlaceValueTotalArea: React.FC<PlaceValueTotalAreaProps> = ({
  expectedTotal,
  onTotalChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isRegrouping, setIsRegrouping] = useState(false);

  useEffect(() => {
    setBlocks([]);
    onTotalChange(0);
  }, [resetTrigger, onTotalChange]);

  useEffect(() => {
    const total = blocks.reduce((sum, block) => sum + block.value, 0);
    onTotalChange(total);
  }, [blocks, onTotalChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetType: 'ones' | 'tens') => {
    e.preventDefault();
    const blockData = e.dataTransfer.getData('text/plain');
    
    try {
      const { value, type, sourceId } = JSON.parse(blockData);
      
      // Only allow appropriate drops
      if ((targetType === 'ones' && value === 1) || (targetType === 'tens' && value === 10)) {
        const newBlock: Block = {
          id: `total-${type}-${Date.now()}-${Math.random()}`,
          value,
          type: targetType,
          position: generatePosition(targetType, blocks.filter(b => b.type === targetType).length)
        };
        
        setBlocks(prev => [...prev, newBlock]);
        
        // Check for auto-regrouping after adding ones
        if (targetType === 'ones') {
          setTimeout(() => {
            checkForRegrouping();
          }, 100);
        }
      }
    } catch {
      // Handle legacy drag data format
      const draggedValue = parseInt(blockData) || 1;
      const blockType = draggedValue === 10 ? 'tens' : 'ones';
      
      if ((targetType === 'ones' && draggedValue === 1) || (targetType === 'tens' && draggedValue === 10)) {
        const newBlock: Block = {
          id: `total-${blockType}-${Date.now()}-${Math.random()}`,
          value: draggedValue,
          type: targetType,
          position: generatePosition(targetType, blocks.filter(b => b.type === targetType).length)
        };
        
        setBlocks(prev => [...prev, newBlock]);
        
        if (targetType === 'ones') {
          setTimeout(() => {
            checkForRegrouping();
          }, 100);
        }
      }
    }
  };

  const checkForRegrouping = () => {
    const onesCount = blocks.filter(b => b.type === 'ones').length;
    
    if (onesCount >= 10 && !isRegrouping) {
      setIsRegrouping(true);
      
      setTimeout(() => {
        setBlocks(prev => {
          const onesBlocks = prev.filter(b => b.type === 'ones');
          const tensBlocks = prev.filter(b => b.type === 'tens');
          const otherBlocks = prev.filter(b => b.type !== 'ones' && b.type !== 'tens');
          
          const newTensCount = Math.floor(onesBlocks.length / 10);
          const remainingOnes = onesBlocks.length % 10;
          
          // Create new tens blocks
          const newTensBlocks: Block[] = [];
          for (let i = 0; i < newTensCount; i++) {
            newTensBlocks.push({
              id: `total-ten-${Date.now()}-${Math.random()}-${i}`,
              value: 10,
              type: 'tens',
              position: generatePosition('tens', tensBlocks.length + i)
            });
          }
          
          // Create remaining ones blocks
          const remainingOnesBlocks: Block[] = [];
          for (let i = 0; i < remainingOnes; i++) {
            remainingOnesBlocks.push({
              id: `total-one-${Date.now()}-${Math.random()}-${i}`,
              value: 1,
              type: 'ones',
              position: generatePosition('ones', i)
            });
          }
          
          return [...otherBlocks, ...tensBlocks, ...newTensBlocks, ...remainingOnesBlocks];
        });
        
        setIsRegrouping(false);
      }, 600);
    }
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleBlockDragStart = (id: string) => {
    // Individual blocks can be rearranged within the total area
  };

  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const total = blocks.reduce((sum, block) => sum + block.value, 0);
  const isCorrect = total === expectedTotal && total > 0;

  return (
    <div 
      className={`p-4 rounded-[50px] border-4 min-h-[140px] transition-all duration-300 ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-grade-black bg-grade-gray'
      }`}
    >
      <div className="flex gap-4 h-full">
        {/* Ones Section */}
        <div className="flex-1 relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Ones</div>
          <div 
            className="relative h-24 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 hover:border-orange-400 hover:bg-orange-50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'ones')}
          >
            {onesBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                onDragStart={handleBlockDragStart}
                position={block.position}
                isGrouping={isRegrouping}
              />
            ))}
          </div>
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {onesBlocks.length}
          </div>
        </div>

        {/* Tens Section */}
        <div className="flex-1 relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Tens</div>
          <div 
            className="relative h-24 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'tens')}
          >
            {tensBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                onDragStart={handleBlockDragStart}
                position={block.position}
                isGrouping={isRegrouping}
              />
            ))}
          </div>
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {tensBlocks.length}
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mt-2 font-dm-sans text-grade-body text-grade-black">
        Total: {total}
        {isCorrect && <div className="text-green-600 font-bold">✓ Correct!</div>}
      </div>

      {/* Regrouping Message */}
      {onesBlocks.length >= 10 && !isRegrouping && (
        <div className="text-center mt-1 text-sm text-yellow-600 font-bold animate-bounce">
          Converting 10 ones to 1 ten!
        </div>
      )}
    </div>
  );
};

export default PlaceValueTotalArea;
