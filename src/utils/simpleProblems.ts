
export interface SimpleProblem {
  num1: number;
  num2: number;
  answer: number;
  questionNumber: number;
}

export const generateSimpleProblems = (): SimpleProblem[] => {
  const problems: SimpleProblem[] = [];
  
  for (let i = 1; i <= 10; i++) {
    let num1: number, num2: number;
    
    // Generate problems with sums up to 20
    num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const maxNum2 = Math.min(20 - num1, 10); // Ensure sum ≤ 20
    num2 = Math.floor(Math.random() * maxNum2) + 1; // 1 to maxNum2
    
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
