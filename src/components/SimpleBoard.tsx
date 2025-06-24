
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import PlaceValueColumn from './PlaceValueColumn';
import AnswerDisplay from './AnswerDisplay';
import { Block, SimpleBoardProps } from '../types/placeValue';
import { generatePosition, generateBundledPositions } from '../utils/blockPositions';
import { useBundleAnimation } from '../hooks/useBundleAnimation';

const SimpleBoard: React.FC<SimpleBoardProps> = ({ 
  onAddTens,
  onAddOnes,
  userAnswer,
  onBlocksChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { 
    bundleState, 
    isAnimating, 
    startBundleAnimation, 
    startVibrating, 
    stopVibrating 
  } = useBundleAnimation();

  // Clear all blocks when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setBlocks([]);
      stopVibrating();
    }
  }, [resetTrigger, stopVibrating]);

  const addTenBlock = () => {
    if (isAnimating) return;
    
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
    if (isAnimating) return;
    
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
    if (isAnimating) return;
    
    setBlocks(prev => {
      const newBlocks = prev.filter(block => block.id !== id);
      const tens = newBlocks.filter(b => b.type === 'tens').length;
      const ones = newBlocks.filter(b => b.type === 'ones').length;
      onBlocksChange(tens, ones);
      return newBlocks;
    });
  };

  const handleBundleClick = () => {
    if (isAnimating) return;
    
    startBundleAnimation(() => {
      // Remove all 10 ones and add 1 ten after animation completes
      const nonOnesBlocks = blocks.filter(b => b.type !== 'ones');
      
      const newTenBlock: Block = {
        id: `ten-${Date.now()}-${Math.random()}`,
        value: 10,
        type: 'tens',
        position: generatePosition('tens', nonOnesBlocks.filter(b => b.type === 'tens').length)
      };
      
      setBlocks([...nonOnesBlocks, newTenBlock]);
      
      // Update parent component
      const tens = nonOnesBlocks.filter(b => b.type === 'tens').length + 1;
      onBlocksChange(tens, 0);
    });
  };

  const tensCount = blocks.filter(b => b.type === 'tens').length;
  const onesCount = blocks.filter(b => b.type === 'ones').length;
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const hasBundle = onesCount === 10;

  // Update ones block positions when bundling and handle vibration
  useEffect(() => {
    if (hasBundle && !isAnimating) {
      // Start vibrating when 10 ones are present
      startVibrating();
      
      // Position blocks in bundle formation
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
    } else if (!hasBundle) {
      stopVibrating();
    }
  }, [hasBundle, isAnimating, startVibrating, stopVibrating]);

  return (
    <Card 
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="grid grid-cols-2 gap-6 mb-6">
        <PlaceValueColumn
          type="tens"
          blocks={tensBlocks}
          bundleState={bundleState}
          onAddBlock={addTenBlock}
          onRemoveBlock={removeBlock}
        />
        
        <PlaceValueColumn
          type="ones"
          blocks={onesBlocks}
          hasBundle={hasBundle}
          bundleState={bundleState}
          onAddBlock={addOneBlock}
          onRemoveBlock={removeBlock}
          onBundleClick={handleBundleClick}
        />
      </div>

      <AnswerDisplay
        userAnswer={userAnswer}
        tensCount={tensCount}
        onesCount={onesCount}
        hasBundle={hasBundle}
      />
    </Card>
  );
};

export default SimpleBoard;
