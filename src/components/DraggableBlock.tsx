
import React from 'react';

interface DraggableBlockProps {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  onRemove: (id: string) => void;
  onDragStart: (id: string) => void;
  position: { x: number; y: number };
  shouldVibrate?: boolean;
  isGrouping?: boolean;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ 
  id, 
  value, 
  type, 
  onRemove, 
  onDragStart,
  position,
  shouldVibrate = false,
  isGrouping = false
}) => {
  const bgColor = type === 'tens' ? '#0026FF' : '#FF6F00';
  const width = type === 'tens' ? '80px' : '40px';
  const height = type === 'tens' ? '30px' : '40px';
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    // Set both legacy format and new format for compatibility
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id,
      value,
      type,
      sourceId: id
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(id);
  };

  const vibrationClass = shouldVibrate && !isGrouping ? 'animate-vibrate' : '';
  const groupingClass = isGrouping ? 'animate-group-flash' : '';
  const glowClass = shouldVibrate ? 'ring-4 ring-yellow-400 ring-opacity-50' : '';

  return (
    <div
      draggable
      className={`absolute cursor-pointer select-none font-dm-sans text-white font-bold
                 rounded-md border-2 border-gray-800 shadow-lg
                 transition-all duration-200 hover:scale-110 active:scale-95 
                 flex items-center justify-center animate-scale-in
                 ${vibrationClass} ${groupingClass} ${glowClass}`}
      onClick={handleClick}
      onDragStart={handleDragStart}
      style={{
        backgroundColor: bgColor,
        width,
        height,
        left: position.x,
        top: position.y,
        fontSize: type === 'tens' ? '14px' : '12px',
        zIndex: shouldVibrate ? 10 : 5
      }}
      title={`Click to remove or drag to move this ${type === 'tens' ? 'ten' : 'one'} block`}
    >
      {value}
      {shouldVibrate && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle" />
      )}
    </div>
  );
};

export default DraggableBlock;
