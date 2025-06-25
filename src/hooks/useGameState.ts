
import { useState, useEffect } from 'react';
import { generateSimpleProblems, SimpleProblem } from '../utils/simpleProblems';

export const useGameState = () => {
  const [problems, setProblems] = useState<SimpleProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    // Generate 7 predefined problems when component mounts
    const newProblems = generateSimpleProblems();
    setProblems(newProblems);
  }, []);

  const currentProblem = problems[currentProblemIndex];

  const nextQuestion = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      resetBoard();
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      setGameComplete(true);
    }
  };

  const resetBoard = () => {
    setResetTrigger(prev => prev + 1);
  };

  const startNewGame = () => {
    const newProblems = generateSimpleProblems();
    setProblems(newProblems);
    setCurrentProblemIndex(0);
    resetBoard();
    setShowFeedback(false);
    setIsCorrect(null);
    setGameComplete(false);
  };

  return {
    problems,
    currentProblem,
    currentProblemIndex,
    showFeedback,
    setShowFeedback,
    isCorrect,
    setIsCorrect,
    gameComplete,
    resetTrigger,
    nextQuestion,
    resetBoard,
    startNewGame
  };
};
