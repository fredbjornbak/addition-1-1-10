
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
    console.log('🚀 DraggableBlock drag start:', { 
      id, 
      type, 
      value,
      workspaceId,
      totalBlocksOfType
    });
    
    // Always set simple drag data for internal drops
    e.dataTransfer.setData('text/plain', id);
    
    // Set cross-workspace drag data for bulk transfers ONLY from first/second workspaces
    if (workspaceId && (workspaceId === 'first' || workspaceId === 'second')) {
      const crossWorkspaceData = {
        blockType: type,
        blockValue: value,
        sourceWorkspace: workspaceId,
        isFromWorkspace: true,
        bulkCount: totalBlocksOfType
      };
      
      console.log('📦 Setting cross-workspace drag data:', crossWorkspaceData);
      e.dataTransfer.setData('application/json', JSON.stringify(crossWorkspaceData));
    } else {
      console.log('ℹ️ Internal workspace drag - no cross-workspace data needed');
    }
    
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
      className={`absolute cursor-grab active:cursor-grabbing ${blockColor} ${hoverColor} text-white font-bold rounded-lg shadow-xl transition-all duration-200 select-none ${vibrateClass} ${groupingClass} ${draggedClass}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isTens ? '24px' : '16px',
        height: isTens ? '18px' : '16px',
        fontSize: isTens ? '10px' : '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        lineHeight: '1',
        padding: '1px',
        fontWeight: '900'
      }}
      title={`${value} - Click to remove`}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
