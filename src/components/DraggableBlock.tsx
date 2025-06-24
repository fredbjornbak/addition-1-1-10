
import React from 'react';

interface DraggableBlockProps {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  onRemove: (id: string) => void;
  position: { x: number; y: number };
  isVibrating?: boolean;
  bundleState?: 'idle' | 'vibrating' | 'gathering' | 'transforming' | 'complete';
  animationDelay?: number;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ 
  id, 
  value, 
  type, 
  onRemove, 
  position,
  isVibrating = false,
  bundleState = 'idle',
  animationDelay = 0
}) => {
  const bgColor = type === 'tens' ? '#0026FF' : '#FF6F00';
  const width = type === 'tens' ? '80px' : '40px';
  const height = type === 'tens' ? '30px' : '40px';
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Don't allow removal during animation
    if (bundleState === 'idle' || bundleState === 'vibrating') {
      onRemove(id);
    }
  };

  // Determine animation classes based on state
  const getAnimationClasses = () => {
    const baseClasses = "absolute cursor-pointer select-none font-dm-sans text-white font-bold rounded-md border-2 border-gray-800 shadow-lg transition-all duration-200 flex items-center justify-center";
    
    if (type === 'tens' && bundleState === 'complete') {
      return `${baseClasses} animate-ten-appear`;
    }
    
    if (type === 'ones') {
      switch (bundleState) {
        case 'vibrating':
          return `${baseClasses} animate-vibrate`;
        case 'gathering':
          return `${baseClasses} animate-gather`;
        case 'transforming':
          return `${baseClasses} opacity-0`;
        default:
          if (isVibrating) {
            return `${baseClasses} animate-vibrate`;
          }
          return `${baseClasses} hover:scale-110 active:scale-95 animate-scale-in`;
      }
    }
    
    return `${baseClasses} hover:scale-110 active:scale-95 animate-scale-in`;
  };

  return (
    <div
      className={getAnimationClasses()}
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        width,
        height,
        left: position.x,
        top: position.y,
        fontSize: type === 'tens' ? '14px' : '12px',
        animationDelay: `${animationDelay}ms`,
        zIndex: bundleState === 'gathering' ? 20 : 1
      }}
      title={bundleState === 'idle' || bundleState === 'vibrating' ? 
        `Click to remove this ${type === 'tens' ? 'ten' : 'one'} block` : 
        'Animation in progress...'}
    >
      {value}
    </div>
  );
};

export default DraggableBlock;
