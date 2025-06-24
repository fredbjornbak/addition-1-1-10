
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 16; // Account for PlaceValueColumn's p-2 padding (8px each side)
const CONTAINER_WIDTH = 200; // Reduced to match actual usable space after padding
const CONTAINER_HEIGHT = 280; // Keep height the same

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 28; // Slightly smaller to ensure fit
    const blockHeight = 22; // Slightly smaller to ensure fit
    const spacing = 3; // Minimal spacing
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 18; // Slightly smaller square blocks
    const blockHeight = 18; // Slightly smaller square blocks
    const spacing = 2; // Minimal spacing for ones
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
  const blockSize = 18; // Smaller for bundled ones blocks
  const spacing = 2; // Minimal spacing
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
