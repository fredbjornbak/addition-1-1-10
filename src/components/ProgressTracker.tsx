
import React from 'react';
import { Card } from '@/components/ui/card';
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
    <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
      <div className="text-lg font-bold text-purple-800 mb-2 text-center">
        ⭐ Your Progress
      </div>
      <div className="flex justify-center mb-2">
        {Array.from({ length: maxStars }, (_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 mx-1 ${
              i < totalStars 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="text-center text-sm text-purple-700">
        Level {currentLevel}: {totalStars}/{maxStars} problems solved!
      </div>
      
      {/* Overall Progress Summary */}
      <div className="mt-3 text-xs text-center text-gray-600">
        <div>Total: L1({progress.level1}) L2({progress.level2}) L3({progress.level3}) L4({progress.level4})</div>
      </div>
    </Card>
  );
};

export default ProgressTracker;
