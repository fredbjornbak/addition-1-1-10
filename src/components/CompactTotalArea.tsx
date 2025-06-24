
import React, { useState, useEffect } from 'react';
import CompactBlock from './CompactBlock';

interface CompactTotalAreaProps {
  expectedTotal: number;
  onTotalChange: (total: number) => void;
  resetTrigger: number;
}

const CompactTotalArea: React.FC<CompactTotalAreaProps> = ({
  expectedTotal,
  onTotalChange,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    setBlocks(0);
    onTotalChange(0);
  }, [resetTrigger, onTotalChange]);

  useEffect(() => {
    onTotalChange(blocks);
  }, [blocks, onTotalChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedBlocks = parseInt(e.dataTransfer.getData('application/blocks') || '1');
    setBlocks(prev => prev + draggedBlocks);
  };

  const renderBlocks = () => {
    const blockElements = [];
    for (let i = 0; i < blocks; i++) {
      blockElements.push(
        <CompactBlock
          key={i}
          id={`total-block-${i}`}
          onDragStart={() => {}}
          className="cursor-default"
        />
      );
    }
    return blockElements;
  };

  const isCorrect = blocks === expectedTotal && blocks > 0;

  return (
    <div 
      className={`p-6 rounded-[50px] border-4 min-h-[140px] flex flex-col items-center justify-center transition-all duration-300 ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-grade-black bg-grade-gray'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {renderBlocks()}
      </div>
      <div className="font-dm-sans text-grade-body text-grade-black text-center">
        Total: {blocks}
        {isCorrect && <div className="text-green-600 font-bold">✓ Correct!</div>}
      </div>
    </div>
  );
};

export default CompactTotalArea;
