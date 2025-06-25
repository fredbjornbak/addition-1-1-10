
import React from 'react';
import { Card } from '@/components/ui/card';
import { SimpleProblem } from '../utils/simpleProblems';

interface SimpleQuestionProps {
  problem: SimpleProblem;
  totalQuestions: number;
}

const SimpleQuestion: React.FC<SimpleQuestionProps> = ({
  problem,
  totalQuestions
}) => {
  // Handle case where problem is undefined during transitions
  if (!problem) {
    return (
      <Card className="p-8 text-center shadow-grade-card bg-white border-0 rounded-grade-card" style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}>
        <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
          Loading...
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 text-center shadow-grade-card bg-white border-0 rounded-grade-card" style={{
      borderLeft: '10px solid #2F2E41',
      borderBottom: '10px solid #2F2E41'
    }}>
      <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
        {problem.num1} + {problem.num2} = ?
      </div>
    </Card>
  );
};

export default SimpleQuestion;
