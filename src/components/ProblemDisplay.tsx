
import React from 'react';
import { Card } from '@/components/ui/card';
import { Problem } from '../utils/problemGenerator';

interface ProblemDisplayProps {
  problem: Problem;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  return (
    <Card 
      className="p-8 text-center shadow-grade-card bg-white border-0 rounded-grade-card"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold mb-4">
        {problem.num1} + {problem.num2} = ?
      </div>
      <div className="font-dm-sans text-grade-body-lg text-grade-black leading-relaxed">
        {problem.description}
      </div>
    </Card>
  );
};

export default ProblemDisplay;
