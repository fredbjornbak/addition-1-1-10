
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 15; // Keep padding the same
const CONTAINER_WIDTH = 200; // Keep container width
const CONTAINER_HEIGHT = 280; // Keep height the same

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 40; // Increased from 24
    const blockHeight = 32; // Increased from 18
    const spacing = 4; // Slightly increased spacing
    const maxCols = 2; // Changed from 3 to 2 columns for tens
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 15 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 28; // Increased from 16
    const blockHeight = 28; // Increased from 16
    const spacing = 3; // Slightly increased spacing
    const maxCols = 3; // Keep 3 columns for ones
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 15 + row * (blockHeight + spacing) // Start from top of container
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  const blockSize = 28; // Increased from 16 for bundled ones blocks
  const spacing = 3; // Slightly increased spacing
  const maxCols = 3; // Limit to 3 columns
  
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / maxCols);
    const col = i % maxCols;
    positions.push({
      x: CONTAINER_PADDING + col * (blockSize + spacing),
      y: 15 + row * (blockSize + spacing)
    });
  }
  return positions;
};
