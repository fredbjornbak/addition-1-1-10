
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
    // Ones to Tens conversion (every 10 ones becomes 1 ten)
    if (draggedBlock.type === 'ones' && targetType === 'tens') {
      const onesCount = blocks.filter(b => b.type === 'ones').length;
      
      if (onesCount >= 10) {
        console.log('🔄 Starting ones-to-tens regrouping with', onesCount, 'ones blocks');
        setIsGrouping(true);
        
        setTimeout(() => {
          const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
          const currentTensCount = nonOnesBlocks.filter(b => b.type === 'tens').length;
          
          const newTensFromOnes = Math.floor(onesCount / 10);
          const remainingOnes = onesCount % 10;
          const totalNewTens = currentTensCount + newTensFromOnes;
          
          console.log('🔢 Ones-to-tens calculation:', {
            originalOnes: onesCount,
            newTensFromOnes,
            remainingOnes,
            totalNewTens
          });
          
          const newTenBlocks: Block[] = [];
          for (let i = 0; i < totalNewTens; i++) {
            newTenBlocks.push({
              id: `ten-${Date.now()}-${Math.random()}-${i}`,
              value: 10,
              type: 'tens',
              position: generatePosition('tens', i)
            });
          }
          
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
          console.log('✅ Ones-to-tens complete:', {
            totalTens: totalNewTens,
            remainingOnes: remainingOnes
          });
          
          setBlocks(newBlocks);
          onBlocksChange(totalNewTens, remainingOnes);
          setIsGrouping(false);
        }, 600);
      }
    }
    
    // Tens to Ones conversion (1 ten becomes 10 ones)
    else if (draggedBlock.type === 'tens' && targetType === 'ones') {
      console.log('🔄 Starting tens-to-ones regrouping for block:', draggedBlock.id);
      setIsGrouping(true);
      
      setTimeout(() => {
        // Remove only the specific dragged tens block
        const remainingBlocks = blocks.filter(b => b.id !== draggedBlock.id);
        const currentOnesCount = remainingBlocks.filter(b => b.type === 'ones').length;
        const remainingTensCount = remainingBlocks.filter(b => b.type === 'tens').length;
        
        // Add 10 new ones blocks for the converted ten
        const newOnesFromTen = 10;
        const totalNewOnes = currentOnesCount + newOnesFromTen;
        
        console.log('🔢 Tens-to-ones calculation:', {
          draggedTenId: draggedBlock.id,
          currentOnes: currentOnesCount,
          newOnesFromTen,
          totalNewOnes,
          remainingTens: remainingTensCount
        });
        
        // Create new ones blocks
        const newOnesBlocks: Block[] = [];
        for (let i = 0; i < totalNewOnes; i++) {
          newOnesBlocks.push({
            id: `one-${Date.now()}-${Math.random()}-${i}`,
            value: 1,
            type: 'ones',
            position: generatePosition('ones', i)
          });
        }
        
        const newBlocks = [
          ...remainingBlocks.filter(b => b.type !== 'ones'), 
          ...newOnesBlocks
        ];
        
        console.log('✅ Tens-to-ones complete:', {
          totalOnes: totalNewOnes,
          remainingTens: remainingTensCount
        });
        
        setBlocks(newBlocks);
        onBlocksChange(remainingTensCount, totalNewOnes);
        setIsGrouping(false);
      }, 600);
    }
  };

  const canRegroup = () => {
    const onesCount = blocks.filter(b => b.type === 'ones').length;
    const tensCount = blocks.filter(b => b.type === 'tens').length;
    return onesCount >= 10 || tensCount > 0;
  };

  const canRegroupOnestoTens = () => {
    const onesCount = blocks.filter(b => b.type === 'ones').length;
    return onesCount >= 10;
  };

  const canRegroupTensToOnes = () => {
    const tensCount = blocks.filter(b => b.type === 'tens').length;
    return tensCount > 0;
  };

  return {
    isGrouping,
    handleRegroup,
    canRegroup,
    canRegroupOnestoTens,
    canRegroupTensToOnes
  };
};
