
// Generate random position within column bounds for circular blocks
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  const columnWidth = 280;
  const blockSize = type === 'tens' ? 60 : 50;
  const maxX = columnWidth - blockSize - 20;
  const maxY = 200;
  
  // Arrange in a loose grid pattern with some randomness
  const cols = type === 'tens' ? 3 : 4;
  const col = index % cols;
  const row = Math.floor(index / cols);
  
  const baseX = (col * (maxX / (cols - 1))) + Math.random() * 15;
  const baseY = 60 + (row * 70) + Math.random() * 15;
  
  return {
    x: Math.max(10, Math.min(maxX, baseX)),
    y: Math.max(10, Math.min(maxY, baseY))
  };
};

// Generate bundled positions for 10 ones blocks in a tight formation
export const generateBundledPositions = () => {
  const positions = [];
  const centerX = 120;
  const centerY = 120;
  
  for (let i = 0; i < 10; i++) {
    const angle = (i * 36) * (Math.PI / 180); // 36 degrees apart
    const radius = i < 5 ? 30 : 50; // Inner and outer circles
    
    positions.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }
  return positions;
};
