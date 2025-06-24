
import { useState, useRef } from 'react';
import { Block } from '../types/placeValue';

export interface DragState {
  isDragging: boolean;
  draggedBlock: Block | null;
  draggedCount: number;
  isOver: 'tens' | 'ones' | null;
}

export const useDragAndDrop = () => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedBlock: null,
    draggedCount: 0,
    isOver: null
  });

  const dragCounter = useRef(0);

  const handleDragStart = (block: Block, onesCount: number = 0) => {
    setDragState({
      isDragging: true,
      draggedBlock: block,
      draggedCount: block.type === 'ones' ? Math.min(10, onesCount) : 1,
      isOver: null
    });
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedBlock: null,
      draggedCount: 0,
      isOver: null
    });
    dragCounter.current = 0;
  };

  const handleDragEnter = (columnType: 'tens' | 'ones') => {
    dragCounter.current++;
    setDragState(prev => ({ ...prev, isOver: columnType }));
  };

  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragState(prev => ({ ...prev, isOver: null }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return {
    dragState,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver
  };
};
