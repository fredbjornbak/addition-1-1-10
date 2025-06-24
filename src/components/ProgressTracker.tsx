
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
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="font-space-grotesk text-2xl font-bold mb-4 text-center text-grade-purple">
        ⭐ Your Progress
      </div>
      <div className="flex justify-center mb-4" role="progressbar" aria-valuenow={totalStars} aria-valuemax={maxStars} aria-label={`Progress: ${totalStars} out of ${maxStars} stars completed`}>
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-8 h-8 mx-1 transition-all duration-300 ${
              i < totalStars 
                ? 'fill-current animate-bounce-gentle' 
                : ''
            }`}
            style={{
              color: i < totalStars ? '#FF6F00' : '#E5E7EB',
              animationDelay: i < totalStars ? `${i * 0.1}s` : '0s'
            }}
            aria-label={i < totalStars ? 'Completed star' : 'Empty star'}
          />
        ))}
      </div>
      <div className="font-dm-sans text-center mb-3 text-grade-black text-grade-body font-medium">
        Level {currentLevel}: {totalStars}/{maxStars} problems solved!
      </div>
      
      {/* Overall Progress Summary */}
      <div className="font-dm-sans text-center text-grade-black" style={{ fontSize: '16px' }}>
        <div>Total: L1({progress.level1}) L2({progress.level2}) L3({progress.level3}) L4({progress.level4})</div>
      </div>
    </div>
  );
};

export default ProgressTracker;
