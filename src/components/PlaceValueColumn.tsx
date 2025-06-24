
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
  onStartBulkDrag
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';
  const dropTargetClass = isDropTarget ? 'ring-2 ring-yellow-400 ring-opacity-75 bg-yellow-50' : '';

  // Check if regrouping is possible
  const onesCount = blocks.filter(b => b.type === 'ones').length;
  const canRegroupToTens = !isOnes && onesCount >= 10; // Show hint on tens column when 10+ ones exist
  const showRegroupHint = canRegroupToTens && !isGrouping;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('🎯 PlaceValueColumn drop event:', {
      type,
      workspaceId
    });

    const crossWorkspaceDataStr = e.dataTransfer.getData('application/json');
    if (crossWorkspaceDataStr) {
      console.log('📦 Cross-workspace data detected, letting parent handle it');
      return;
    }

    e.stopPropagation();
    console.log('🔄 Handling internal drop in column:', type);
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

  const shouldVibrate = hasBundle && isOnes;
  const totalBlocksOfType = blocks.length;

  return (
    <button
      onClick={onAddBlock}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`relative rounded-lg p-2 h-[200px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 ${focusRing} ${dropTargetClass} overflow-hidden ${showRegroupHint ? 'animate-pulse' : ''}`}
      style={{
        backgroundColor: isDropTarget ? 'rgba(255, 255, 0, 0.1)' : backgroundColor,
        borderColor: isDropTarget ? '#FFD700' : borderColor
      }}
      aria-label={`Click to add ${type} blocks or drop blocks here`}
    >
      <div className={`font-dm-sans text-center font-bold mb-2 text-xl ${textColor}`}>
        {type.toUpperCase()}
      </div>
      
      {showRegroupHint ? (
        <div className="text-xs text-center mb-2 bg-blue-100 text-blue-800 rounded px-2 py-1 font-bold animate-bounce">
          🔄 Drop ones here to make groups of 10!
        </div>
      ) : (
        <div className={`text-sm ${textColor} mb-2 opacity-75`}>
          Click!
        </div>
      )}
      
      {/* Render blocks with enhanced props */}
      {blocks.map(block => (
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
      ))}
      
      {/* Visual grouping indicator for ones */}
      {isOnes && onesCount >= 10 && !isGrouping && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
          {Math.floor(onesCount / 10)}
        </div>
      )}
    </button>
  );
};

export default PlaceValueColumn;
