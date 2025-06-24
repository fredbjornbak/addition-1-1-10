
import { useState, useEffect } from 'react';
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

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      console.log('🔄 Clearing all blocks due to reset trigger');
      setBlocks([]);
    }
  }, [resetTrigger]);

  // Synchronize blocks with external counts (for cross-workspace transfers)
  useEffect(() => {
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
    console.log('🗑️ Removing block with ID:', id);
    setBlocks(prev => {
      const blockToRemove = prev.find(block => block.id === id);
      if (!blockToRemove) {
        console.log('❌ Block not found for removal:', id);
        return prev;
      }
      
      const newBlocks = prev.filter(block => block.id !== id);
      const tens = newBlocks.filter(b => b.type === 'tens').length;
      const ones = newBlocks.filter(b => b.type === 'ones').length;
      
      console.log('✅ Block removed. New counts:', { tens, ones });
      onBlocksChange(tens, ones);
      return newBlocks;
    });
  };

  return {
    blocks,
    setBlocks,
    addTenBlock,
    addOneBlock,
    removeBlock
  };
};
