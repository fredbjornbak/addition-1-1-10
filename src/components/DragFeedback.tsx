
import React from 'react';
import { DragState } from '../hooks/useDragAndDrop';

interface DragFeedbackProps {
  dragState: DragState;
  onesCount: number;
  tensCount?: number; // Add tens count for bulk feedback
}

const DragFeedback: React.FC<DragFeedbackProps> = ({ dragState, onesCount, tensCount = 0 }) => {
  if (!dragState.isDragging) return null;

  const blockType = dragState.draggedBlock?.type;
  const totalBlocks = blockType === 'tens' ? tensCount : onesCount;
  const blockLabel = totalBlocks > 1 ? `all ${totalBlocks} ${blockType}` : `${blockType}`;

  return (
    <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50">
      <div className="font-bold">Dragging {blockLabel} blocks</div>
      {dragState.draggedBlock?.type === 'ones' && onesCount >= 10 && (
        <div className="text-xs">Drop on tens to regroup!</div>
      )}
    </div>
  );
};

export default DragFeedback;
