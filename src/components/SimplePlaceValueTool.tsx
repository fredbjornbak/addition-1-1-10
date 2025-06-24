
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SimpleQuestion from './SimpleQuestion';
import AdditionWorkspace from './AdditionWorkspace';
import SimpleFeedback from './SimpleFeedback';
import { generateSimpleProblems, SimpleProblem } from '../utils/simpleProblems';

const SimplePlaceValueTool = () => {
  const [problems, setProblems] = useState<SimpleProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  
  // First addend blocks
  const [firstNumberTens, setFirstNumberTens] = useState(0);
  const [firstNumberOnes, setFirstNumberOnes] = useState(0);
  
  // Second addend blocks
  const [secondNumberTens, setSecondNumberTens] = useState(0);
  const [secondNumberOnes, setSecondNumberOnes] = useState(0);
  
  // Total blocks
  const [totalTens, setTotalTens] = useState(0);
  const [totalOnes, setTotalOnes] = useState(0);
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    // Generate 10 problems when component mounts
    const newProblems = generateSimpleProblems();
    setProblems(newProblems);
  }, []);

  const currentProblem = problems[currentProblemIndex];
  const userAnswer = totalTens * 10 + totalOnes;

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
    
    const firstNumber = firstNumberTens * 10 + firstNumberOnes;
    const secondNumber = secondNumberTens * 10 + secondNumberOnes;
    const totalNumber = totalTens * 10 + totalOnes;
    
    // Check if all three numbers are correct
    const correct = firstNumber === currentProblem.num1 && 
                   secondNumber === currentProblem.num2 && 
                   totalNumber === currentProblem.answer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      // Auto-advance after 2 seconds
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
      {/* Question Display */}
      <SimpleQuestion 
        problem={currentProblem} 
        totalQuestions={problems.length} 
      />

      {/* Addition Workspace with three sections */}
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

      {/* Feedback */}
      <SimpleFeedback 
        isCorrect={isCorrect}
        correctAnswer={currentProblem?.answer || 0}
        show={showFeedback}
      />

      {/* Action Buttons */}
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

export default SimplePlaceValueTool;
