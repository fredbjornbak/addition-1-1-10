
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
    
    // Generate simple addition problems (1-20)
    num1 = Math.floor(Math.random() * 20) + 1; // 1-20
    
    // Ensure sum doesn't exceed 40 (20+20)
    const maxNum2 = Math.min(20, 40 - num1);
    const minNum2 = 1;
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
