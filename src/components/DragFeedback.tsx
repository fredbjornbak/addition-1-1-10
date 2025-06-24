
import React from 'react';
import { DragState } from '../hooks/useDragAndDrop';
import { Block } from '../types/placeValue';

interface DragFeedbackProps {
  dragState: DragState;
  onesCount: number;
  tensCount?: number;
  draggedBlocks?: Block[];
}

const DragFeedback: React.FC<DragFeedbackProps> = ({ 
  dragState, 
  onesCount, 
  tensCount = 0, 
  draggedBlocks = [] 
}) => {
  if (!dragState.isDragging) return null;

  const blockType = dragState.draggedBlock?.type;
  const totalBlocks = blockType === 'tens' ? tensCount : onesCount;
  const totalValue = draggedBlocks.reduce((sum, block) => sum + block.value, 0);
  
  const blockLabel = totalBlocks > 1 ? `all ${totalBlocks} ${blockType}` : `${blockType}`;

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 border-2 border-white/20">
      <div className="font-bold text-lg">
        Dragging {blockLabel}
      </div>
      <div className="text-sm opacity-90">
        Total Value: {totalValue}
      </div>
      {draggedBlocks.length > 0 && (
        <div className="flex items-center mt-2 space-x-1">
          {draggedBlocks.slice(0, 5).map((block, index) => (
            <div
              key={block.id}
              className={`w-4 h-4 rounded text-xs flex items-center justify-center font-bold ${
                block.type === 'tens' ? 'bg-blue-400' : 'bg-orange-400'
              }`}
            >
              {block.value}
            </div>
          ))}
          {draggedBlocks.length > 5 && (
            <div className="text-xs opacity-75">
              +{draggedBlocks.length - 5} more
            </div>
          )}
        </div>
      )}
      {dragState.draggedBlock?.type === 'ones' && onesCount >= 10 && (
        <div className="text-xs mt-1 opacity-75">Drop on tens to regroup!</div>
      )}
    </div>
  );
};

export default DragFeedback;
