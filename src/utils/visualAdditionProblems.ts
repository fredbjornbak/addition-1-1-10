
export interface VisualAdditionProblem {
  num1: number;
  num2: number;
  answer: number;
  questionNumber: number;
}

export const generateVisualAdditionProblems = (): VisualAdditionProblem[] => {
  const problems: VisualAdditionProblem[] = [];
  
  for (let i = 1; i <= 10; i++) {
    let num1: number, num2: number;
    
    // Generate 2-digit addition problems (10-99)
    num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    
    // Ensure sum doesn't exceed 99
    const maxNum2 = Math.min(99 - num1, 89);
    const minNum2 = Math.max(10, 1);
    num2 = Math.floor(Math.random() * (maxNum2 - minNum2 + 1)) + minNum2;
    
    const answer = num1 + num2;
    
    problems.push({
      num1,
      num2,
      answer,
      questionNumber: i
    });
  }
  
  return problems;
};
