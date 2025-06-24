
import React from 'react';
import { Star } from 'lucide-react';

interface ProgressTrackerProps {
  progress: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
  };
  currentLevel: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, currentLevel }) => {
  const getCurrentProgress = () => {
    const levelKey = `level${currentLevel}` as keyof typeof progress;
    return progress[levelKey];
  };

  const totalStars = getCurrentProgress();
  const maxStars = 10;

  return (
    <div 
      className="p-6 shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '50px',
        border: 'none',
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div 
        className="text-2xl font-bold mb-4 text-center"
        style={{ 
          color: '#6F00FF', 
          fontFamily: 'Space Grotesk',
          fontWeight: 700
        }}
      >
        ⭐ Your Progress
      </div>
      <div className="flex justify-center mb-4">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-8 h-8 mx-1 ${
              i < totalStars 
                ? 'fill-current' 
                : ''
            }`}
            style={{
              color: i < totalStars ? '#FF6F00' : '#E5E7EB'
            }}
            aria-label={i < totalStars ? 'Completed star' : 'Empty star'}
          />
        ))}
      </div>
      <div 
        className="text-center mb-3"
        style={{ 
          color: '#2F2E41', 
          fontFamily: 'DM Sans',
          fontSize: '18px',
          fontWeight: 500
        }}
      >
        Level {currentLevel}: {totalStars}/{maxStars} problems solved!
      </div>
      
      {/* Overall Progress Summary */}
      <div 
        className="text-center"
        style={{ 
          color: '#2F2E41', 
          fontFamily: 'DM Sans',
          fontSize: '16px'
        }}
      >
        <div>Total: L1({progress.level1}) L2({progress.level2}) L3({progress.level3}) L4({progress.level4})</div>
      </div>
    </div>
  );
};

export default ProgressTracker;
