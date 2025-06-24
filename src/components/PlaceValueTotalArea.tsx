
import React, { useState, useEffect } from 'react';
import DraggableBlock from './DraggableBlock';
import { Block } from '../types/placeValue';
import { generatePosition } from '../utils/blockPositions';

interface PlaceValueTotalAreaProps {
  expectedTotal: number;
  onTotalChange: (total: number) => void;
  resetTrigger: number;
}

const PlaceValueTotalArea: React.FC<PlaceValueTotalAreaProps> = ({
  expectedTotal,
  onTotalChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isRegrouping, setIsRegrouping] = useState(false);
  const [dragOver, setDragOver] = useState<'ones' | 'tens' | null>(null);

  useEffect(() => {
    setBlocks([]);
    onTotalChange(0);
  }, [resetTrigger, onTotalChange]);

  useEffect(() => {
    const total = blocks.reduce((sum, block) => sum + block.value, 0);
    onTotalChange(total);
  }, [blocks, onTotalChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, targetType: 'ones' | 'tens') => {
    e.preventDefault();
    setDragOver(targetType);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only remove hover state if leaving the container entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOver(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetType: 'ones' | 'tens') => {
    e.preventDefault();
    setDragOver(null);
    
    const blockData = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('application/json');
    console.log('Drop received data:', blockData);
    
    if (!blockData) return;
    
    try {
      const parsedData = JSON.parse(blockData);
      const { value, type, blockValue, blockType } = parsedData;
      
      // Use blockValue/blockType if available, fallback to value/type
      const actualValue = blockValue || value;
      const actualType = blockType || type;
      
      console.log('Parsed drop data:', { actualValue, actualType, targetType });
      
      // Strict validation: ones blocks (value=1) only in ones area, tens blocks (value=10) only in tens area
      const isValidDrop = (targetType === 'ones' && actualValue === 1) || 
                         (targetType === 'tens' && actualValue === 10);
      
      if (isValidDrop) {
        const existingBlocks = blocks.filter(b => b.type === targetType);
        const newBlock: Block = {
          id: `total-${targetType}-${Date.now()}-${Math.random()}`,
          value: actualValue,
          type: targetType,
          position: generatePosition(targetType, existingBlocks.length)
        };
        
        console.log('Adding new block:', newBlock);
        setBlocks(prev => [...prev, newBlock]);
        
        // Check for auto-conversion after adding ones
        if (targetType === 'ones') {
          setTimeout(() => {
            checkForAutoConversion();
          }, 100);
        }
      } else {
        console.log('Invalid drop - wrong type for target area');
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
      
      // Handle legacy drag data format
      const draggedValue = parseInt(blockData) || 1;
      
      if ((targetType === 'ones' && draggedValue === 1) || (targetType === 'tens' && draggedValue === 10)) {
        const existingBlocks = blocks.filter(b => b.type === targetType);
        const newBlock: Block = {
          id: `total-${targetType}-${Date.now()}-${Math.random()}`,
          value: draggedValue,
          type: targetType,
          position: generatePosition(targetType, existingBlocks.length)
        };
        
        setBlocks(prev => [...prev, newBlock]);
        
        if (targetType === 'ones') {
          setTimeout(() => {
            checkForAutoConversion();
          }, 100);
        }
      }
    }
  };

  const checkForAutoConversion = () => {
    setBlocks(current => {
      const onesBlocks = current.filter(b => b.type === 'ones');
      const tensBlocks = current.filter(b => b.type === 'tens');
      
      if (onesBlocks.length >= 10 && !isRegrouping) {
        console.log('Auto-conversion triggered for', onesBlocks.length, 'ones blocks');
        setIsRegrouping(true);
        
        // Convert 10 ones to 1 ten
        const groupsOfTen = Math.floor(onesBlocks.length / 10);
        const remainingOnes = onesBlocks.length % 10;
        
        setTimeout(() => {
          const newTensBlocks: Block[] = [];
          for (let i = 0; i < groupsOfTen; i++) {
            newTensBlocks.push({
              id: `total-ten-converted-${Date.now()}-${i}`,
              value: 10,
              type: 'tens',
              position: generatePosition('tens', tensBlocks.length + i)
            });
          }
          
          const remainingOnesBlocks: Block[] = [];
          for (let i = 0; i < remainingOnes; i++) {
            remainingOnesBlocks.push({
              id: `total-one-remaining-${Date.now()}-${i}`,
              value: 1,
              type: 'ones',
              position: generatePosition('ones', i)
            });
          }
          
          console.log('Conversion complete:', { newTensBlocks: newTensBlocks.length, remainingOnes });
          setBlocks([...tensBlocks, ...newTensBlocks, ...remainingOnesBlocks]);
          setIsRegrouping(false);
        }, 800);
        
        return current; // Return current state while animation plays
      }
      
      return current;
    });
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleBlockDragStart = (id: string) => {
    // Individual blocks can be rearranged within the total area
  };

  const onesBlocks = blocks.filter(b => b.type === 'ones');
  const tensBlocks = blocks.filter(b => b.type === 'tens');
  const total = blocks.reduce((sum, block) => sum + block.value, 0);
  const isCorrect = total === expectedTotal && total > 0;

  return (
    <div 
      className={`p-6 rounded-[50px] border-4 min-h-[400px] transition-all duration-300 ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-grade-black bg-grade-gray'
      }`}
    >
      <div className="text-center mb-6">
        <div className="font-dm-sans text-2xl font-bold text-grade-black">Total</div>
      </div>

      <div className="space-y-6">
        {/* Tens Section */}
        <div className="relative">
          <div className="text-lg font-dm-sans text-grade-black mb-3 text-center font-bold">Tens</div>
          <div 
            className={`relative h-48 border-4 border-dashed rounded-lg transition-all duration-300 ${
              dragOver === 'tens' 
                ? 'border-blue-500 bg-blue-100 shadow-xl scale-105' 
                : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-75'
            }`}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, 'tens')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'tens')}
          >
            <div className="absolute inset-4 flex items-center justify-center text-blue-400 text-lg font-medium pointer-events-none">
              {tensBlocks.length === 0 ? 'Drop tens blocks here' : ''}
            </div>
            {tensBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                onDragStart={handleBlockDragStart}
                position={block.position}
                isGrouping={isRegrouping}
              />
            ))}
          </div>
          <div className="text-lg text-center mt-2 font-dm-sans text-grade-black font-bold">
            {tensBlocks.length}
          </div>
        </div>

        {/* Ones Section */}
        <div className="relative">
          <div className="text-lg font-dm-sans text-grade-black mb-3 text-center font-bold">Ones</div>
          <div 
            className={`relative h-48 border-4 border-dashed rounded-lg transition-all duration-300 ${
              dragOver === 'ones' 
                ? 'border-orange-500 bg-orange-100 shadow-xl scale-105' 
                : onesBlocks.length >= 10 
                  ? 'border-yellow-400 bg-yellow-50 animate-pulse' 
                  : 'border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-75'
            }`}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, 'ones')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'ones')}
          >
            <div className="absolute inset-4 flex items-center justify-center text-orange-400 text-lg font-medium pointer-events-none">
              {onesBlocks.length === 0 ? 'Drop ones blocks here' : ''}
            </div>
            {onesBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                value={block.value}
                type={block.type}
                onRemove={removeBlock}
                onDragStart={handleBlockDragStart}
                position={block.position}
                isGrouping={isRegrouping}
                shouldVibrate={onesBlocks.length >= 10 && !isRegrouping}
              />
            ))}
          </div>
          <div className="text-lg text-center mt-2 font-dm-sans text-grade-black font-bold">
            {onesBlocks.length}
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mt-6 font-dm-sans text-grade-body text-grade-black">
        <div className="text-2xl font-bold">Total: {total}</div>
        {isCorrect && <div className="text-green-600 font-bold text-xl mt-2">✓ Correct!</div>}
      </div>

      {/* Auto-Conversion Messages */}
      {onesBlocks.length >= 10 && !isRegrouping && (
        <div className="text-center mt-3 text-lg text-yellow-600 font-bold animate-bounce">
          Converting 10 ones to 1 ten!
        </div>
      )}
      
      {isRegrouping && (
        <div className="text-center mt-3 text-lg text-blue-600 font-bold">
          ✨ Regrouping in progress...
        </div>
      )}
    </div>
  );
};

export default PlaceValueTotalArea;
