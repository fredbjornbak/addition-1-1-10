
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 8; // Small padding from edges
const CONTAINER_WIDTH = 180; // Actual usable container width
const CONTAINER_HEIGHT = 160; // Usable container height after header

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 90; // Even bigger - increased from 70px
    const blockHeight = 65; // Even bigger - increased from 50px
    const spacing = 8; // More spacing for bigger blocks
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 48; // Even bigger - increased from 36px
    const blockHeight = 48; // Even bigger - increased from 36px
    const spacing = 6; // More spacing
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
  const blockSize = 48; // Even bigger - increased from 36px
  const spacing = 6; // More spacing
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
