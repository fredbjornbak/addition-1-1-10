
import React, { useState, useEffect } from 'react';
import CompactBlock from './CompactBlock';

interface CompactNumberAreaProps {
  number: number;
  backgroundColor: string;
  borderColor: string;
  onDragStart: (blocks: number) => void;
  resetTrigger: number;
}

const CompactNumberArea: React.FC<CompactNumberAreaProps> = ({
  number,
  backgroundColor,
  borderColor,
  onDragStart,
  resetTrigger
}) => {
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    setBlocks(0);
  }, [resetTrigger]);

  const addBlock = () => {
    if (blocks < number) {
      setBlocks(prev => prev + 1);
    }
  };

  const handleDragStart = () => {
    if (blocks > 0) {
      onDragStart(blocks);
    }
  };

  const renderBlocks = () => {
    const blockElements = [];
    for (let i = 0; i < blocks; i++) {
      blockElements.push(
        <CompactBlock
          key={i}
          id={`block-${i}`}
          onDragStart={handleDragStart}
        />
      );
    }
    return blockElements;
  };

  return (
    <div 
      className="p-6 rounded-[50px] border-4 min-h-[120px] flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundColor, borderColor }}
      onClick={addBlock}
    >
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {renderBlocks()}
      </div>
      <div className="font-dm-sans text-grade-body text-grade-black text-center">
        {blocks} / {number}
      </div>
    </div>
  );
};

export default CompactNumberArea;
