
import React from 'react';
import DraggableBlock from './DraggableBlock';
import BundleOverlay from './BundleOverlay';
import { Block } from '../types/placeValue';

interface PlaceValueColumnProps {
  type: 'tens' | 'ones';
  blocks: Block[];
  hasBundle?: boolean;
  bundleState?: 'idle' | 'vibrating' | 'gathering' | 'transforming' | 'complete';
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
  onBundleClick?: () => void;
}

const PlaceValueColumn: React.FC<PlaceValueColumnProps> = ({
  type,
  blocks,
  hasBundle = false,
  bundleState = 'idle',
  onAddBlock,
  onRemoveBlock,
  onBundleClick
}) => {
  const isOnes = type === 'ones';
  const backgroundColor = isOnes ? 'rgba(255, 111, 0, 0.1)' : 'rgba(0, 38, 255, 0.1)';
  const borderColor = isOnes ? '#FF6F00' : '#0026FF';
  const textColor = isOnes ? 'text-grade-orange' : 'text-grade-blue';
  const focusRing = isOnes ? 'focus:ring-orange-300' : 'focus:ring-blue-300';

  // Enhanced column animation based on bundle state
  const getColumnClasses = () => {
    const baseClasses = `relative rounded-2xl p-6 min-h-[250px] border-4 transition-all duration-200 focus:outline-none focus:ring-4 ${focusRing}`;
    
    if (hasBundle && isOnes) {
      switch (bundleState) {
        case 'vibrating':
          return `${baseClasses} animate-pulse-glow hover:scale-105 active:scale-95`;
        case 'gathering':
          return `${baseClasses} animate-bundle-flash`;
        case 'transforming':
          return `${baseClasses} animate-bundle-flash`;
        default:
          return `${baseClasses} hover:scale-105 active:scale-95`;
      }
    }
    
    return `${baseClasses} hover:scale-105 active:scale-95`;
  };

  return (
    <button
      onClick={onAddBlock}
      className={getColumnClasses()}
      style={{
        backgroundColor,
        borderColor
      }}
      aria-label={`Click to add ${type} blocks`}
      disabled={bundleState === 'gathering' || bundleState === 'transforming'}
    >
      <div className={`font-dm-sans text-center font-bold mb-4 text-3xl ${textColor}`}>
        {type.toUpperCase()}
      </div>
      <div className={`text-sm ${textColor} mb-4 opacity-75`}>
        {bundleState === 'gathering' || bundleState === 'transforming' ? 
          'Bundling...' : 'Click to add!'}
      </div>
      
      {/* Enhanced bundle overlay for ones column when bundling is possible */}
      {hasBundle && isOnes && onBundleClick && (
        <BundleOverlay 
          onBundleClick={onBundleClick} 
          bundleState={bundleState}
        />
      )}
      
      {/* Render blocks with enhanced animations */}
      {blocks.map((block, index) => (
        <DraggableBlock
          key={block.id}
          id={block.id}
          value={block.value}
          type={block.type}
          onRemove={onRemoveBlock}
          position={block.position}
          isVibrating={hasBundle && isOnes && bundleState === 'vibrating'}
          bundleState={bundleState}
          animationDelay={index * 50} // Stagger animations
        />
      ))}
    </button>
  );
};

export default PlaceValueColumn;
