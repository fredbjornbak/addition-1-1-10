
import React from 'react';
import { Card } from '@/components/ui/card';
import WorkspaceSection from './WorkspaceSection';
import { SimpleProblem } from '../utils/simpleProblems';

interface AdditionWorkspaceProps {
  problem: SimpleProblem;
  firstNumberTens: number;
  firstNumberOnes: number;
  secondNumberTens: number;
  secondNumberOnes: number;
  onFirstNumberChange: (tens: number, ones: number) => void;
  onSecondNumberChange: (tens: number, ones: number) => void;
  resetTrigger: number;
}

const AdditionWorkspace: React.FC<AdditionWorkspaceProps> = ({
  problem,
  firstNumberTens,
  firstNumberOnes,
  secondNumberTens,
  secondNumberOnes,
  onFirstNumberChange,
  onSecondNumberChange,
  resetTrigger
}) => {
  // Handle case where problem is undefined during transitions
  if (!problem) {
    return (
      <Card 
        className="p-3 shadow-grade-card bg-white rounded-grade-card border-0"
        style={{
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41'
        }}
      >
        <div className="text-center p-8">
          <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
            Loading workspace...
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-3 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* First Number */}
        <WorkspaceSection
          title={`First: ${problem.num1}`}
          workspaceId="first"
          tensCount={firstNumberTens}
          onesCount={firstNumberOnes}
          onBlocksChange={onFirstNumberChange}
          resetTrigger={resetTrigger}
          backgroundColor="rgba(0, 123, 255, 0.1)"
          borderColor="#007BFF"
          canReceiveFromOthers={false}
        />

        {/* Second Number */}
        <WorkspaceSection
          title={`Second: ${problem.num2}`}
          workspaceId="second"
          tensCount={secondNumberTens}
          onesCount={secondNumberOnes}
          onBlocksChange={onSecondNumberChange}
          resetTrigger={resetTrigger}
          backgroundColor="rgba(40, 167, 69, 0.1)"
          borderColor="#28A745"
          canReceiveFromOthers={false}
        />
      </div>
    </Card>
  );
};

export default AdditionWorkspace;
