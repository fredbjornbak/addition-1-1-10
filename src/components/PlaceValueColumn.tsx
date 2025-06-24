
import React from 'react';
import DraggableBlock from './DraggableBlock';
import { Block } from '../types/placeValue';

interface PlaceValueColumnProps {
  type: 'tens' | 'ones';
  blocks: Block[];
  hasBundle?: boolean;
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (e: React.DragEvent, targetType: 'tens' | 'ones') => void;
  onDragEnter: (columnType: 'tens' | 'ones') => void;
  onDragLeave: () => void;
  onDragOver: (e: React.DragEvent) => void;
  isDropTarget?: boolean;
  isGrouping?: boolean;
  workspaceId?: string;
  onStartBulkDrag?: (blockType: 'tens' | 'ones') => void;
  canRegroupOnestoTens?: boolean;
  canRegroupTensToOnes?: boolean;
}

const PlaceValueColumn: React.FC<PlaceValueColumnProps> = ({
  type,
  blocks,
  hasBundle = false,
  onAddBlock,
  onRemoveBlock,
  onDragStart,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
  isDropTarget = false,
  isGrouping = false,
  workspaceId,
  onStartBulkDrag,
  canRegroupOnestoTens = false,
  canRegroupTensToOnes = false
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';
  const dropTargetClass = isDropTarget ? 'ring-2 ring-yellow-400 ring-opacity-75 bg-yellow-50' : '';

  // Determine which blocks should vibrate - only first 10 ones blocks when there are 10+ ones
  const shouldVibrateBlocks = hasBundle && isOnes && blocks.length >= 10;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('🎯 PlaceValueColumn drop event:', {
      type,
      workspaceId,
      hasJSONData: !!e.dataTransfer.getData('application/json'),
      hasTextData: !!e.dataTransfer.getData('text/plain')
    });

    // First, try to get internal drag data
    const internalDataStr = e.dataTransfer.getData('text/plain');
    let internalData = null;
    
    if (internalDataStr) {
      try {
        internalData = JSON.parse(internalDataStr);
        console.log('📋 Internal drag data:', internalData);
      } catch (error) {
        console.log('📋 Plain text drag data (legacy):', internalDataStr);
        internalData = { blockId: internalDataStr };
      }
    }

    // Check for cross-workspace data
    const crossWorkspaceDataStr = e.dataTransfer.getData('application/json');
    let crossWorkspaceData = null;
    
    if (crossWorkspaceDataStr) {
      try {
        crossWorkspaceData = JSON.parse(crossWorkspaceDataStr);
        console.log('📦 Cross-workspace data:', crossWorkspaceData);
      } catch (error) {
        console.log('❌ Failed to parse cross-workspace data:', error);
      }
    }

    // Determine if this is internal regrouping or cross-workspace transfer
    const isInternalRegrouping = internalData && 
      (!crossWorkspaceData || 
       !crossWorkspaceData.isCrossWorkspace || 
       crossWorkspaceData.sourceWorkspace === workspaceId);

    console.log('🔍 Drop analysis:', {
      isInternalRegrouping,
      hasInternalData: !!internalData,
      hasCrossWorkspaceData: !!crossWorkspaceData,
      sourceWorkspace: crossWorkspaceData?.sourceWorkspace,
      currentWorkspace: workspaceId
    });

    if (isInternalRegrouping) {
      console.log('🔄 Handling as internal regrouping');
      e.stopPropagation(); // Stop propagation for internal drops
      onDrop(e, type);
    } else if (crossWorkspaceData && crossWorkspaceData.isCrossWorkspace) {
      console.log('📦 Handling as cross-workspace transfer - letting bubble up');
      // For cross-workspace drops, let the event bubble up to WorkspaceSection
      // DON'T stop propagation
      onDrop(e, type);
    } else {
      console.log('❓ Unknown drop type, defaulting to internal');
      e.stopPropagation();
      onDrop(e, type);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    onDragEnter(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeave();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(e);
  };

  const totalBlocksOfType = blocks.length;

  return (
    <button
      onClick={onAddBlock}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`relative rounded-lg p-2 h-[320px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 ${focusRing} ${dropTargetClass} overflow-hidden`}
      style={{
        backgroundColor: isDropTarget ? 'rgba(255, 255, 0, 0.1)' : backgroundColor,
        borderColor: isDropTarget ? '#FFD700' : borderColor
      }}
      aria-label={`Click to add ${type} blocks or drop blocks here`}
    >
      <div className={`font-dm-sans text-center font-bold mb-2 text-xl ${textColor}`}>
        {type.toUpperCase()}
      </div>
      
      <div className={`text-sm ${textColor} mb-2 opacity-75`}>
        Click!
      </div>
      
      {/* Render blocks with individual vibration logic */}
      {blocks.map((block, index) => {
        // Only first 10 ones blocks should vibrate when there are 10+ ones blocks
        const shouldVibrate = shouldVibrateBlocks && index < 10;
        
        return (
          <DraggableBlock
            key={block.id}
            id={block.id}
            value={block.value}
            type={block.type}
            onRemove={onRemoveBlock}
            onDragStart={onDragStart}
            position={block.position}
            shouldVibrate={shouldVibrate}
            isGrouping={isGrouping}
            workspaceId={workspaceId}
            totalBlocksOfType={totalBlocksOfType}
            isBeingDragged={block.isBeingDragged}
            onStartBulkDrag={onStartBulkDrag}
          />
        );
      })}
    </button>
  );
};

export default PlaceValueColumn;
