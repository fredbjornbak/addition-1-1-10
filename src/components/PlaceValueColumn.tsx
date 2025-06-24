
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
  isGrouping = false
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';

  const dropTargetClass = isDropTarget 
    ? 'ring-2 ring-yellow-400 ring-opacity-75 bg-yellow-50' 
    : '';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(e, type);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    onDragEnter(type);
  };

  const shouldVibrate = hasBundle && isOnes;

  return (
    <button
      onClick={onAddBlock}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={onDragLeave}
      className={`relative rounded-lg p-6 min-h-[240px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 ${focusRing} ${dropTargetClass}`}
      style={{
        backgroundColor: isDropTarget ? 'rgba(255, 255, 0, 0.1)' : backgroundColor,
        borderColor: isDropTarget ? '#FFD700' : borderColor
      }}
      aria-label={`Click to add ${type} blocks or drop blocks here`}
    >
      <div className={`font-dm-sans text-center font-bold mb-4 text-2xl ${textColor}`}>
        {type.toUpperCase()}
      </div>
      <div className={`text-base ${textColor} mb-4 opacity-75`}>
        Click or drop!
      </div>
      
      {/* Special message for tens column when ones can be regrouped */}
      {type === 'tens' && isDropTarget && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-3 rounded text-base font-bold animate-bounce-gentle z-20">
          Drop ones here!
        </div>
      )}
      
      {/* Render blocks */}
      {blocks.map(block => (
        <DraggableBlock
          key={block.id}
          id={block.id}
          value={block.value}
          type={block.type}
          onRemove={hasBundle && isOnes ? () => {} : onRemoveBlock}
          onDragStart={onDragStart}
          position={block.position}
          shouldVibrate={shouldVibrate}
          isGrouping={isGrouping}
        />
      ))}

      {/* Drop zone indicator */}
      {isDropTarget && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-yellow-400 text-yellow-900 px-4 py-3 rounded text-base font-bold animate-bounce-gentle">
            Drop here!
          </div>
        </div>
      )}
    </button>
  );
};

export default PlaceValueColumn;
