
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
  isDropTarget?: boolean;
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
  canReceiveFromOthers,
  isDropTarget = false
}) => {
  const handleAddTens = () => {
    onBlocksChange(tensCount + 1, onesCount);
  };

  const handleAddOnes = () => {
    onBlocksChange(tensCount, onesCount + 1);
  };

  return (
    <div 
      className="p-2 rounded-lg border-2"
      style={{
        backgroundColor,
        borderColor
      }}
    >
      <h3 className="font-space-grotesk text-lg font-bold text-center mb-2 text-grade-black">
        {title}
      </h3>
      
      <SimpleBoard
        onAddTens={handleAddTens}
        onAddOnes={handleAddOnes}
        userAnswer={tensCount * 10 + onesCount}
        onBlocksChange={onBlocksChange}
        resetTrigger={resetTrigger}
      />
      
      <div className="text-center mt-1 font-dm-sans text-sm text-grade-black">
        Value: {tensCount * 10 + onesCount}
      </div>
    </div>
  );
};

export default WorkspaceSection;
