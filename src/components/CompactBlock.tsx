
import React from 'react';

interface CompactBlockProps {
  id: string;
  onDragStart: (e: React.DragEvent) => void;
  className?: string;
}

const CompactBlock: React.FC<CompactBlockProps> = ({ 
  id, 
  onDragStart,
  className = ""
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(e);
  };

  return (
    <div
      draggable
      className={`w-6 h-6 bg-grade-orange rounded-sm border-2 border-grade-black cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200 ${className}`}
      onDragStart={handleDragStart}
      style={{ userSelect: 'none' }}
    />
  );
};

export default CompactBlock;
