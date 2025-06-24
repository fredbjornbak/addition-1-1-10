
import React, { useState, useEffect } from 'react';
import CompactNumberArea from './CompactNumberArea';
import { generateVisualAdditionProblems, VisualAdditionProblem } from '../utils/visualAdditionProblems';

const CompactAdditionWorkspace = () => {
  const [problems, setProblems] = useState<VisualAdditionProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [firstNumberBlocks, setFirstNumberBlocks] = useState(0);
  const [secondNumberBlocks, setSecondNumberBlocks] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const newProblems = generateVisualAdditionProblems();
    setProblems(newProblems);
  }, []);

  useEffect(() => {
    if (totalBlocks > 0) {
      const currentProblem = problems[currentProblemIndex];
      if (currentProblem && totalBlocks === currentProblem.answer) {
        setIsCorrect(true);
        setShowResult(true);
        
        setTimeout(() => {
          nextProblem();
        }, 2000);
      } else if (totalBlocks > 0) {
        setIsCorrect(false);
        setShowResult(true);
        
        setTimeout(() => {
          setShowResult(false);
        }, 1500);
      }
    }
  }, [totalBlocks, problems, currentProblemIndex]);

  const currentProblem = problems[currentProblemIndex];

  const handleFirstNumberChange = (count: number) => {
    setFirstNumberBlocks(count);
  };

  const handleSecondNumberChange = (count: number) => {
    setSecondNumberBlocks(count);
  };

  const handleTotalDrop = (count: number) => {
    const newTotal = totalBlocks + count;
    setTotalBlocks(newTotal);
  };

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      resetBoard();
    } else {
      // Game complete - restart
      setCurrentProblemIndex(0);
      resetBoard();
    }
  };

  const resetBoard = () => {
    setFirstNumberBlocks(0);
    setSecondNumberBlocks(0);
    setTotalBlocks(0);
    setShowResult(false);
    setIsCorrect(false);
    setResetTrigger(prev => prev + 1);
  };

  if (problems.length === 0 || !currentProblem) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div className="flex items-center gap-8">
        {/* First Number */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-gray-700">{currentProblem.num1}</div>
          <CompactNumberArea
            targetNumber={currentProblem.num1}
            onBlocksChange={handleFirstNumberChange}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Plus Sign */}
        <div className="text-4xl font-bold text-gray-600">+</div>

        {/* Second Number */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-gray-700">{currentProblem.num2}</div>
          <CompactNumberArea
            targetNumber={currentProblem.num2}
            onBlocksChange={handleSecondNumberChange}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* Equals Sign */}
        <div className="text-4xl font-bold text-gray-600">=</div>

        {/* Total Area */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-gray-700">
            {showResult ? (
              <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                {isCorrect ? '✓' : '✗'} {currentProblem.answer}
              </span>
            ) : (
              '?'
            )}
          </div>
          <CompactNumberArea
            targetNumber={currentProblem.answer}
            onBlocksChange={() => {}}
            resetTrigger={resetTrigger}
            isTotal={true}
            onDrop={handleTotalDrop}
          />
          <div className="text-sm text-gray-500">
            Blocks: {totalBlocks}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 right-4 text-sm text-gray-500">
        {currentProblemIndex + 1} / {problems.length}
      </div>
    </div>
  );
};

export default CompactAdditionWorkspace;
