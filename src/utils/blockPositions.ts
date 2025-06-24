
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 15; // Reduced padding
const CONTAINER_WIDTH = 200; // Increased container width
const CONTAINER_HEIGHT = 280; // Keep height the same

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 24; // Smaller tens blocks
    const blockHeight = 18; // Smaller tens blocks
    const spacing = 3; // Good spacing
    const maxCols = 4; // Fixed to 4 columns
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 15 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 16; // Smaller square blocks
    const blockHeight = 16; // Smaller square blocks
    const spacing = 2; // Minimal spacing for ones
    const maxCols = 4; // Fixed to 4 columns
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
  const blockSize = 16; // Smaller for bundled ones blocks
  const spacing = 2; // Minimal spacing
  const maxCols = 4; // Fixed to 4 columns
  
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
