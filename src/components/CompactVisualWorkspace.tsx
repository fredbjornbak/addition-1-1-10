
import React, { useState, useEffect } from 'react';
import CompactNumberArea from './CompactNumberArea';
import CompactTotalArea from './CompactTotalArea';
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

  const handleNumber1DragStart = (blocks: number) => {
    // Set data for drag and drop
    const event = new CustomEvent('dragstart');
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/blocks', blocks.toString());
    }
  };

  const handleNumber2DragStart = (blocks: number) => {
    // Set data for drag and drop
    const event = new CustomEvent('dragstart');
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/blocks', blocks.toString());
    }
  };

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setTotalBlocks(0);
      setResetTrigger(prev => prev + 1);
      setShowSuccess(false);
    } else {
      // Game complete - restart
      const newProblems = generateVisualAdditionProblems();
      setProblems(newProblems);
      setCurrentProblemIndex(0);
      setTotalBlocks(0);
      setResetTrigger(prev => prev + 1);
      setShowSuccess(false);
    }
  };

  if (!currentProblem) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      {/* First Number */}
      <CompactNumberArea
        number={currentProblem.num1}
        backgroundColor="rgba(111, 0, 255, 0.1)"
        borderColor="#6F00FF"
        onDragStart={handleNumber1DragStart}
        resetTrigger={resetTrigger}
      />

      {/* Plus Symbol */}
      <div className="text-center">
        <div className="font-space-grotesk text-4xl font-bold text-grade-purple">+</div>
      </div>

      {/* Second Number */}
      <CompactNumberArea
        number={currentProblem.num2}
        backgroundColor="rgba(0, 38, 255, 0.1)"
        borderColor="#0026FF"
        onDragStart={handleNumber2DragStart}
        resetTrigger={resetTrigger}
      />

      {/* Equals Symbol */}
      <div className="text-center">
        <div className="font-space-grotesk text-4xl font-bold text-grade-black">=</div>
      </div>

      {/* Total Area */}
      <CompactTotalArea
        expectedTotal={currentProblem.answer}
        onTotalChange={setTotalBlocks}
        resetTrigger={resetTrigger}
      />

      {/* Progress */}
      <div className="text-center">
        <div className="font-dm-sans text-grade-body text-grade-black">
          {currentProblemIndex + 1} of {problems.length}
        </div>
      </div>
    </div>
  );
};

export default CompactVisualWorkspace;
