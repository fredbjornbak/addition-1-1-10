
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import PlaceValueColumn from './PlaceValueColumn';
import AnswerDisplay from './AnswerDisplay';
import DragFeedback from './DragFeedback';
import { SimpleBoardProps } from '../types/placeValue';
import { generateBundledPositions } from '../utils/blockPositions';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useBlockManagement } from '../hooks/useBlockManagement';
import { useRegrouping } from '../hooks/useRegrouping';

interface ExtendedSimpleBoardProps extends SimpleBoardProps {
  workspaceId?: string;
}

const SimpleBoard: React.FC<ExtendedSimpleBoardProps> = ({ 
  onAddTens,
  onAddOnes,
  userAnswer,
  onBlocksChange,
  resetTrigger,
  workspaceId = 'default'
}) => {
  const {
    blocks,
    setBlocks,
    addTenBlock,
    addOneBlock,
    removeBlock
  } = useBlockManagement(onAddTens, onAddOnes, onBlocksChange, resetTrigger);

  const { isGrouping, handleRegroup } = useRegrouping(blocks, setBlocks, onBlocksChange);

  const {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver
  } = useDragAndDrop();

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

    handleRegroup(draggedBlock, targetType);
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
  }, [hasBundle, isGrouping, setBlocks]);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
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
          workspaceId={workspaceId}
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
          workspaceId={workspaceId}
        />
      </div>

      <DragFeedback dragState={dragState} onesCount={onesCount} />
    </div>
  );
};

export default SimpleBoard;
