
import React from 'react';

interface DraggableBlockProps {
  value: number;
  type: 'tens' | 'ones';
  onClick: () => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ value, type, onClick }) => {
  return (
    <button
      className="cursor-pointer select-none transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center font-bold min-w-[44px] min-h-[44px]"
      onClick={onClick}
      style={{
        backgroundColor: type === 'tens' ? '#0026FF' : '#FF6F00',
        color: '#FAFAFA',
        borderRadius: '100px',
        border: 'none',
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41',
        boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.25)',
        width: type === 'tens' ? '80px' : '50px',
        height: type === 'tens' ? '60px' : '50px',
        fontFamily: 'DM Sans',
        fontSize: '18px',
        fontWeight: 700
      }}
      aria-label={`Add ${value} ${type === 'tens' ? 'tens' : 'ones'} block`}
    >
      {value}
    </button>
  );
};

export default DraggableBlock;
