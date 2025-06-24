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
  return;
};
export default DragFeedback;