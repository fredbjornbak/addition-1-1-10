
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
    num2 = Math.floor(Math.random() * 20) + 1; // 1-20
    
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
