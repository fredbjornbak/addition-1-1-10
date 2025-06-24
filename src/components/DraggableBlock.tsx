
import React from 'react';

interface DraggableBlockProps {
  value: number;
  type: 'tens' | 'ones';
  onClick: () => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ value, type, onClick }) => {
  const bgColor = type === 'tens' ? '#0026FF' : '#FF6F00';
  const width = type === 'tens' ? '80px' : '50px';
  const height = type === 'tens' ? '60px' : '50px';
  
  return (
    <button
      className="cursor-pointer select-none font-dm-sans text-grade-body text-grade-white font-bold
                 rounded-grade-pill border-0 shadow-grade-button
                 transition-all duration-200 hover:scale-110 active:scale-95 
                 focus:outline-none focus:ring-4 focus:ring-opacity-50
                 flex items-center justify-center min-w-[44px] min-h-[44px]"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41',
        width,
        height
      }}
      onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${bgColor}40`}
      onBlur={(e) => e.target.style.boxShadow = '-10px 10px 40px rgba(0, 0, 0, 0.25)'}
      aria-label={`Add ${value} ${type === 'tens' ? 'tens' : 'ones'} block`}
    >
      {value}
    </button>
  );
};

export default DraggableBlock;
