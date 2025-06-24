
import React from 'react';
import { Card } from '@/components/ui/card';
import { Problem } from '../utils/problemGenerator';

interface ProblemDisplayProps {
  problem: Problem;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  return (
    <Card 
      className="p-8 text-center shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '50px',
        border: 'none',
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div 
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ 
          color: '#6F00FF', 
          fontFamily: 'Space Grotesk',
          fontWeight: 700
        }}
      >
        {problem.num1} + {problem.num2} = ?
      </div>
      <div 
        className="text-xl"
        style={{ 
          color: '#2F2E41', 
          fontFamily: 'DM Sans',
          fontSize: '20px',
          lineHeight: '1.5'
        }}
      >
        {problem.description}
      </div>
    </Card>
  );
};

export default ProblemDisplay;
