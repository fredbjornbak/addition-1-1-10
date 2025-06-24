
import React from 'react';

interface DraggableBlockProps {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  onRemove: (id: string) => void;
  position: { x: number; y: number };
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ 
  id, 
  value, 
  type, 
  onRemove, 
  position 
}) => {
  const bgColor = type === 'tens' ? '#0026FF' : '#FF6F00';
  const width = type === 'tens' ? '80px' : '40px';
  const height = type === 'tens' ? '30px' : '40px';
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(id);
  };

  return (
    <div
      className="absolute cursor-pointer select-none font-dm-sans text-white font-bold
                 rounded-md border-2 border-gray-800 shadow-lg
                 transition-all duration-200 hover:scale-110 active:scale-95 
                 flex items-center justify-center animate-scale-in"
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        width,
        height,
        left: position.x,
        top: position.y,
        fontSize: type === 'tens' ? '14px' : '12px'
      }}
      title={`Click to remove this ${type === 'tens' ? 'ten' : 'one'} block`}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
