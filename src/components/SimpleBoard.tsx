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
  externalTensCount?: number;
  externalOnesCount?: number;
}

const SimpleBoard: React.FC<ExtendedSimpleBoardProps> = ({
  onAddTens,
  onAddOnes,
  userAnswer,
  onBlocksChange,
  resetTrigger,
  workspaceId = 'default',
  externalTensCount,
  externalOnesCount
}) => {
  const {
    blocks,
    setBlocks,
    addTenBlock,
    addOneBlock,
    removeBlock,
    isDragging,
    draggedBlocks,
    startDrag,
    cancelDrag,
    completeDrag
  } = useBlockManagement(onAddTens, onAddOnes, onBlocksChange, resetTrigger, externalTensCount, externalOnesCount);
  
  const {
    isGrouping,
    handleRegroup,
    canRegroup,
    canRegroupOnestoTens,
    canRegroupTensToOnes
  } = useRegrouping(blocks, setBlocks, onBlocksChange);
  
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
      console.log('🚀 Simple drag start for block:', blockId, block.type);
      handleDragStart(block, 0); // Remove bulk drag logic
    }
  };

  const handleDrop = (e: React.DragEvent, targetType: 'tens' | 'ones') => {
    e.preventDefault();
    const draggedBlockId = e.dataTransfer.getData('text/plain');
    const draggedBlock = blocks.find(b => b.id === draggedBlockId);
    
    if (!draggedBlock) {
      console.log('❌ No dragged block found');
      handleDragEnd();
      return;
    }

    console.log('🎯 Drop detected:', {
      draggedBlockType: draggedBlock.type,
      targetType,
      blockId: draggedBlockId
    });

    // Only trigger regrouping for cross-type drops
    if (draggedBlock.type !== targetType) {
      console.log('🔄 Cross-type drop - triggering regrouping');
      handleRegroup(draggedBlock, targetType);
    } else {
      console.log('ℹ️ Same-type drop - no regrouping needed');
    }
    
    handleDragEnd();
  };

  const handleDragCancel = () => {
    handleDragEnd();
    cancelDrag();
  };

  // Cancel drag on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDragging) {
        handleDragCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDragging]);

  const tensCount = blocks.filter(b => b.type === 'tens').length;
  const onesCount = blocks.filter(b => b.type === 'ones').length;
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const hasBundle = onesCount >= 10;

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
          canRegroupOnestoTens={canRegroupOnestoTens()}
          canRegroupTensToOnes={canRegroupTensToOnes()}
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
          canRegroupOnestoTens={canRegroupOnestoTens()}
          canRegroupTensToOnes={canRegroupTensToOnes()}
        />
      </div>

      <DragFeedback dragState={dragState} onesCount={onesCount} tensCount={tensCount} draggedBlocks={draggedBlocks} />
    </div>
  );
};

export default SimpleBoard;
