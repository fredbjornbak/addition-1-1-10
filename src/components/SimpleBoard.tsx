import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import PlaceValueColumn from './PlaceValueColumn';
import AnswerDisplay from './AnswerDisplay';
import { Block, SimpleBoardProps } from '../types/placeValue';
import { generatePosition, generateBundledPositions } from '../utils/blockPositions';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

const SimpleBoard: React.FC<SimpleBoardProps> = ({ 
  onAddTens,
  onAddOnes,
  userAnswer,
  onBlocksChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isGrouping, setIsGrouping] = useState(false);
  const {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver
  } = useDragAndDrop();

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setBlocks([]);
    }
  }, [resetTrigger]);

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

  const handleBlockDragStart = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      const onesCount = blocks.filter(b => b.type === 'ones').length;
      handleDragStart(block, onesCount);
    }
  };

  const handleDrop = (e: React.DragEvent, targetType: 'tens' | 'ones') => {
    e.preventDefault();
    const draggedBlockId = e.dataTransfer.getData('text/plain');
    const draggedBlock = blocks.find(b => b.id === draggedBlockId);
    
    if (!draggedBlock) return;

    // Special case: dragging ones to tens column for regrouping
    if (draggedBlock.type === 'ones' && targetType === 'tens') {
      const onesCount = blocks.filter(b => b.type === 'ones').length;
      
      if (onesCount >= 10) {
        // Automatically regroup 10 ones into 1 ten
        setIsGrouping(true);
        
        setTimeout(() => {
          const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
          const newTensCount = Math.floor(onesCount / 10);
          const remainingOnes = onesCount % 10;
          
          // Create new ten blocks
          const newTenBlocks: Block[] = [];
          for (let i = 0; i < newTensCount; i++) {
            newTenBlocks.push({
              id: `ten-${Date.now()}-${Math.random()}-${i}`,
              value: 10,
              type: 'tens',
              position: generatePosition('tens', nonOnesBlocks.filter(b => b.type === 'tens').length + i)
            });
          }
          
          // Create remaining ones blocks
          const remainingOnesBlocks: Block[] = [];
          for (let i = 0; i < remainingOnes; i++) {
            remainingOnesBlocks.push({
              id: `one-${Date.now()}-${Math.random()}-${i}`,
              value: 1,
              type: 'ones',
              position: generatePosition('ones', i)
            });
          }
          
          const newBlocks = [...nonOnesBlocks, ...newTenBlocks, ...remainingOnesBlocks];
          setBlocks(newBlocks);
          
          const tens = newBlocks.filter(b => b.type === 'tens').length;
          const ones = newBlocks.filter(b => b.type === 'ones').length;
          onBlocksChange(tens, ones);
          
          setIsGrouping(false);
        }, 600);
      }
    }
    
    handleDragEnd();
  };

  const tensCount = blocks.filter(b => b.type === 'tens').length;
  const onesCount = blocks.filter(b => b.type === 'ones').length;
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const hasBundle = onesCount >= 10;

  // Update ones block positions when bundling
  useEffect(() => {
    if (hasBundle && !isGrouping) {
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
  }, [hasBundle, isGrouping]);

  return (
    <Card 
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="grid grid-cols-2 gap-6 mb-6">
        <PlaceValueColumn
          type="tens"
          blocks={tensBlocks}
          onAddBlock={addTenBlock}
          onRemoveBlock={removeBlock}
          onDragStart={handleBlockDragStart}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          isDropTarget={dragState.isOver === 'tens'}
          isGrouping={isGrouping}
        />
        
        <PlaceValueColumn
          type="ones"
          blocks={onesBlocks}
          hasBundle={hasBundle}
          onAddBlock={addOneBlock}
          onRemoveBlock={removeBlock}
          onDragStart={handleBlockDragStart}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          isDropTarget={dragState.isOver === 'ones'}
          isGrouping={isGrouping}
        />
      </div>

      <AnswerDisplay
        userAnswer={userAnswer}
        tensCount={tensCount}
        onesCount={onesCount}
        hasBundle={hasBundle}
      />

      {/* Visual feedback for drag operations */}
      {dragState.isDragging && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50">
          Dragging {dragState.draggedBlock?.type} block
          {dragState.draggedBlock?.type === 'ones' && onesCount >= 10 && (
            <div className="text-xs">Drop on tens to regroup!</div>
          )}
        </div>
      )}
    </Card>
  );
};

export default SimpleBoard;
