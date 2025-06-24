
import React from 'react';

interface CompactBlockProps {
  id: string;
  onDragStart: (id: string) => void;
  position: { x: number; y: number };
}

const CompactBlock: React.FC<CompactBlockProps> = ({ 
  id, 
  onDragStart,
  position
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(id);
  };

  return (
    <div
      draggable
      className="absolute cursor-pointer select-none
                 w-6 h-6 bg-blue-500 rounded-sm border border-blue-700 shadow-sm
                 transition-all duration-200 hover:scale-110 active:scale-95 
                 animate-scale-in"
      onDragStart={handleDragStart}
      style={{
        left: position.x,
        top: position.y,
        zIndex: 5
      }}
      title="Drag this block to the total area"
    />
  );
};

export default CompactBlock;
