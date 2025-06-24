
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
  workspaceId
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    console.log('Block drag start:', { id, type, value, workspaceId });
    
    // Set regular block ID for within-workspace operations
    e.dataTransfer.setData('text/plain', id);
    
    // Set cross-workspace data if workspace ID is provided
    if (workspaceId) {
      const crossWorkspaceData = {
        blockType: type,
        blockValue: value,
        sourceWorkspace: workspaceId,
        blockId: id
      };
      e.dataTransfer.setData('application/json', JSON.stringify(crossWorkspaceData));
      console.log('Cross-workspace data set:', crossWorkspaceData);
    }
    
    onDragStart(id);
  };

  const handleDoubleClick = () => {
    onRemove(id);
  };

  const isTens = type === 'tens';
  const blockColor = isTens ? 'bg-blue-500' : 'bg-orange-500';
  const hoverColor = isTens ? 'hover:bg-blue-600' : 'hover:bg-orange-600';
  const vibrateClass = shouldVibrate ? 'animate-vibrate' : '';
  const groupingClass = isGrouping ? 'animate-group-flash' : '';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDoubleClick={handleDoubleClick}
      className={`absolute cursor-grab active:cursor-grabbing ${blockColor} ${hoverColor} text-white font-bold rounded shadow-lg transition-all duration-200 select-none ${vibrateClass} ${groupingClass}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isTens ? '50px' : '20px',
        height: isTens ? '30px' : '20px',
        fontSize: isTens ? '12px' : '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
      title={`${value} - Double click to remove`}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
