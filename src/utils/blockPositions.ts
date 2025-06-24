
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
    
    // Calculate how many blocks are in the current row
    const totalBlocks = index + 1; // Total blocks up to this index
    const blocksInCurrentRow = Math.min(maxCols, totalBlocks - (row * maxCols));
    const totalRowWidth = blocksInCurrentRow * blockWidth + (blocksInCurrentRow - 1) * spacing;
    const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
    
    return {
      x: centerOffset + col * (blockWidth + spacing),
      y: CONTAINER_PADDING + row * (blockHeight + spacing)
    };
  } else {
    const blockWidth = 20; // Slightly larger square blocks
    const blockHeight = 20; // Slightly larger square blocks
    const spacing = 4; // More generous spacing for ones
    const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockWidth + spacing));
    const row = Math.floor(index / maxCols);
    const col = index % maxCols;
    
    // Calculate how many blocks are in the current row
    const totalBlocks = index + 1; // Total blocks up to this index
    const blocksInCurrentRow = Math.min(maxCols, totalBlocks - (row * maxCols));
    const totalRowWidth = blocksInCurrentRow * blockWidth + (blocksInCurrentRow - 1) * spacing;
    const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
    
    return {
      x: centerOffset + col * (blockWidth + spacing),
      y: CONTAINER_PADDING + row * (blockHeight + spacing)
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  const blockSize = 20; // Larger for bundled ones blocks
  const spacing = 4; // More generous spacing
  const maxCols = Math.floor((CONTAINER_WIDTH - CONTAINER_PADDING * 2) / (blockSize + spacing));
  
  // Calculate total width for centering 10 blocks
  const blocksInRow = Math.min(10, maxCols);
  const totalRowWidth = blocksInRow * blockSize + (blocksInRow - 1) * spacing;
  const centerOffset = (CONTAINER_WIDTH - totalRowWidth) / 2;
  
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / maxCols);
    const col = i % maxCols;
    positions.push({
      x: centerOffset + col * (blockSize + spacing),
      y: CONTAINER_PADDING + row * (blockSize + spacing)
    });
  }
  return positions;
};
