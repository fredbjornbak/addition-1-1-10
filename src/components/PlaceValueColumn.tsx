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
  workspaceId
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';
  const dropTargetClass = isDropTarget ? 'ring-2 ring-yellow-400 ring-opacity-75 bg-yellow-50' : '';

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
  const totalBlocksOfType = blocks.length; // Get total count for bulk transfer

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
      
      {/* Render blocks with bulk count */}
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
        />
      ))}
    </button>
  );
};

export default PlaceValueColumn;
