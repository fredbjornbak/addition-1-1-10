
import React from 'react';
import { Card } from '@/components/ui/card';
import { VisualAdditionProblem } from '../utils/visualAdditionProblems';

interface AdditionQuestionProps {
  problem: VisualAdditionProblem;
  totalQuestions: number;
}

const AdditionQuestion: React.FC<AdditionQuestionProps> = ({ problem, totalQuestions }) => {
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
      <div className="font-dm-sans text-grade-body-lg text-grade-black mt-4">
        Build each number with blocks, then drag all blocks to the total area!
      </div>
    </Card>
  );
};

export default AdditionQuestion;
