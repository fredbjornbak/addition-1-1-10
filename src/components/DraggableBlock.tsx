import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

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
  const { playDragStart, playRemoveSound } = useSoundEffects();

  const handleDragStart = (e: React.DragEvent) => {
    console.log('🚀 DraggableBlock drag start:', { 
      id, 
      type, 
      value,
      workspaceId,
      totalBlocksOfType
    });
    
    // Play drag start sound
    playDragStart(type);
    
    // Always set simple drag data for internal drops (regrouping)
    e.dataTransfer.setData('text/plain', JSON.stringify({
      blockId: id,
      blockType: type,
      blockValue: value,
      workspaceId: workspaceId || 'default'
    }));
    
    // Set cross-workspace drag data for bulk transfers ONLY from first/second workspaces
    if (workspaceId && (workspaceId === 'first' || workspaceId === 'second')) {
      const crossWorkspaceData = {
        blockType: type,
        blockValue: value,
        sourceWorkspace: workspaceId,
        isFromWorkspace: true,
        isCrossWorkspace: true,
        bulkCount: totalBlocksOfType
      };
      
      console.log('📦 Setting cross-workspace drag data:', crossWorkspaceData);
      e.dataTransfer.setData('application/json', JSON.stringify(crossWorkspaceData));
    } else {
      console.log('ℹ️ Internal workspace drag - no cross-workspace data needed');
    }
    
    // Trigger immediate visual feedback
    onDragStart(id);
    
    // Start bulk drag if needed
    if (onStartBulkDrag && workspaceId && (workspaceId === 'first' || workspaceId === 'second')) {
      onStartBulkDrag(type);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent all event bubbling
    e.stopPropagation();
    e.preventDefault();
    
    console.log('🗑️ Block clicked for removal:', { id, type, value, workspaceId });
    playRemoveSound(); // Play removal sound
    onRemove(id);
  };

  const isTens = type === 'tens';
  const blockColor = isTens ? 'bg-blue-500' : 'bg-orange-500';
  const hoverColor = isTens ? 'hover:bg-blue-600' : 'hover:bg-orange-600';
  const vibrateClass = shouldVibrate ? 'animate-vibrate' : '';
  const groupingClass = isGrouping ? 'animate-group-flash' : '';
  
  // Enhanced visual feedback during drag
  const draggedClass = isBeingDragged 
    ? 'opacity-30 scale-75 ring-2 ring-yellow-400 animate-pulse' 
    : 'opacity-100 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-white/50';

  // Increased block sizes for better draggability
  const blockWidth = isTens ? 40 : 28;
  const blockHeight = isTens ? 32 : 28;
  const fontSize = isTens ? '14px' : '12px';
  
  return (
    <div
      data-draggable-block="true"
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`absolute cursor-grab active:cursor-grabbing ${blockColor} ${hoverColor} text-white font-bold rounded-lg shadow-xl transition-all duration-200 select-none ${vibrateClass} ${groupingClass} ${draggedClass} border-2 border-white/20`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${blockWidth}px`,
        height: `${blockHeight}px`,
        fontSize: fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isBeingDragged ? 20 : 50, // Higher z-index to be above background button
        lineHeight: '1',
        padding: '2px',
        fontWeight: '900',
        minWidth: `${blockWidth}px`,
        minHeight: `${blockHeight}px`
      }}
      title={`${value} - Click to remove, drag to move`}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
