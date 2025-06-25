
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SimpleQuestion from './SimpleQuestion';
import AdditionWorkspace from './AdditionWorkspace';
import SimpleFeedback from './SimpleFeedback';
import GameComplete from './GameComplete';
import { useGameState } from '../hooks/useGameState';
import { useBlockCounts } from '../hooks/useBlockCounts';

const SimplePlaceValueTool = () => {
  const {
    problems,
    currentProblem,
    showFeedback,
    setShowFeedback,
    isCorrect,
    setIsCorrect,
    gameComplete,
    resetTrigger,
    nextQuestion,
    resetBoard,
    startNewGame
  } = useGameState();

  const {
    firstNumberTens,
    firstNumberOnes,
    secondNumberTens,
    secondNumberOnes,
    handleFirstNumberChange,
    handleSecondNumberChange,
    resetAllCounts
  } = useBlockCounts(resetTrigger);

  // Automatically check answer whenever block counts change
  useEffect(() => {
    if (!currentProblem) return;
    
    const firstNumber = firstNumberTens * 10 + firstNumberOnes;
    const secondNumber = secondNumberTens * 10 + secondNumberOnes;
    
    // Check if both numbers are correctly represented
    const firstNumberCorrect = firstNumber === currentProblem.num1;
    const secondNumberCorrect = secondNumber === currentProblem.num2;
    
    console.log('🔍 Auto-checking:', {
      firstNumber,
      secondNumber,
      expected: [currentProblem.num1, currentProblem.num2],
      firstCorrect: firstNumberCorrect,
      secondCorrect: secondNumberCorrect
    });

    if (firstNumberCorrect && secondNumberCorrect) {
      console.log('✅ Both numbers correct! Auto-advancing...');
      setIsCorrect(true);
      setShowFeedback(true);
      
      // Auto-advance after 2 seconds
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      // Reset feedback if numbers are not correct
      setShowFeedback(false);
      setIsCorrect(null);
    }
  }, [firstNumberTens, firstNumberOnes, secondNumberTens, secondNumberOnes, currentProblem, setIsCorrect, setShowFeedback, nextQuestion]);

  const handleResetBoard = () => {
    resetAllCounts();
    resetBoard();
  };

  if (problems.length === 0) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (gameComplete) {
    return <GameComplete onStartNewGame={startNewGame} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Question Display */}
      <SimpleQuestion problem={currentProblem} totalQuestions={problems.length} />

      {/* Addition Workspace with two sections */}
      <AdditionWorkspace 
        problem={currentProblem}
        firstNumberTens={firstNumberTens}
        firstNumberOnes={firstNumberOnes}
        secondNumberTens={secondNumberTens}
        secondNumberOnes={secondNumberOnes}
        onFirstNumberChange={handleFirstNumberChange}
        onSecondNumberChange={handleSecondNumberChange}
        resetTrigger={resetTrigger}
      />

      {/* Feedback */}
      <SimpleFeedback 
        isCorrect={isCorrect}
        correctAnswer={currentProblem?.answer || 0}
        show={showFeedback}
      />

      {/* Action Buttons - Only Clear button now */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleResetBoard}
          variant="outline"
          className="font-dm-sans text-grade-button font-bold border-grade-black text-grade-black hover:bg-grade-gray px-8 py-4 rounded-grade-pill min-h-[44px]"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default SimplePlaceValueTool;
