
// Container dimensions for proper block positioning
const CONTAINER_PADDING = 15; // Keep padding the same
const CONTAINER_WIDTH = 200; // Keep container width
const CONTAINER_HEIGHT = 280; // Keep height the same

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 40; // Increased from 24
    const blockHeight = 32; // Increased from 18
    const spacing = 4; // Slightly increased spacing
    const maxRows = 3; // Limit to 3 rows
    const maxCols = Math.max(3, Math.ceil((index + 1) / maxRows)); // Dynamic columns based on total blocks
    const row = index % maxRows; // Use modulo to cycle through rows
    const col = Math.floor(index / maxRows); // Column based on which group of maxRows
    
    return {
      x: CONTAINER_PADDING + col * (blockWidth + spacing),
      y: 15 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 28; // Increased from 16
    const blockHeight = 28; // Increased from 16
    const spacing = 3; // Slightly increased spacing
    const maxRows = 3; // Limit to 3 rows
    const maxCols = Math.max(4, Math.ceil((index + 1) / maxRows)); // Dynamic columns, minimum 4
    const row = index % maxRows; // Use modulo to cycle through rows
    const col = Math.floor(index / maxRows); // Column based on which group of maxRows
    
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
  const maxRows = 3; // Limit to 3 rows
  
  for (let i = 0; i < 10; i++) {
    const row = i % maxRows; // Use modulo to cycle through rows
    const col = Math.floor(i / maxRows); // Column based on which group of maxRows
    positions.push({
      x: CONTAINER_PADDING + col * (blockSize + spacing),
      y: 15 + row * (blockSize + spacing)
    });
  }
  return positions;
};
