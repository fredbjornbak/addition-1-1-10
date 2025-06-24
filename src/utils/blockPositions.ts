
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 8; // Small padding from edges
const CONTAINER_WIDTH = 180; // Actual usable container width
const CONTAINER_HEIGHT = 160; // Usable container height after header

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 40; // Increased from 35px to fit "10" better
    const blockHeight = 28; // Increased from 25px for better fit
    const spacing = 6; // Reduced spacing to fit more blocks
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 20; // Increased from 18px to fit "1" better
    const blockHeight = 20; // Increased from 18px
    const spacing = 3; // Reduced spacing
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  const blockSize = 20; // Increased from 18px
  const spacing = 3; // Reduced spacing
  const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockSize + spacing));
  
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / maxCols);
    const col = i % maxCols;
    positions.push({
      x: CONTAINER_PADDING + col * (blockSize + spacing),
      y: 10 + row * (blockSize + spacing)
    });
  }
  return positions;
};
