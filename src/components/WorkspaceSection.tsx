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
  onCrossWorkspaceDrop?: (sourceWorkspace: string, blockType: 'tens' | 'ones', blockValue: number, bulkCount?: number) => void;
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
    console.log('➕ Adding tens to workspace:', workspaceId);
    onBlocksChange(tensCount + 1, onesCount);
  };
  const handleAddOnes = () => {
    console.log('➕ Adding ones to workspace:', workspaceId);
    onBlocksChange(tensCount, onesCount + 1);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🎯 WorkspaceSection DROP received:', {
      workspaceId,
      canReceiveFromOthers,
      hasDropHandler: !!onCrossWorkspaceDrop
    });

    if (!canReceiveFromOthers || !onCrossWorkspaceDrop) {
      console.log('❌ Cannot receive blocks or no drop handler');
      return;
    }

    // Get cross-workspace data
    const crossWorkspaceDataStr = e.dataTransfer.getData('application/json');
    console.log('📋 Cross-workspace data string:', crossWorkspaceDataStr);
    
    if (crossWorkspaceDataStr) {
      try {
        const crossWorkspaceData = JSON.parse(crossWorkspaceDataStr);
        console.log('📦 Parsed cross-workspace bulk data:', crossWorkspaceData);
        
        const {
          blockType,
          blockValue,
          sourceWorkspace,
          isFromWorkspace,
          bulkCount = 1
        } = crossWorkspaceData;

        // Process cross-workspace drops (from different workspaces)
        if (isFromWorkspace && sourceWorkspace && sourceWorkspace !== workspaceId) {
          console.log('✅ Processing bulk cross-workspace drop:', {
            from: sourceWorkspace,
            to: workspaceId,
            blockType,
            blockValue,
            bulkCount
          });
          onCrossWorkspaceDrop(sourceWorkspace, blockType, blockValue, bulkCount);
        } else {
          console.log('🚫 Ignoring - same workspace or not cross-workspace drop');
        }
      } catch (error) {
        console.error('❌ Error parsing cross-workspace data:', error);
      }
    } else {
      console.log('ℹ️ No cross-workspace data found');
    }
  };
  const handleDragEnter = (e: React.DragEvent) => {
    if (canReceiveFromOthers && onCrossWorkspaceDragEnter) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🎯 Drag ENTER workspace:', workspaceId);
      onCrossWorkspaceDragEnter(workspaceId);
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    if (canReceiveFromOthers && onCrossWorkspaceDragLeave) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🚪 Drag LEAVE workspace:', workspaceId);
      onCrossWorkspaceDragLeave();
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    if (canReceiveFromOthers) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const totalValue = tensCount * 10 + onesCount;
  return (
    <div 
      className={`p-2 rounded-lg border-2 min-h-[420px] transition-all duration-200 ${isDropTarget ? 'ring-4 ring-blue-400 bg-blue-50 scale-105' : ''}`}
      style={{
        backgroundColor: isDropTarget ? 'rgba(59, 130, 246, 0.2)' : backgroundColor,
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
      {workspaceId === 'total' && <div className="text-center mb-2">
          <div className="font-space-grotesk text-3xl font-bold text-grade-purple">
            {totalValue}
          </div>
          <div className="font-dm-sans text-sm text-grade-black">
            ({tensCount} tens + {onesCount} ones)
          </div>
        </div>}
      {isDropTarget && canReceiveFromOthers && <div className="text-center mb-2 text-blue-600 font-bold text-sm animate-pulse bg-blue-100 rounded px-2 py-1">
          🎯 Drop all blocks here!
        </div>}
      <SimpleBoard 
        onAddTens={handleAddTens}
        onAddOnes={handleAddOnes}
        userAnswer={tensCount * 10 + onesCount}
        onBlocksChange={onBlocksChange}
        resetTrigger={resetTrigger}
        workspaceId={workspaceId}
        externalTensCount={tensCount}
        externalOnesCount={onesCount}
      />
    </div>
  );
};

export default WorkspaceSection;
