
import React, { useState, useEffect } from 'react';
import DraggableBlock from './DraggableBlock';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';
import { useRegrouping } from '../hooks/useRegrouping';

interface PlaceValueNumberAreaProps {
  number: number;
  backgroundColor: string;
  borderColor: string;
  resetTrigger: number;
  onDragStart: (totalBlocks: number) => void;
}

const PlaceValueNumberArea: React.FC<PlaceValueNumberAreaProps> = ({
  number,
  backgroundColor,
  borderColor,
  resetTrigger,
  onDragStart
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [onesCount, setOnesCount] = useState(0);
  const [tensCount, setTensCount] = useState(0);

  useEffect(() => {
    setBlocks([]);
    setOnesCount(0);
    setTensCount(0);
  }, [resetTrigger]);

  const handleBlocksChange = (tens: number, ones: number) => {
    setTensCount(tens);
    setOnesCount(ones);
  };

  const { isGrouping, handleRegroup } = useRegrouping(blocks, setBlocks, handleBlocksChange);

  const addBlock = () => {
    const totalBlocks = onesCount + (tensCount * 10);
    if (totalBlocks < number) {
      const newBlock: Block = {
        id: `one-${Date.now()}-${Math.random()}`,
        value: 1,
        type: 'ones',
        position: generatePosition('ones', onesCount)
      };
      
      const newBlocks = [...blocks, newBlock];
      setBlocks(newBlocks);
      setOnesCount(prev => prev + 1);
      
      // Check for regrouping after a delay
      setTimeout(() => {
        if (onesCount + 1 >= 10) {
          handleRegroup(newBlock, 'tens');
        }
      }, 100);
    }
  };

  // Remove the area-level drag functionality - we want individual block dragging only
  const handleAreaDragStart = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent area dragging
  };

  const removeBlock = (id: string) => {
    const blockToRemove = blocks.find(b => b.id === id);
    if (blockToRemove) {
      const newBlocks = blocks.filter(b => b.id !== id);
      setBlocks(newBlocks);
      
      if (blockToRemove.type === 'ones') {
        setOnesCount(prev => prev - 1);
      } else {
        setTensCount(prev => prev - 1);
      }
    }
  };

  const handleBlockDragStart = (id: string) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      onDragStart(block.value);
    }
  };

  const currentTotal = onesCount + (tensCount * 10);
  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const shouldHighlightOnes = onesCount >= 10 && !isGrouping;

  return (
    <div 
      className="p-4 rounded-[50px] border-4 min-h-[140px] cursor-pointer transition-all duration-300"
      style={{ backgroundColor, borderColor }}
      onClick={addBlock}
      onDragStart={handleAreaDragStart}
    >
      <div className="flex gap-4 h-full">
        {/* Ones Section */}
        <div className="flex-1 relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Ones</div>
          <div 
            className={`relative h-24 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 ${
              shouldHighlightOnes ? 'border-yellow-400 bg-yellow-50 animate-pulse' : ''
            }`}
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
                shouldVibrate={shouldHighlightOnes}
                isGrouping={isGrouping}
              />
            ))}
          </div>
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {onesCount}
          </div>
        </div>

        {/* Tens Section */}
        <div className="flex-1 relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Tens</div>
          <div className="relative h-24 border-2 border-dashed border-gray-300 rounded-lg">
            {tensBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                onDragStart={handleBlockDragStart}
                position={block.position}
                isGrouping={isGrouping}
              />
            ))}
          </div>
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {tensCount}
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mt-2 font-dm-sans text-grade-body text-grade-black">
        {currentTotal} / {number}
      </div>

      {/* Regrouping Message */}
      {shouldHighlightOnes && (
        <div className="text-center mt-1 text-sm text-yellow-600 font-bold animate-bounce">
          10 ones will become 1 ten!
        </div>
      )}
    </div>
  );
};

export default PlaceValueNumberArea;
