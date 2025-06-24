
import { useState } from 'react';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';

export const useRegrouping = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  onBlocksChange: (tens: number, ones: number) => void
) => {
  const [isGrouping, setIsGrouping] = useState(false);

  const handleRegroup = (draggedBlock: Block, targetType: 'tens' | 'ones') => {
    if (draggedBlock.type === 'ones' && targetType === 'tens') {
      const onesCount = blocks.filter(b => b.type === 'ones').length;
      
      if (onesCount >= 10) {
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
  };

  return {
    isGrouping,
    handleRegroup
  };
};
