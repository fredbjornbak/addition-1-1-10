
export interface VisualAdditionProblem {
  questionNumber: number;
  num1: number;
  num2: number;
  answer: number;
}

export const generateVisualAdditionProblems = (): VisualAdditionProblem[] => {
  const problems: VisualAdditionProblem[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const num1 = Math.floor(Math.random() * 50) + 10; // 10-59
    const num2 = Math.floor(Math.random() * 30) + 5;  // 5-34
    
    problems.push({
      questionNumber: i,
      num1,
      num2,
      answer: num1 + num2
    });
  }
  
  return problems;
};
