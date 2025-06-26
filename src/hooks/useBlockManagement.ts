import { useState, useEffect, useRef } from 'react';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';
import { useSoundEffects } from './useSoundEffects';

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
  const [showRegroupingHint, setShowRegroupingHint] = useState(false);
  const isManualOperation = useRef(false);
  const { playAddSound } = useSoundEffects();

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      console.log('🔄 Clearing all blocks due to reset trigger');
      setBlocks([]);
      setIsDragging(false);
      setDraggedBlocks([]);
      setShowRegroupingHint(false);
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
        externalOnes: externalOnesCount,
        currentBlocks: blocks.length
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
      
      console.log('✅ Created blocks to match external counts:', {
        totalBlocks: newBlocks.length,
        tensBlocks: newBlocks.filter(b => b.type === 'tens').length,
        onesBlocks: newBlocks.filter(b => b.type === 'ones').length
      });
      setBlocks(newBlocks);
      
      // Show regrouping hint if there are 10+ ones
      setShowRegroupingHint(externalOnesCount >= 10);
    }
  }, [externalTensCount, externalOnesCount]);

  const addTenBlock = () => {
    const newBlock: Block = {
      id: `ten-${Date.now()}-${Math.random()}`,
      value: 10,
      type: 'tens',
      position: generatePosition('tens', blocks.filter(b => b.type === 'tens').length)
    };
    console.log('➕ Adding ten block:', newBlock.id);
    playAddSound('tens'); // Play sound for tens block
    setBlocks(prev => [...prev, newBlock]);
    onAddTens();
  };

  const addOneBlock = () => {
    const currentOnes = blocks.filter(b => b.type === 'ones').length;
    
    // Prevent adding if already at 10 ones - force regrouping instead
    if (currentOnes >= 10) {
      console.log('🚫 Cannot add more ones - maximum 10 allowed. Must regroup first!');
      setShowRegroupingHint(true);
      return;
    }
    
    const newBlock: Block = {
      id: `one-${Date.now()}-${Math.random()}`,
      value: 1,
      type: 'ones',
      position: generatePosition('ones', currentOnes)
    };
    
    console.log('➕ Adding one block:', newBlock.id);
    playAddSound('ones'); // Play sound for ones block
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    
    // Show regrouping hint if we now have 10 ones
    if (currentOnes + 1 === 10) {
      setShowRegroupingHint(true);
    }
    
    onAddOnes();
  };

  const removeBlock = (id: string) => {
    console.log('🗑️ Manual block removal initiated for:', id);
    
    const blockToRemove = blocks.find(block => block.id === id);
    if (!blockToRemove) {
      console.log('❌ Block not found for removal:', id);
      return;
    }
    
    // Set manual operation flag before state update
    isManualOperation.current = true;
    
    const newBlocks = blocks.filter(block => block.id !== id);
    const tens = newBlocks.filter(b => b.type === 'tens').length;
    const ones = newBlocks.filter(b => b.type === 'ones').length;
    
    console.log('✅ Block removed manually. New counts:', { tens, ones });
    
    // Update blocks immediately
    setBlocks(newBlocks);
    
    // Hide regrouping hint if ones count is now below threshold
    if (ones < 10) {
      setShowRegroupingHint(false);
    }
    
    // Always call onBlocksChange to notify parent
    onBlocksChange(tens, ones);
    
    // Clear manual operation flag after a short delay to allow state updates
    setTimeout(() => {
      isManualOperation.current = false;
      console.log('🔓 Manual operation flag cleared');
    }, 100);
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

  const hideRegroupingHint = () => {
    setShowRegroupingHint(false);
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
    completeDrag,
    showRegroupingHint,
    hideRegroupingHint
  };
};
