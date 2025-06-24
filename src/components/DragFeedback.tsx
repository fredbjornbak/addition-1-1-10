
import React from 'react';
import { DragState } from '../hooks/useDragAndDrop';

interface DragFeedbackProps {
  dragState: DragState;
  onesCount: number;
}

const DragFeedback: React.FC<DragFeedbackProps> = ({ dragState, onesCount }) => {
  if (!dragState.isDragging) return null;

  return (
    <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50">
      Dragging {dragState.draggedBlock?.type} block
      {dragState.draggedBlock?.type === 'ones' && onesCount >= 10 && (
        <div className="text-xs">Drop on tens to regroup!</div>
      )}
    </div>
  );
};

export default DragFeedback;
