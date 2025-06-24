
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdditionQuestion from './AdditionQuestion';
import AdditionWorkspace from './AdditionWorkspace';
import SimpleFeedback from './SimpleFeedback';
import { generateVisualAdditionProblems, VisualAdditionProblem } from '../utils/visualAdditionProblems';

const VisualAdditionTool = () => {
  const [problems, setProblems] = useState<VisualAdditionProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [firstNumberTens, setFirstNumberTens] = useState(0);
  const [firstNumberOnes, setFirstNumberOnes] = useState(0);
  const [secondNumberTens, setSecondNumberTens] = useState(0);
  const [secondNumberOnes, setSecondNumberOnes] = useState(0);
  const [totalTens, setTotalTens] = useState(0);
  const [totalOnes, setTotalOnes] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    const newProblems = generateVisualAdditionProblems();
    setProblems(newProblems);
  }, []);

  useEffect(() => {
    setUserAnswer(totalTens * 10 + totalOnes);
  }, [totalTens, totalOnes]);

  const currentProblem = problems[currentProblemIndex];

  const handleFirstNumberChange = (tens: number, ones: number) => {
    setFirstNumberTens(tens);
    setFirstNumberOnes(ones);
  };

  const handleSecondNumberChange = (tens: number, ones: number) => {
    setSecondNumberTens(tens);
    setSecondNumberOnes(ones);
  };

  const handleTotalChange = (tens: number, ones: number) => {
    setTotalTens(tens);
    setTotalOnes(ones);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const correct = userAnswer === currentProblem.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  };

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
    setFirstNumberTens(0);
    setFirstNumberOnes(0);
    setSecondNumberTens(0);
    setSecondNumberOnes(0);
    setTotalTens(0);
    setTotalOnes(0);
    setUserAnswer(0);
    setResetTrigger(prev => prev + 1);
  };

  const startNewGame = () => {
    const newProblems = generateVisualAdditionProblems();
    setProblems(newProblems);
    setCurrentProblemIndex(0);
    resetBoard();
    setShowFeedback(false);
    setIsCorrect(null);
    setGameComplete(false);
  };

  if (problems.length === 0) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="font-space-grotesk text-grade-heading text-grade-purple font-bold">
          🎉 Great Job!
        </div>
        <div className="font-dm-sans text-grade-body-lg text-grade-black">
          You completed all 10 problems!
        </div>
        <Button 
          onClick={startNewGame}
          className="font-dm-sans text-grade-button font-bold bg-grade-purple hover:bg-grade-purple/90 text-white px-8 py-4 rounded-grade-pill min-h-[44px]"
        >
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AdditionQuestion 
        problem={currentProblem} 
        totalQuestions={problems.length} 
      />

      <AdditionWorkspace 
        problem={currentProblem}
        firstNumberTens={firstNumberTens}
        firstNumberOnes={firstNumberOnes}
        secondNumberTens={secondNumberTens}
        secondNumberOnes={secondNumberOnes}
        totalTens={totalTens}
        totalOnes={totalOnes}
        onFirstNumberChange={handleFirstNumberChange}
        onSecondNumberChange={handleSecondNumberChange}
        onTotalChange={handleTotalChange}
        resetTrigger={resetTrigger}
      />

      <SimpleFeedback 
        isCorrect={isCorrect}
        correctAnswer={currentProblem?.answer || 0}
        show={showFeedback}
      />

      <div className="flex justify-center gap-4">
        <Button 
          onClick={checkAnswer}
          disabled={userAnswer === 0}
          className="font-dm-sans text-grade-button font-bold bg-grade-blue hover:bg-grade-blue/90 text-white px-8 py-4 rounded-grade-pill min-h-[44px]"
        >
          Check Answer
        </Button>
        
        <Button 
          onClick={resetBoard}
          variant="outline"
          className="font-dm-sans text-grade-button font-bold border-grade-black text-grade-black hover:bg-grade-gray px-8 py-4 rounded-grade-pill min-h-[44px]"
        >
          Clear
        </Button>

        {showFeedback && !isCorrect && (
          <Button 
            onClick={nextQuestion}
            className="font-dm-sans text-grade-button font-bold bg-grade-orange hover:bg-grade-orange/90 text-white px-8 py-4 rounded-grade-pill min-h-[44px]"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default VisualAdditionTool;
