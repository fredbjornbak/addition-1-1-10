
// Generate grid-based position within column bounds for better alignment
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  const containerWidth = 240;
  const containerHeight = 180;
  const padding = 15;
  
  if (type === 'tens') {
    // Tens blocks are larger (100px wide x 40px high)
    const blockWidth = 100;
    const blockHeight = 40;
    const cols = 2;
    const spacing = 15;
    
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    return {
      x: padding + (col * (blockWidth + spacing)),
      y: padding + (row * (blockHeight + spacing))
    };
  } else {
    // Ones blocks are larger (50px wide x 50px high)
    const blockWidth = 50;
    const blockHeight = 50;
    const cols = 4;
    const spacing = 10;
    
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
      x: 15 + (col * 52),
      y: 15 + (row * 52)
    });
  }
  return positions;
};
