
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import WorkspaceSection from './WorkspaceSection';
import { SimpleProblem } from '../utils/simpleProblems';

interface AdditionWorkspaceProps {
  problem: SimpleProblem;
  firstNumberTens: number;
  firstNumberOnes: number;
  secondNumberTens: number;
  secondNumberOnes: number;
  totalTens: number;
  totalOnes: number;
  onFirstNumberChange: (tens: number, ones: number) => void;
  onSecondNumberChange: (tens: number, ones: number) => void;
  onTotalChange: (tens: number, ones: number) => void;
  resetTrigger: number;
}

const AdditionWorkspace: React.FC<AdditionWorkspaceProps> = ({
  problem,
  firstNumberTens,
  firstNumberOnes,
  secondNumberTens,
  secondNumberOnes,
  totalTens,
  totalOnes,
  onFirstNumberChange,
  onSecondNumberChange,
  onTotalChange,
  resetTrigger
}) => {
  const [dragTargetWorkspace, setDragTargetWorkspace] = useState<string | null>(null);

  const handleCrossWorkspaceDrop = (sourceWorkspace: string, blockType: 'tens' | 'ones', blockValue: number) => {
    console.log('🎯 CROSS-WORKSPACE DROP HANDLER:', { 
      sourceWorkspace, 
      blockType, 
      blockValue,
      currentCounts: { 
        first: { tens: firstNumberTens, ones: firstNumberOnes },
        second: { tens: secondNumberTens, ones: secondNumberOnes },
        total: { tens: totalTens, ones: totalOnes }
      }
    });
    
    // Add the block to the total workspace
    if (blockType === 'tens') {
      console.log('➕ Adding tens block to total:', totalTens + 1);
      onTotalChange(totalTens + 1, totalOnes);
    } else {
      console.log('➕ Adding ones block to total:', totalOnes + 1);
      onTotalChange(totalTens, totalOnes + 1);
    }

    // Remove the block from the source workspace
    if (sourceWorkspace === 'first') {
      console.log('➖ Removing from first workspace');
      if (blockType === 'tens') {
        const newTens = Math.max(0, firstNumberTens - 1);
        console.log('  - First tens:', firstNumberTens, '→', newTens);
        onFirstNumberChange(newTens, firstNumberOnes);
      } else {
        const newOnes = Math.max(0, firstNumberOnes - 1);
        console.log('  - First ones:', firstNumberOnes, '→', newOnes);
        onFirstNumberChange(firstNumberTens, newOnes);
      }
    } else if (sourceWorkspace === 'second') {
      console.log('➖ Removing from second workspace');
      if (blockType === 'tens') {
        const newTens = Math.max(0, secondNumberTens - 1);
        console.log('  - Second tens:', secondNumberTens, '→', newTens);
        onSecondNumberChange(newTens, secondNumberOnes);
      } else {
        const newOnes = Math.max(0, secondNumberOnes - 1);
        console.log('  - Second ones:', secondNumberOnes, '→', newOnes);
        onSecondNumberChange(secondNumberTens, newOnes);
      }
    }
    
    // Clear drag target
    setDragTargetWorkspace(null);
    console.log('✅ Cross-workspace transfer complete');
  };

  const handleCrossWorkspaceDragEnter = (workspaceId: string) => {
    console.log('🎯 DRAG ENTER workspace:', workspaceId);
    setDragTargetWorkspace(workspaceId);
  };

  const handleCrossWorkspaceDragLeave = () => {
    console.log('🚪 DRAG LEAVE workspace');
    setDragTargetWorkspace(null);
  };

  return (
    <Card 
      className="p-3 shadow-grade-card bg-white rounded-grade-card border-0"
      style={{
        borderLeft: '10px solid #2F2E41',
        borderBottom: '10px solid #2F2E41'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

        {/* Total */}
        <WorkspaceSection
          title="Total"
          workspaceId="total"
          tensCount={totalTens}
          onesCount={totalOnes}
          onBlocksChange={onTotalChange}
          resetTrigger={resetTrigger}
          backgroundColor="rgba(108, 117, 125, 0.1)"
          borderColor="#6C757D"
          canReceiveFromOthers={true}
          isDropTarget={dragTargetWorkspace === 'total'}
          onCrossWorkspaceDrop={handleCrossWorkspaceDrop}
          onCrossWorkspaceDragEnter={handleCrossWorkspaceDragEnter}
          onCrossWorkspaceDragLeave={handleCrossWorkspaceDragLeave}
        />
      </div>
    </Card>
  );
};

export default AdditionWorkspace;
