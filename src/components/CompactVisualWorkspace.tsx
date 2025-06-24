
import React, { useState, useEffect } from 'react';
import PlaceValueNumberArea from './PlaceValueNumberArea';
import PlaceValueTotalArea from './PlaceValueTotalArea';
import { generateVisualAdditionProblems, VisualAdditionProblem } from '../utils/visualAdditionProblems';

const CompactVisualWorkspace = () => {
  const [problems, setProblems] = useState<VisualAdditionProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const newProblems = generateVisualAdditionProblems();
    setProblems(newProblems);
    console.log('Generated problems:', newProblems);
  }, []);

  const currentProblem = problems[currentProblemIndex];

  useEffect(() => {
    if (currentProblem && totalBlocks === currentProblem.answer && totalBlocks > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        nextProblem();
      }, 1500);
    }
  }, [totalBlocks, currentProblem]);

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setTotalBlocks(0);
      setResetTrigger(prev => prev + 1);
      setShowSuccess(false);
    } else {
      // Game complete - restart with new randomized problems
      const newProblems = generateVisualAdditionProblems();
      setProblems(newProblems);
      setCurrentProblemIndex(0);
      setTotalBlocks(0);
      setResetTrigger(prev => prev + 1);
      setShowSuccess(false);
      console.log('Game restarted with new problems:', newProblems);
    }
  };

  const handleDragStart = (blocks: number) => {
    console.log('Dragging blocks:', blocks);
  };

  if (!currentProblem) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Current Problem Display */}
      <div className="text-center mb-6">
        <div className="font-space-grotesk text-2xl font-bold text-grade-black">
          {currentProblem.num1} + {currentProblem.num2} = ?
        </div>
        <div className="text-sm text-gray-600 font-dm-sans mt-1">
          Question {currentProblem.questionNumber} of {problems.length} • {currentProblem.difficulty}
          {currentProblem.requiresRegrouping && ' • Regrouping Required'}
        </div>
      </div>

      {/* Main Workspace - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side - Addend Areas */}
        <div className="lg:col-span-2 space-y-4">
          {/* First Number */}
          <PlaceValueNumberArea
            number={currentProblem.num1}
            backgroundColor="rgba(111, 0, 255, 0.1)"
            borderColor="#6F00FF"
            resetTrigger={resetTrigger}
            onDragStart={handleDragStart}
          />

          {/* Plus Symbol */}
          <div className="text-center">
            <div className="font-space-grotesk text-3xl font-bold text-grade-purple">+</div>
          </div>

          {/* Second Number */}
          <PlaceValueNumberArea
            number={currentProblem.num2}
            backgroundColor="rgba(0, 38, 255, 0.1)"
            borderColor="#0026FF"
            resetTrigger={resetTrigger}
            onDragStart={handleDragStart}
          />

          {/* Equals Symbol */}
          <div className="text-center">
            <div className="font-space-grotesk text-3xl font-bold text-grade-black">=</div>
          </div>
        </div>

        {/* Right Side - Total Area */}
        <div className="lg:col-span-1">
          <PlaceValueTotalArea
            expectedTotal={currentProblem.answer}
            onTotalChange={setTotalBlocks}
            resetTrigger={resetTrigger}
          />
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="text-center mt-4">
          <div className="font-dm-sans text-lg font-bold text-green-600 animate-bounce">
            ✓ Correct! Well done!
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactVisualWorkspace;
