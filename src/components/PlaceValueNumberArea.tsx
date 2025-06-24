
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
      className="p-4 rounded-[50px] border-4 min-h-[200px] cursor-pointer transition-all duration-300"
      style={{ backgroundColor, borderColor }}
      onClick={addBlock}
    >
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Tens Section */}
        <div className="relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center font-bold">Tens</div>
          <div className="relative h-32 border-2 border-dashed border-gray-300 rounded-lg bg-blue-25">
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
          <div className="text-sm text-center mt-2 font-dm-sans text-grade-black font-bold">
            {tensCount}
          </div>
        </div>

        {/* Ones Section */}
        <div className="relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center font-bold">Ones</div>
          <div 
            className={`relative h-32 border-2 border-dashed border-gray-300 rounded-lg bg-orange-25 transition-all duration-300 ${
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
          <div className="text-sm text-center mt-2 font-dm-sans text-grade-black font-bold">
            {onesCount}
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mt-4 font-dm-sans text-grade-body text-grade-black">
        <div className="font-bold">{currentTotal} / {number}</div>
        <div className="text-xs text-gray-500 mt-1">Click to add blocks</div>
      </div>

      {/* Regrouping Message */}
      {shouldHighlightOnes && (
        <div className="text-center mt-2 text-sm text-yellow-600 font-bold animate-bounce">
          10 ones will become 1 ten!
        </div>
      )}
    </div>
  );
};

export default PlaceValueNumberArea;
