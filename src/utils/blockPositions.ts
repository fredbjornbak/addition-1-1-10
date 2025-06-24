
// Generate random position within column bounds
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  const columnWidth = 250;
  const maxX = type === 'tens' ? columnWidth - 80 : columnWidth - 40;
  const maxY = 200;
  
  // Arrange in a loose grid pattern
  const cols = type === 'tens' ? 2 : 5;
  const col = index % cols;
  const row = Math.floor(index / cols);
  
  return {
    x: (col * (maxX / cols)) + Math.random() * 20,
    y: (row * 45) + Math.random() * 15
  };
};

// Generate bundled positions for 10 ones blocks
export const generateBundledPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);
    positions.push({
      x: 50 + (col * 35),
      y: 80 + (row * 35)
    });
  }
  return positions;
};
