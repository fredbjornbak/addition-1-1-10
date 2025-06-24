
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onLevelChange }) => {
  const levels = [
    { level: 1, name: 'Easy', description: 'Sums up to 10', color: 'bg-green-500' },
    { level: 2, name: 'Medium', description: 'Sums 11-20', color: 'bg-yellow-500' },
    { level: 3, name: 'Hard', description: '10 + ones', color: 'bg-orange-500' },
    { level: 4, name: 'Expert', description: 'Teen + ones', color: 'bg-red-500' },
  ];

  return (
    <Card className="p-4 bg-white border-2 border-gray-300">
      <div className="text-lg font-bold text-gray-800 mb-3 text-center">
        🎯 Choose Your Level
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {levels.map(({ level, name, description, color }) => (
          <Button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`
              px-4 py-2 rounded-lg font-bold text-white transition-all duration-200
              ${currentLevel === level 
                ? `${color} scale-110 shadow-lg` 
                : 'bg-gray-400 hover:bg-gray-500'
              }
            `}
          >
            <div className="text-center">
              <div className="text-sm">{name}</div>
              <div className="text-xs opacity-90">{description}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default LevelSelector;
