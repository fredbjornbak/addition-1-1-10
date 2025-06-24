
import { useState, useRef } from 'react';
import { Block } from '../types/placeValue';

export interface CrossWorkspaceDragState {
  isDragging: boolean;
  draggedBlock: Block | null;
  sourceWorkspace: string | null;
  targetWorkspace: string | null;
}

export const useCrossWorkspaceDrag = () => {
  const [dragState, setDragState] = useState<CrossWorkspaceDragState>({
    isDragging: false,
    draggedBlock: null,
    sourceWorkspace: null,
    targetWorkspace: null
  });

  const dragCounter = useRef(0);

  const handleCrossWorkspaceDragStart = (block: Block, sourceWorkspace: string) => {
    setDragState({
      isDragging: true,
      draggedBlock: block,
      sourceWorkspace,
      targetWorkspace: null
    });
  };

  const handleCrossWorkspaceDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedBlock: null,
      sourceWorkspace: null,
      targetWorkspace: null
    });
    dragCounter.current = 0;
  };

  const handleCrossWorkspaceDragEnter = (targetWorkspace: string) => {
    dragCounter.current++;
    setDragState(prev => ({ ...prev, targetWorkspace }));
  };

  const handleCrossWorkspaceDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragState(prev => ({ ...prev, targetWorkspace: null }));
    }
  };

  return {
    dragState,
    handleCrossWorkspaceDragStart,
    handleCrossWorkspaceDragEnd,
    handleCrossWorkspaceDragEnter,
    handleCrossWorkspaceDragLeave
  };
};
