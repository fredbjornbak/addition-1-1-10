
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
  const width = type === 'tens' ? '100px' : '50px';
  const height = type === 'tens' ? '40px' : '50px';
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    // Enhanced drag data format for better compatibility
    const dragData = {
      id,
      value,
      type,
      sourceId: id,
      blockType: type,
      blockValue: value
    };
    
    e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(id);
    console.log('Drag started with data:', dragData);
  };

  const vibrationClass = shouldVibrate && !isGrouping ? 'animate-vibrate' : '';
  const groupingClass = isGrouping ? 'animate-group-flash' : '';
  const glowClass = shouldVibrate ? 'ring-4 ring-yellow-400 ring-opacity-50' : '';

  return (
    <div
      draggable
      className={`absolute cursor-pointer select-none font-dm-sans text-white font-bold
                 rounded-lg border-3 border-gray-800 shadow-lg
                 transition-all duration-200 hover:scale-105 active:scale-95 
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
        fontSize: type === 'tens' ? '16px' : '14px',
        zIndex: shouldVibrate ? 10 : 5
      }}
      title={`Click to remove or drag to move this ${type === 'tens' ? 'ten' : 'one'} block`}
    >
      {value}
      {shouldVibrate && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle" />
      )}
    </div>
  );
};

export default DraggableBlock;
