
import React from 'react';
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

  const userAnswer = (firstNumberTens * 10 + firstNumberOnes) + (secondNumberTens * 10 + secondNumberOnes);

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const firstNumber = firstNumberTens * 10 + firstNumberOnes;
    const secondNumber = secondNumberTens * 10 + secondNumberOnes;
    const totalNumber = firstNumber + secondNumber;
    
    // Check if the user has represented both numbers correctly and they add up to the correct answer
    const areNumbersCorrect = firstNumber === currentProblem.num1 && 
                            secondNumber === currentProblem.num2;
    const isTotalCorrect = totalNumber === currentProblem.answer;
    
    // Accept the answer if both individual representations are correct OR if the total is correct
    const correct = areNumbersCorrect || isTotalCorrect;
    
    console.log('📊 Answer check:', {
      firstNumber,
      secondNumber,
      totalNumber,
      expected: currentProblem.answer,
      areNumbersCorrect,
      isTotalCorrect,
      finalResult: correct
    });
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      // Auto-advance after 2 seconds
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  };

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
      <SimpleQuestion 
        problem={currentProblem} 
        totalQuestions={problems.length} 
      />

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
          onClick={handleResetBoard}
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
