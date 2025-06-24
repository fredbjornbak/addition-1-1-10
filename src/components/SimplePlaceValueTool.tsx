
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
    totalTens,
    totalOnes,
    handleFirstNumberChange,
    handleSecondNumberChange,
    handleTotalChange,
    resetAllCounts
  } = useBlockCounts(resetTrigger);

  const userAnswer = totalTens * 10 + totalOnes;

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const totalNumber = totalTens * 10 + totalOnes;
    
    // Primary check: Is the total correct?
    const isTotalCorrect = totalNumber === currentProblem.answer;
    
    // Secondary check: Are the individual numbers represented correctly (optional)
    const firstNumber = firstNumberTens * 10 + firstNumberOnes;
    const secondNumber = secondNumberTens * 10 + secondNumberOnes;
    const areIndividualNumbersCorrect = firstNumber === currentProblem.num1 && 
                                      secondNumber === currentProblem.num2;
    
    // Accept the answer if total is correct (flexible approach)
    // OR if all three are correct (traditional approach)
    const correct = isTotalCorrect || areIndividualNumbersCorrect;
    
    console.log('📊 Answer check:', {
      totalCorrect: isTotalCorrect,
      individualCorrect: areIndividualNumbersCorrect,
      finalResult: correct,
      expected: currentProblem.answer,
      actual: totalNumber
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
