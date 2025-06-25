
export interface SimpleProblem {
  num1: number;
  num2: number;
  answer: number;
  questionNumber: number;
}

export const generateSimpleProblems = (): SimpleProblem[] => {
  // Predefined sequence of 7 problems from easy to hard
  const predefinedProblems = [
    { num1: 6, num2: 7, answer: 13 },   // Problem 1: Basic addition, single digits
    { num1: 8, num2: 5, answer: 13 },   // Problem 2: Practice with same sum
    { num1: 9, num2: 4, answer: 13 },   // Problem 3: Different combinations
    { num1: 12, num2: 6, answer: 18 },  // Problem 4: Introducing teens
    { num1: 15, num2: 8, answer: 23 },  // Problem 5: Crossing into twenties
    { num1: 13, num2: 9, answer: 22 },  // Problem 6: More complex teen + single digit
    { num1: 16, num2: 7, answer: 23 }   // Problem 7: Most challenging
  ];

  return predefinedProblems.map((problem, index) => ({
    ...problem,
    questionNumber: index + 1
  }));
};
