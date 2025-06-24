
import { useState, useEffect, useRef } from 'react';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';

export const useBlockManagement = (
  onAddTens: () => void,
  onAddOnes: () => void,
  onBlocksChange: (tens: number, ones: number) => void,
  resetTrigger: number,
  externalTensCount?: number,
  externalOnesCount?: number
) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBlocks, setDraggedBlocks] = useState<Block[]>([]);
  const isManualOperation = useRef(false);

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      console.log('🔄 Clearing all blocks due to reset trigger');
      setBlocks([]);
      setIsDragging(false);
      setDraggedBlocks([]);
    }
  }, [resetTrigger]);

  // Synchronize blocks with external counts (for cross-workspace transfers)
  useEffect(() => {
    // Skip sync during manual operations
    if (isManualOperation.current) {
      console.log('⏸️ Skipping external sync during manual operation');
      return;
    }

    if (externalTensCount !== undefined && externalOnesCount !== undefined) {
      console.log('🔄 Syncing blocks with external counts:', {
        externalTens: externalTensCount,
        externalOnes: externalOnesCount
      });
      
      const newBlocks: Block[] = [];
      
      // Create tens blocks
      for (let i = 0; i < externalTensCount; i++) {
        newBlocks.push({
          id: `ten-${Date.now()}-${Math.random()}-${i}`,
          value: 10,
          type: 'tens',
          position: generatePosition('tens', i)
        });
      }
      
      // Create ones blocks
      for (let i = 0; i < externalOnesCount; i++) {
        newBlocks.push({
          id: `one-${Date.now()}-${Math.random()}-${i}`,
          value: 1,
          type: 'ones',
          position: generatePosition('ones', i)
        });
      }
      
      console.log('✅ Setting blocks to match external counts:', newBlocks.length, 'total blocks');
      setBlocks(newBlocks);
    }
  }, [externalTensCount, externalOnesCount]);

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
    console.log('🗑️ Manual block removal initiated for:', id);
    isManualOperation.current = true;
    
    setBlocks(prev => {
      const blockToRemove = prev.find(block => block.id === id);
      if (!blockToRemove) {
        console.log('❌ Block not found for removal:', id);
        return prev;
      }
      
      const newBlocks = prev.filter(block => block.id !== id);
      const tens = newBlocks.filter(b => b.type === 'tens').length;
      const ones = newBlocks.filter(b => b.type === 'ones').length;
      
      console.log('✅ Block removed manually. New counts:', { tens, ones });
      onBlocksChange(tens, ones);
      
      // Clear manual operation flag after state update
      setTimeout(() => {
        isManualOperation.current = false;
      }, 100);
      
      return newBlocks;
    });
  };

  const startDrag = (blockType: 'tens' | 'ones') => {
    console.log('🚀 Starting drag for all', blockType, 'blocks');
    const blocksOfType = blocks.filter(b => b.type === blockType);
    setIsDragging(true);
    setDraggedBlocks(blocksOfType);
    
    // Visually hide the dragged blocks
    setBlocks(prev => prev.map(block => 
      block.type === blockType 
        ? { ...block, isBeingDragged: true } 
        : block
    ));
  };

  const cancelDrag = () => {
    console.log('❌ Drag cancelled, restoring blocks');
    setIsDragging(false);
    setDraggedBlocks([]);
    
    // Restore visibility of all blocks
    setBlocks(prev => prev.map(block => ({ ...block, isBeingDragged: false })));
  };

  const completeDrag = () => {
    console.log('✅ Drag completed successfully');
    setIsDragging(false);
    setDraggedBlocks([]);
  };

  return {
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
  };
};
