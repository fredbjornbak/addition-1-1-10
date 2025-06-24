
export interface VisualAdditionProblem {
  num1: number;
  num2: number;
  answer: number;
  questionNumber: number;
  difficulty: 'easy' | 'medium-easy' | 'medium' | 'medium-hard' | 'hard';
  requiresRegrouping: boolean;
}

// Helper function to check if a problem requires regrouping
const requiresRegrouping = (num1: number, num2: number): boolean => {
  const onesSum = (num1 % 10) + (num2 % 10);
  return onesSum >= 10;
};

// Generate random number within range
const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate problems for each difficulty level
const generateEasyProblems = (): { num1: number; num2: number }[] => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      num1: randomInRange(1, 5),
      num2: randomInRange(1, 5)
    });
  }
  return problems;
};

const generateMediumEasyProblems = (): { num1: number; num2: number }[] => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      num1: randomInRange(1, 8),
      num2: randomInRange(1, 8)
    });
  }
  return problems;
};

const generateMediumProblems = (): { num1: number; num2: number }[] => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      num1: randomInRange(1, 12),
      num2: randomInRange(1, 12)
    });
  }
  return problems;
};

const generateMediumHardProblems = (): { num1: number; num2: number }[] => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      num1: randomInRange(1, 16),
      num2: randomInRange(1, 16)
    });
  }
  return problems;
};

const generateHardProblems = (): { num1: number; num2: number }[] => {
  const problems = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      num1: randomInRange(1, 20),
      num2: randomInRange(1, 20)
    });
  }
  return problems;
};

export const generateVisualAdditionProblems = (): VisualAdditionProblem[] => {
  const problems: VisualAdditionProblem[] = [];
  
  // Define difficulty levels and their generators
  const difficultyLevels = [
    { difficulty: 'easy' as const, generator: generateEasyProblems, count: 2 },
    { difficulty: 'medium-easy' as const, generator: generateMediumEasyProblems, count: 2 },
    { difficulty: 'medium' as const, generator: generateMediumProblems, count: 2 },
    { difficulty: 'medium-hard' as const, generator: generateMediumHardProblems, count: 2 },
    { difficulty: 'hard' as const, generator: generateHardProblems, count: 2 }
  ];
  
  let questionNumber = 1;
  
  // Generate problems for each difficulty level
  difficultyLevels.forEach(({ difficulty, generator, count }) => {
    const possibleProblems = generator();
    
    // Randomly select problems from the generated pool
    const shuffled = possibleProblems.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    selected.forEach(({ num1, num2 }) => {
      const answer = num1 + num2;
      const needsRegrouping = requiresRegrouping(num1, num2);
      
      problems.push({
        num1,
        num2,
        answer,
        questionNumber,
        difficulty,
        requiresRegrouping: needsRegrouping
      });
      
      questionNumber++;
    });
  });
  
  return problems;
};
