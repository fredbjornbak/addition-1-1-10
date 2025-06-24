
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: 15 + col * 60,
      y: 10 + row * 40  // Changed from 80 to 10 to make blocks visible
    };
  } else {
    const row = Math.floor(index / 6);
    const col = index % 6;
    return {
      x: 8 + col * 25,
      y: 10 + row * 25   // Changed from 80 to 10 to make blocks visible
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    positions.push({
      x: 15 + col * 22,
      y: 10 + row * 22   // Changed from 80 to 10 to make blocks visible
    });
  }
  return positions;
};
