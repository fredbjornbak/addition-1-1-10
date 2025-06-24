
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const row = Math.floor(index / 3); // Increased columns to fit better
    const col = index % 3;
    return {
      x: 15 + col * 60, // Better spacing for larger column
      y: 80 + row * 40  // Start lower to account for header text
    };
  } else {
    const row = Math.floor(index / 6); // More columns for ones
    const col = index % 6;
    return {
      x: 8 + col * 25,   // Tighter spacing for ones
      y: 80 + row * 25   // Start lower to account for header text
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    positions.push({
      x: 15 + col * 22,  // Slightly adjusted for better fit
      y: 80 + row * 22   // Start lower to account for header text
    });
  }
  return positions;
};
