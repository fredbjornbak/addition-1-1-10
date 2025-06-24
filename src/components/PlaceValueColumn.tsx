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
    console.log('🎯 PlaceValueColumn simple drop event:', {
      type,
      workspaceId
    });

    // Handle simple internal drops
    e.stopPropagation();
    onDrop(e, type);
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
      className={`relative rounded-lg p-2 h-[200px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 ${focusRing} ${dropTargetClass} overflow-hidden`}
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
          />
        );
      })}
      
      {/* Visual indicator for tens that can be broken down - keeping this one */}
      {!isOnes && blocks.length > 0 && !isGrouping && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {blocks.length}
        </div>
      )}
    </button>
  );
};

export default PlaceValueColumn;
