
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SimpleQuestion from './SimpleQuestion';
import SimpleBoard from './SimpleBoard';
import SimpleFeedback from './SimpleFeedback';
import { generateSimpleProblems, SimpleProblem } from '../utils/simpleProblems';

const SimplePlaceValueTool = () => {
  const [problems, setProblems] = useState<SimpleProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [tensBlocks, setTensBlocks] = useState(0);
  const [onesBlocks, setOnesBlocks] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    // Generate 10 problems when component mounts
    const newProblems = generateSimpleProblems();
    setProblems(newProblems);
  }, []);

  useEffect(() => {
    setUserAnswer(tensBlocks * 10 + onesBlocks);
  }, [tensBlocks, onesBlocks]);

  const currentProblem = problems[currentProblemIndex];

  const handleAddTens = () => {
    setTensBlocks(prev => prev + 1);
  };

  const handleAddOnes = () => {
    setOnesBlocks(prev => prev + 1);
  };

  const handleBlocksChange = (tens: number, ones: number) => {
    setTensBlocks(tens);
    setOnesBlocks(ones);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const correct = userAnswer === currentProblem.answer;
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
    setTensBlocks(0);
    setOnesBlocks(0);
    setUserAnswer(0);
    setResetTrigger(prev => prev + 1); // Trigger reset in SimpleBoard
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Question Display */}
      <SimpleQuestion 
        problem={currentProblem} 
        totalQuestions={problems.length} 
      />

      {/* Place Value Board */}
      <SimpleBoard 
        tensBlocks={tensBlocks}
        onesBlocks={onesBlocks}
        onAddTens={handleAddTens}
        onAddOnes={handleAddOnes}
        userAnswer={userAnswer}
        onBlocksChange={handleBlocksChange}
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
