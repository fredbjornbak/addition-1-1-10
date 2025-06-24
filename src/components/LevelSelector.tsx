
import React from 'react';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onLevelChange }) => {
  const levels = [
    { level: 1, name: 'Easy', description: 'Sums up to 10', color: '#6F00FF' },
    { level: 2, name: 'Medium', description: 'Sums 11-20', color: '#FF6F00' },
    { level: 3, name: 'Hard', description: '10 + ones', color: '#0026FF' },
    { level: 4, name: 'Expert', description: 'Teen + ones', color: '#6F00FF' },
  ];

  return (
    <div 
      className="p-6 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="font-space-grotesk text-2xl font-bold mb-4 text-center text-grade-black">
        🎯 Choose Your Level
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {levels.map(({ level, name, description, color }) => {
          const isSelected = currentLevel === level;
          return (
            <button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`px-6 py-4 font-dm-sans text-grade-body font-bold rounded-grade-pill
                         transition-all duration-200 hover:scale-105 active:scale-95 
                         focus:outline-none focus:ring-4 focus:ring-opacity-50
                         min-w-[44px] min-h-[44px] ${
                isSelected ? 'scale-110' : ''
              }`}
              style={{
                backgroundColor: isSelected ? color : '#F0F0F0',
                color: isSelected ? '#FAFAFA' : '#2F2E41',
                border: isSelected ? 'none' : '2px solid #E5E7EB',
                borderLeft: isSelected ? '10px solid #2F2E41' : '2px solid #E5E7EB',
                borderBottom: isSelected ? '10px solid #2F2E41' : '2px solid #E5E7EB',
                boxShadow: isSelected ? '-10px 10px 40px rgba(0, 0, 0, 0.25)' : 'none',
                focusRingColor: color + '40'
              }}
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${color}40`}
              onBlur={(e) => e.target.style.boxShadow = isSelected ? '-10px 10px 40px rgba(0, 0, 0, 0.25)' : 'none'}
              aria-label={`Select ${name} level: ${description}`}
              aria-pressed={isSelected}
            >
              <div className="text-center">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-sm opacity-90">{description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
