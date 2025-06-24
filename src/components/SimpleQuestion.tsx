
import React from 'react';
import { Card } from '@/components/ui/card';
import { SimpleProblem } from '../utils/simpleProblems';

interface SimpleQuestionProps {
  problem: SimpleProblem;
  totalQuestions: number;
}

const SimpleQuestion: React.FC<SimpleQuestionProps> = ({ problem, totalQuestions }) => {
  return (
    <Card 
      className="p-8 text-center shadow-grade-card bg-white border-0 rounded-grade-card"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="font-dm-sans text-grade-body text-grade-black mb-2">
        Question {problem.questionNumber} of {totalQuestions}
      </div>
      <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
        {problem.num1} + {problem.num2} = ?
      </div>
    </Card>
  );
};

export default SimpleQuestion;
