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

  const handleCrossWorkspaceDrop = (sourceWorkspace: string, blockType: 'tens' | 'ones', blockValue: number, bulkCount: number = 1) => {
    console.log('🎯 BULK CROSS-WORKSPACE DROP:', { 
      sourceWorkspace, 
      blockType, 
      blockValue,
      bulkCount,
      currentCounts: { 
        first: { tens: firstNumberTens, ones: firstNumberOnes },
        second: { tens: secondNumberTens, ones: secondNumberOnes },
        total: { tens: totalTens, ones: totalOnes }
      }
    });
    
    // Add ALL blocks of the type to the total workspace
    if (blockType === 'tens') {
      console.log(`➕ Adding ${bulkCount} tens blocks to total:`, totalTens + bulkCount);
      onTotalChange(totalTens + bulkCount, totalOnes);
    } else {
      console.log(`➕ Adding ${bulkCount} ones blocks to total:`, totalOnes + bulkCount);
      onTotalChange(totalTens, totalOnes + bulkCount);
    }

    // Remove ALL blocks of the type from the source workspace
    if (sourceWorkspace === 'first') {
      console.log(`➖ Removing all ${bulkCount} ${blockType} from first workspace`);
      if (blockType === 'tens') {
        console.log('  - First tens:', firstNumberTens, '→', 0);
        onFirstNumberChange(0, firstNumberOnes);
      } else {
        console.log('  - First ones:', firstNumberOnes, '→', 0);
        onFirstNumberChange(firstNumberTens, 0);
      }
    } else if (sourceWorkspace === 'second') {
      console.log(`➖ Removing all ${bulkCount} ${blockType} from second workspace`);
      if (blockType === 'tens') {
        console.log('  - Second tens:', secondNumberTens, '→', 0);
        onSecondNumberChange(0, secondNumberOnes);
      } else {
        console.log('  - Second ones:', secondNumberOnes, '→', 0);
        onSecondNumberChange(secondNumberTens, 0);
      }
    }
    
    // Clear drag target
    setDragTargetWorkspace(null);
    console.log('✅ Bulk cross-workspace transfer complete');
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
