
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
  onCrossWorkspaceDrop?: (sourceWorkspace: string, blockType: 'tens' | 'ones', blockValue: number) => void;
  onCrossWorkspaceDragEnter?: (workspaceId: string) => void;
  onCrossWorkspaceDragLeave?: () => void;
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
  isDropTarget = false,
  onCrossWorkspaceDrop,
  onCrossWorkspaceDragEnter,
  onCrossWorkspaceDragLeave
}) => {
  const handleAddTens = () => {
    onBlocksChange(tensCount + 1, onesCount);
  };

  const handleAddOnes = () => {
    onBlocksChange(tensCount, onesCount + 1);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!canReceiveFromOthers || !onCrossWorkspaceDrop) return;
    
    e.preventDefault();
    const dragData = e.dataTransfer.getData('text/plain');
    
    try {
      const { blockType, blockValue, sourceWorkspace } = JSON.parse(dragData);
      onCrossWorkspaceDrop(sourceWorkspace, blockType, blockValue);
    } catch (error) {
      console.log('Regular drag and drop, not cross-workspace');
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (canReceiveFromOthers && onCrossWorkspaceDragEnter) {
      e.preventDefault();
      onCrossWorkspaceDragEnter(workspaceId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (canReceiveFromOthers && onCrossWorkspaceDragLeave) {
      e.preventDefault();
      onCrossWorkspaceDragLeave();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (canReceiveFromOthers) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className={`p-2 rounded-lg border-2 ${isDropTarget ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
      style={{
        backgroundColor: isDropTarget ? 'rgba(59, 130, 246, 0.1)' : backgroundColor,
        borderColor: isDropTarget ? '#3B82F6' : borderColor
      }}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <h3 className="font-space-grotesk text-lg font-bold text-center mb-2 text-grade-black">
        {title}
      </h3>
      
      {isDropTarget && canReceiveFromOthers && (
        <div className="text-center mb-2 text-blue-600 font-bold text-sm animate-pulse">
          Drop blocks here to add them!
        </div>
      )}
      
      <SimpleBoard
        onAddTens={handleAddTens}
        onAddOnes={handleAddOnes}
        userAnswer={tensCount * 10 + onesCount}
        onBlocksChange={onBlocksChange}
        resetTrigger={resetTrigger}
        workspaceId={workspaceId}
      />
      
      <div className="text-center mt-1 font-dm-sans text-sm text-grade-black">
        Value: {tensCount * 10 + onesCount}
      </div>
    </div>
  );
};

export default WorkspaceSection;
