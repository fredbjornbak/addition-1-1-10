
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
          color: '#2F2E41', 
          fontFamily: 'Space Grotesk',
          fontWeight: 700
        }}
      >
        🎯 Choose Your Level
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {levels.map(({ level, name, description, color }) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`px-6 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 min-w-[44px] min-h-[44px] ${
              currentLevel === level ? 'scale-110' : ''
            }`}
            style={{
              backgroundColor: currentLevel === level ? color : '#F0F0F0',
              color: currentLevel === level ? '#FAFAFA' : '#2F2E41',
              borderRadius: '100px',
              border: currentLevel === level ? 'none' : '2px solid #E5E7EB',
              borderLeft: currentLevel === level ? '10px solid #2F2E41' : '2px solid #E5E7EB',
              borderBottom: currentLevel === level ? '10px solid #2F2E41' : '2px solid #E5E7EB',
              boxShadow: currentLevel === level ? '-10px 10px 40px rgba(0, 0, 0, 0.25)' : 'none',
              fontFamily: 'DM Sans',
              fontSize: '18px',
              fontWeight: currentLevel === level ? 700 : 500
            }}
            aria-label={`Select ${name} level: ${description}`}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{name}</div>
              <div className="text-sm opacity-90">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
