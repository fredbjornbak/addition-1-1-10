export interface Block {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  position: {
    x: number;
    y: number;
  };
  isBeingDragged?: boolean;
}

export interface SimpleBoardProps {
  onAddTens: () => void;
  onAddOnes: () => void;
  userAnswer: number;
  onBlocksChange: (tens: number, ones: number) => void;
  resetTrigger: number;
  workspaceId?: string;
}

export interface PlaceValueColumnProps {
  type: 'tens' | 'ones';
  blocks: Block[];
  hasBundle?: boolean;
  onAddBlock: () => void;
  onRemoveBlock: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (e: React.DragEvent, targetType: 'tens' | 'ones') => void;
  onDragEnter: (columnType: 'tens' | 'ones') => void;
  onDragLeave: () => void;
  onDragOver: (e: React.DragEvent) => void;
  isDropTarget?: boolean;
  isGrouping?: boolean;
  workspaceId?: string;
}
