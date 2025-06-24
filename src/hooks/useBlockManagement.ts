
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
      setBlocks([]);
    }
  }, [resetTrigger]);

  // Synchronize blocks with external counts (for cross-workspace transfers)
  useEffect(() => {
    if (externalTensCount !== undefined && externalOnesCount !== undefined) {
      const currentTens = blocks.filter(b => b.type === 'tens').length;
      const currentOnes = blocks.filter(b => b.type === 'ones').length;
      
      // Only sync if counts have changed
      if (currentTens !== externalTensCount || currentOnes !== externalOnesCount) {
        console.log('🔄 Syncing blocks with external counts:', {
          current: { tens: currentTens, ones: currentOnes },
          target: { tens: externalTensCount, ones: externalOnesCount }
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
        
        setBlocks(newBlocks);
        console.log('✅ Blocks synchronized:', newBlocks.length, 'total blocks');
      }
    }
  }, [externalTensCount, externalOnesCount, blocks]);

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

  return {
    blocks,
    setBlocks,
    addTenBlock,
    addOneBlock,
    removeBlock
  };
};
