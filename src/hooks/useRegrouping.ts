
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
    console.log('🔄 Regrouping triggered:', { 
      draggedBlockType: draggedBlock.type, 
      targetType,
      totalOnes: blocks.filter(b => b.type === 'ones').length,
      totalTens: blocks.filter(b => b.type === 'tens').length
    });

    // Simple ones to tens conversion: any ones block dragged to tens converts 10 ones to 1 ten
    if (draggedBlock.type === 'ones' && targetType === 'tens') {
      const onesCount = blocks.filter(b => b.type === 'ones').length;
      
      if (onesCount >= 10) {
        console.log('✅ Converting 10 ones to 1 ten');
        setIsGrouping(true);
        
        setTimeout(() => {
          const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
          const currentTensCount = nonOnesBlocks.filter(b => b.type === 'tens').length;
          
          // Convert exactly 10 ones to 1 ten
          const remainingOnes = onesCount - 10;
          const totalTens = currentTensCount + 1;
          
          console.log('🔢 Conversion result:', {
            originalOnes: onesCount,
            remainingOnes,
            totalTens
          });
          
          // Create new tens blocks
          const newTenBlocks: Block[] = [];
          for (let i = 0; i < totalTens; i++) {
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
          
          setBlocks(newBlocks);
          onBlocksChange(totalTens, remainingOnes);
          setIsGrouping(false);
        }, 300);
      } else {
        console.log('❌ Need at least 10 ones to convert to tens');
      }
    }
    
    // Simple tens to ones conversion: dragged ten becomes 10 ones
    else if (draggedBlock.type === 'tens' && targetType === 'ones') {
      console.log('✅ Converting 1 ten to 10 ones');
      setIsGrouping(true);
      
      setTimeout(() => {
        // Remove the specific dragged tens block
        const remainingBlocks = blocks.filter(b => b.id !== draggedBlock.id);
        const currentOnesCount = remainingBlocks.filter(b => b.type === 'ones').length;
        const remainingTensCount = remainingBlocks.filter(b => b.type === 'tens').length;
        
        // Add 10 ones for the converted ten
        const totalOnes = currentOnesCount + 10;
        
        console.log('🔢 Conversion result:', {
          totalOnes,
          remainingTens: remainingTensCount
        });
        
        // Create new ones blocks
        const newOnesBlocks: Block[] = [];
        for (let i = 0; i < totalOnes; i++) {
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
        
        setBlocks(newBlocks);
        onBlocksChange(remainingTensCount, totalOnes);
        setIsGrouping(false);
      }, 300);
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
