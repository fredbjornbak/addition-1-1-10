
import React from 'react';
import SimpleBoard from './SimpleBoard';

interface WorkspaceSectionProps {
  title: string;
  workspaceId: string;
  tensCount: number;
  onesCount: number;
  onBlocksChange: (tens: number, ones: number) => void;
  resetTrigger: number;
  backgroundColor: string;
  borderColor: string;
  canReceiveFromOthers: boolean;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  title,
  workspaceId,
  tensCount,
  onesCount,
  onBlocksChange,
  resetTrigger,
  backgroundColor,
  borderColor,
  canReceiveFromOthers
}) => {
  const handleAddTens = () => {
    console.log('➕ Adding tens to workspace:', workspaceId);
    onBlocksChange(tensCount + 1, onesCount);
  };
  
  const handleAddOnes = () => {
    console.log('➕ Adding ones to workspace:', workspaceId);
    onBlocksChange(tensCount, onesCount + 1);
  };

  const handleBlocksChange = (tens: number, ones: number) => {
    console.log(`🔄 Block change in ${workspaceId}:`, { tens, ones });
    onBlocksChange(tens, ones);
  };

  const totalValue = tensCount * 10 + onesCount;
  
  return (
    <div 
      className={`p-2 rounded-lg border-2 min-h-[420px] transition-all duration-200`}
      style={{
        backgroundColor,
        borderColor
      }}
    >
      <h3 className="font-space-grotesk text-4xl font-bold text-center mb-2 text-grade-purple">
        {totalValue}
      </h3>
      
      <SimpleBoard 
        onAddTens={handleAddTens}
        onAddOnes={handleAddOnes}
        userAnswer={tensCount * 10 + onesCount}
        onBlocksChange={handleBlocksChange}
        resetTrigger={resetTrigger}
        workspaceId={workspaceId}
        externalTensCount={tensCount}
        externalOnesCount={onesCount}
        canAddDirectly={true}
      />
      
      <div className="text-center mt-2">
        <div className="font-dm-sans text-sm text-grade-black">
          ({tensCount} tens + {onesCount} ones)
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSection;
