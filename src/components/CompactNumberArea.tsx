
import React, { useState, useEffect } from 'react';
import CompactBlock from './CompactBlock';

interface CompactNumberAreaProps {
  targetNumber: number;
  onBlocksChange: (count: number) => void;
  resetTrigger: number;
  isTotal?: boolean;
  onDrop?: (count: number) => void;
}

interface Block {
  id: string;
  position: { x: number; y: number };
}

const CompactNumberArea: React.FC<CompactNumberAreaProps> = ({
  targetNumber,
  onBlocksChange,
  resetTrigger,
  isTotal = false,
  onDrop
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [dragCounter, setDragCounter] = useState(0);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    setBlocks([]);
    onBlocksChange(0);
  }, [resetTrigger, onBlocksChange]);

  const generatePosition = (index: number) => ({
    x: (index % 6) * 28 + 4,
    y: Math.floor(index / 6) * 28 + 4
  });

  const handleAddClick = () => {
    if (blocks.length < targetNumber && !isTotal) {
      const newBlock = {
        id: `block-${Date.now()}-${Math.random()}`,
        position: generatePosition(blocks.length)
      };
      const newBlocks = [...blocks, newBlock];
      setBlocks(newBlocks);
      onBlocksChange(newBlocks.length);
    }
  };

  const handleBlockDragStart = (id: string) => {
    // For non-total areas, drag all blocks
    if (!isTotal) {
      // This will be handled by parent component
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (isTotal) {
      e.preventDefault();
      setDragCounter(prev => prev + 1);
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    if (isTotal) {
      setDragCounter(prev => prev - 1);
      if (dragCounter <= 1) {
        setIsOver(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isTotal) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isTotal && onDrop) {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      const [sourceArea, count] = data.split(':');
      onDrop(parseInt(count));
      setIsOver(false);
      setDragCounter(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative w-40 h-32 border-2 rounded-lg transition-all ${
          isTotal 
            ? isOver 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 bg-gray-50'
            : blocks.length === targetNumber
              ? 'border-green-500 bg-green-50'
              : 'border-blue-300 bg-blue-50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleAddClick}
        style={{ cursor: !isTotal && blocks.length < targetNumber ? 'pointer' : 'default' }}
      >
        {blocks.map((block) => (
          <CompactBlock
            key={block.id}
            id={block.id}
            onDragStart={handleBlockDragStart}
            position={block.position}
          />
        ))}
        
        {!isTotal && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            {blocks.length === 0 && `Click to add blocks (${targetNumber})`}
            {blocks.length > 0 && blocks.length < targetNumber && `${blocks.length}/${targetNumber}`}
            {blocks.length === targetNumber && '✓'}
          </div>
        )}
        
        {isTotal && blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            Drop blocks here
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactNumberArea;
