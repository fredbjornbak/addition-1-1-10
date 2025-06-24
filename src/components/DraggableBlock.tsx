
import React from 'react';
import { Card } from '@/components/ui/card';

interface DraggableBlockProps {
  value: number;
  type: 'tens' | 'ones';
  onClick: () => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ value, type, onClick }) => {
  return (
    <Card
      className={`
        cursor-pointer select-none transition-all duration-200 hover:scale-110 active:scale-95
        ${type === 'tens' 
          ? 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700 w-16 h-12' 
          : 'bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-700 w-8 h-8'
        }
        flex items-center justify-center font-bold rounded-lg shadow-lg
      `}
      onClick={onClick}
    >
      {value}
    </Card>
  );
};

export default DraggableBlock;
