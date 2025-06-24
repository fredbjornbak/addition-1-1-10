
import React from 'react';

interface DraggableBlockProps {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  onRemove: (id: string) => void;
  onDragStart: (id: string) => void;
  position: {
    x: number;
    y: number;
  };
  shouldVibrate?: boolean;
  isGrouping?: boolean;
  workspaceId?: string;
  totalBlocksOfType?: number;
  isBeingDragged?: boolean;
  onStartBulkDrag?: (blockType: 'tens' | 'ones') => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  value,
  type,
  onRemove,
  onDragStart,
  position,
  shouldVibrate = false,
  isGrouping = false,
  workspaceId,
  totalBlocksOfType = 1,
  isBeingDragged = false,
  onStartBulkDrag
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    console.log('🚀 DraggableBlock simple drag start:', { 
      id, 
      type, 
      value
    });
    
    // Simple drag - just set the block ID
    e.dataTransfer.setData('text/plain', id);
    
    onDragStart(id);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent event bubbling to parent button
    e.stopPropagation();
    e.preventDefault();
    
    console.log('🗑️ Single click remove block:', { id, type, value });
    onRemove(id);
  };

  const isTens = type === 'tens';
  const blockColor = isTens ? 'bg-blue-500' : 'bg-orange-500';
  const hoverColor = isTens ? 'hover:bg-blue-600' : 'hover:bg-orange-600';
  const vibrateClass = shouldVibrate ? 'animate-vibrate' : '';
  const groupingClass = isGrouping ? 'animate-group-flash' : '';
  const draggedClass = isBeingDragged ? 'opacity-30 scale-90' : 'opacity-100';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`absolute cursor-grab active:cursor-grabbing ${blockColor} ${hoverColor} text-white font-bold rounded-md shadow-lg transition-all duration-200 select-none ${vibrateClass} ${groupingClass} ${draggedClass}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isTens ? '50px' : '26px', // Increased from 45px/22px
        height: isTens ? '36px' : '26px', // Increased from 32px/22px  
        fontSize: isTens ? '16px' : '14px', // Increased font sizes
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        lineHeight: '1', // Ensure proper line height for centering
        padding: '2px' // Add small padding for better text fit
      }}
      title={`${value} - Click to remove`}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
