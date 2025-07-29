
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
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* First Number */}
        <div className="flex-1">
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
        </div>

        {/* Plus Sign */}
        <div className="flex items-center justify-center">
          <div className="font-space-grotesk text-6xl font-bold text-grade-purple bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-grade-purple">
            +
          </div>
        </div>

        {/* Second Number */}
        <div className="flex-1">
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
      </div>
    </Card>
  );
};

export default AdditionWorkspace;
