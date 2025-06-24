

// Container dimensions for proper block positioning
const CONTAINER_PADDING = 20; // Padding to move blocks away from edges
const CONTAINER_WIDTH = 260; // Increased width to accommodate blocks properly
const CONTAINER_HEIGHT = 280; // Keep height the same

export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const blockWidth = 30; // Slightly larger for better readability
    const blockHeight = 24; // Slightly larger for better readability
    const spacing = 4; // More generous spacing
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    // Calculate total width of blocks in current row to center them
    const blocksInThisRow = Math.min(maxCols, Math.ceil((index + 1) / maxCols) === row + 1 ? 
      ((index % maxCols) + 1) : maxCols);
    const totalRowWidth = blocksInThisRow * blockWidth + (blocksInThisRow - 1) * spacing;
    const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
    
    return {
      x: centerOffset + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  } else {
    const blockWidth = 20; // Slightly larger square blocks
    const blockHeight = 20; // Slightly larger square blocks
    const spacing = 4; // More generous spacing for ones
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    // Calculate total width of blocks in current row to center them
    const blocksInThisRow = Math.min(maxCols, Math.ceil((index + 1) / maxCols) === row + 1 ? 
      ((index % maxCols) + 1) : maxCols);
    const totalRowWidth = blocksInThisRow * blockWidth + (blocksInThisRow - 1) * spacing;
    const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
    
    return {
      x: centerOffset + col * (blockWidth + spacing),
      y: 10 + row * (blockHeight + spacing) // Start from top of container
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  const blockSize = 20; // Larger for bundled ones blocks
  const spacing = 4; // More generous spacing
  const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockSize + spacing));
  
  // Calculate total width for centering
  const totalRowWidth = Math.min(10, maxCols) * blockSize + (Math.min(10, maxCols) - 1) * spacing;
  const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
  
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / maxCols);
    const col = i % maxCols;
    positions.push({
      x: centerOffset + col * (blockSize + spacing),
      y: 10 + row * (blockSize + spacing)
    });
  }
  return positions;
};

