
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 6; // 24px converted to relative units
const CONTAINER_WIDTH = 200; // Approximate container width
const CONTAINER_HEIGHT = 180; // Visible container height after header

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 50;
    const blockHeight = 30;
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + 10));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + 10),
      y: 60 + row * (blockHeight + 10) // Start below header
    };
  } else {
    const blockWidth = 20;
    const blockHeight = 20;
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + 5));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + 5),
      y: 60 + row * (blockHeight + 5) // Start below header
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  const blockSize = 20;
  const spacing = 2;
  const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockSize + spacing));
  
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / maxCols);
    const col = i % maxCols;
    positions.push({
      x: CONTAINER_PADDING + col * (blockSize + spacing),
      y: 60 + row * (blockSize + spacing)
    });
  }
  return positions;
};
