
export interface Block {
  id: string;
  value: number;
  type: 'tens' | 'ones';
  position: { x: number; y: number };
}

export interface SimpleBoardProps {
  tensBlocks: number;
  onesBlocks: number;
  onAddTens: () => void;
  onAddOnes: () => void;
  userAnswer: number;
  onBlocksChange: (tens: number, ones: number) => void;
  resetTrigger: number;
}
