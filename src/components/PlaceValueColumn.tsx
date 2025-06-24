
import React from 'react';
import DraggableBlock from './DraggableBlock';
import BundleOverlay from './BundleOverlay';
import { Block } from '../types/placeValue';

interface PlaceValueColumnProps {
  type: 'tens' | 'ones';
  blocks: Block[];
  hasBundle?: boolean;
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
  onBundleClick?: () => void;
}

const PlaceValueColumn: React.FC<PlaceValueColumnProps> = ({
  type,
  blocks,
  hasBundle = false,
  onAddBlock,
  onRemoveBlock,
  onBundleClick
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';

  return (
    <button
      onClick={onAddBlock}
      className={`relative rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${focusRing}`}
      style={{
        backgroundColor,
        borderColor
      }}
      aria-label={`Click to add ${type} blocks`}
    >
      <div className={`font-dm-sans text-center font-bold mb-4 text-3xl ${textColor}`}>
        {type.toUpperCase()}
      </div>
      <div className={`text-sm ${textColor} mb-4 opacity-75`}>Click to add!</div>
      
      {/* Bundle overlay for ones column when bundling is possible */}
      {hasBundle && isOnes && onBundleClick && (
        <BundleOverlay onBundleClick={onBundleClick} />
      )}
      
      {/* Render blocks */}
      {blocks.map(block => (
        <DraggableBlock
          key={block.id}
          id={block.id}
          value={block.value}
          type={block.type}
          onRemove={hasBundle && isOnes ? () => {} : onRemoveBlock}
          position={block.position}
        />
      ))}
    </button>
  );
};

export default PlaceValueColumn;
