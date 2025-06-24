
export const generatePosition = (type: 'tens' | 'ones', index: number) => {
  if (type === 'tens') {
    const row = Math.floor(index / 2);
    const col = index % 2;
    return {
      x: 20 + col * 60,
      y: 20 + row * 50
    };
  } else {
    const row = Math.floor(index / 5);
    const col = index % 5;
    return {
      x: 10 + col * 25,
      y: 10 + row * 25
    };
  }
};

export const generateBundledPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    positions.push({
      x: 15 + col * 20,
      y: 15 + row * 20
    });
  }
  return positions;
};
