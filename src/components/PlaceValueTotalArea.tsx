
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
  };

  const handleDragEnter = (targetType: 'ones' | 'tens') => {
    setDragOver(targetType);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, targetType: 'ones' | 'tens') => {
    e.preventDefault();
    setDragOver(null);
    
    const blockData = e.dataTransfer.getData('text/plain');
    
    try {
      const { value, type, sourceId } = JSON.parse(blockData);
      
      // Strict validation: ones blocks (value=1) only in ones area, tens blocks (value=10) only in tens area
      if ((targetType === 'ones' && value === 1) || (targetType === 'tens' && value === 10)) {
        const existingBlocks = blocks.filter(b => b.type === targetType);
        const newBlock: Block = {
          id: `total-${targetType}-${Date.now()}-${Math.random()}`,
          value,
          type: targetType,
          position: generatePosition(targetType, existingBlocks.length)
        };
        
        setBlocks(prev => [...prev, newBlock]);
        
        // Check for auto-conversion after adding ones
        if (targetType === 'ones') {
          setTimeout(() => {
            checkForAutoConversion();
          }, 100);
        }
      }
    } catch {
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
          
          setBlocks([...tensBlocks, ...newTensBlocks, ...remainingOnesBlocks]);
          setIsRegrouping(false);
        }, 600);
        
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
      className={`p-4 rounded-[50px] border-4 min-h-[300px] transition-all duration-300 ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-grade-black bg-grade-gray'
      }`}
    >
      <div className="text-center mb-4">
        <div className="font-dm-sans text-lg font-bold text-grade-black">Total</div>
      </div>

      <div className="space-y-4">
        {/* Tens Section */}
        <div className="relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Tens</div>
          <div 
            className={`relative h-32 border-4 border-dashed rounded-lg transition-all duration-300 ${
              dragOver === 'tens' 
                ? 'border-blue-500 bg-blue-100 shadow-lg' 
                : 'border-blue-300 bg-blue-50 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter('tens')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'tens')}
          >
            <div className="absolute inset-2 flex items-center justify-center text-blue-400 text-sm font-medium">
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
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {tensBlocks.length}
          </div>
        </div>

        {/* Ones Section */}
        <div className="relative">
          <div className="text-sm font-dm-sans text-grade-black mb-2 text-center">Ones</div>
          <div 
            className={`relative h-32 border-4 border-dashed rounded-lg transition-all duration-300 ${
              dragOver === 'ones' 
                ? 'border-orange-500 bg-orange-100 shadow-lg' 
                : 'border-orange-300 bg-orange-50 hover:border-orange-400'
            } ${onesBlocks.length >= 10 ? 'animate-pulse border-yellow-400 bg-yellow-50' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter('ones')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'ones')}
          >
            <div className="absolute inset-2 flex items-center justify-center text-orange-400 text-sm font-medium">
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
          <div className="text-xs text-center mt-1 font-dm-sans text-grade-black">
            {onesBlocks.length}
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center mt-4 font-dm-sans text-grade-body text-grade-black">
        <div className="text-xl font-bold">Total: {total}</div>
        {isCorrect && <div className="text-green-600 font-bold text-lg">✓ Correct!</div>}
      </div>

      {/* Auto-Conversion Message */}
      {onesBlocks.length >= 10 && !isRegrouping && (
        <div className="text-center mt-2 text-sm text-yellow-600 font-bold animate-bounce">
          Converting 10 ones to 1 ten!
        </div>
      )}
      
      {isRegrouping && (
        <div className="text-center mt-2 text-sm text-blue-600 font-bold">
          ✨ Regrouping in progress...
        </div>
      )}
    </div>
  );
};

export default PlaceValueTotalArea;
