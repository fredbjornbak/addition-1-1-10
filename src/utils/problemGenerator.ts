
export interface Problem {
  num1: number;
  num2: number;
  answer: number;
  level: number;
  description: string;
}

export const generateProblem = (level: number): Problem => {
  let num1: number, num2: number, answer: number, description: string;

  switch (level) {
    case 1: // Single-digit addition with sums up to 10
      num1 = Math.floor(Math.random() * 6) + 1; // 1-6
      num2 = Math.floor(Math.random() * (10 - num1)) + 1; // Ensure sum ≤ 10
      answer = num1 + num2;
      description = "Add these numbers together using ones blocks!";
      break;

    case 2: // Single-digit addition with sums 11-20
      const possiblePairs = [
        [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
        [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
        [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
        [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]
      ];
      const pair = possiblePairs[Math.floor(Math.random() * possiblePairs.length)];
      num1 = pair[0];
      num2 = pair[1];
      answer = num1 + num2;
      description = "Try making 10 first, then add the rest!";
      break;

    case 3: // Adding 10 + single digit
      num1 = 10;
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = num1 + num2;
      description = "Start with 1 ten block, then add ones!";
      break;

    case 4: // Teen numbers + single digit (keeping sum ≤ 20)
      const teenBase = Math.floor(Math.random() * 8) + 11; // 11-18
      num1 = teenBase;
      num2 = Math.floor(Math.random() * (20 - teenBase)) + 1; // Ensure sum ≤ 20
      answer = num1 + num2;
      description = "Remember: teen numbers have 1 ten plus some ones!";
      break;

    default:
      num1 = 2;
      num2 = 3;
      answer = 5;
      description = "Let's practice addition!";
  }

  return { num1, num2, answer, level, description };
};
