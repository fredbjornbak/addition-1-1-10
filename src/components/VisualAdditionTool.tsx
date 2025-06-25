
import React from 'react';
import { Button } from '@/components/ui/button';
import AdditionQuestion from './AdditionQuestion';
import AdditionWorkspace from './AdditionWorkspace';
import FeedbackDisplay from './FeedbackDisplay';
import GameComplete from './GameComplete';
import { useGameState } from '../hooks/useGameState';
import { useBlockCounts } from '../hooks/useBlockCounts';

const VisualAdditionTool = () => {
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
    
    const correct = userAnswer === currentProblem.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
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
        onFirstNumberChange={handleFirstNumberChange}
        onSecondNumberChange={handleSecondNumberChange}
        resetTrigger={resetTrigger}
      />

      <FeedbackDisplay 
        showFeedback={showFeedback}
        isCorrect={isCorrect || false}
        celebrating={isCorrect || false}
        problem={currentProblem}
        showHint={false}
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

export default VisualAdditionTool;
