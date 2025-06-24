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
      
      // Allow regrouping when there are ANY ones blocks
      if (onesCount > 0) {
        console.log('🔄 Starting regrouping with', onesCount, 'ones blocks');
        setIsGrouping(true);
        
        setTimeout(() => {
          const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
          const currentTensCount = nonOnesBlocks.filter(b => b.type === 'tens').length;
          
          // Convert every 10 ones into 1 ten, keep remainder as ones
          const newTensFromOnes = Math.floor(onesCount / 10);
          const remainingOnes = onesCount % 10;
          const totalNewTens = currentTensCount + newTensFromOnes;
          
          console.log('🔢 Regrouping calculation:', {
            originalOnes: onesCount,
            newTensFromOnes,
            remainingOnes,
            totalNewTens
          });
          
          // Create new ten blocks
          const newTenBlocks: Block[] = [];
          for (let i = 0; i < totalNewTens; i++) {
            newTenBlocks.push({
              id: `ten-${Date.now()}-${Math.random()}-${i}`,
              value: 10,
              type: 'tens',
              position: generatePosition('tens', i)
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
          
          const newBlocks = [...nonOnesBlocks.filter(b => b.type !== 'tens'), ...newTenBlocks, ...remainingOnesBlocks];
          console.log('✅ Regrouping complete:', {
            totalTens: totalNewTens,
            remainingOnes: remainingOnes,
            totalBlocks: newBlocks.length
          });
          
          setBlocks(newBlocks);
          onBlocksChange(totalNewTens, remainingOnes);
          setIsGrouping(false);
        }, 600);
      }
    }
  };

  const canRegroup = () => {
    const onesCount = blocks.filter(b => b.type === 'ones').length;
    return onesCount >= 10;
  };

  return {
    isGrouping,
    handleRegroup,
    canRegroup
  };
};
