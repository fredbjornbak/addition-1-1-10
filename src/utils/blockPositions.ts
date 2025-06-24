
// Generate grid-based position within column bounds for better alignment
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  const containerWidth = 200;
  const containerHeight = 90;
  const padding = 10;
  
  if (type === 'tens') {
    // Tens blocks are larger (80px wide)
    const blockWidth = 80;
    const blockHeight = 30;
    const cols = 2;
    const spacing = 10;
    
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    return {
      x: padding + (col * (blockWidth + spacing)),
      y: padding + (row * (blockHeight + spacing))
    };
  } else {
    // Ones blocks are smaller (40px wide)
    const blockWidth = 40;
    const blockHeight = 40;
    const cols = 4;
    const spacing = 8;
    
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    return {
      x: padding + (col * (blockWidth + spacing)),
      y: padding + (row * (blockHeight + spacing))
    };
  }
};

// Generate bundled positions for 10 ones blocks
export const generateBundledPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    positions.push({
      x: 10 + (col * 42),
      y: 10 + (row * 42)
    });
  }
  return positions;
};
