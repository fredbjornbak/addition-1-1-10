
import React, { useState, useEffect } from 'react';
import LevelSelector from './LevelSelector';
import ProgressTracker from './ProgressTracker';
import ProblemDisplay from './ProblemDisplay';
import PlaceValueBoard from './PlaceValueBoard';
import BlockControls from './BlockControls';
import ActionButtons from './ActionButtons';
import FeedbackDisplay from './FeedbackDisplay';
import { generateProblem, Problem } from '../utils/problemGenerator';

const PlaceValueCanvas = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [tensBlocks, setTensBlocks] = useState(0);
  const [onesBlocks, setOnesBlocks] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState({ level1: 0, level2: 0, level3: 0, level4: 0 });
  const [showHint, setShowHint] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    generateNewProblem();
  }, [currentLevel]);

  useEffect(() => {
    setUserAnswer(tensBlocks * 10 + onesBlocks);
  }, [tensBlocks, onesBlocks]);

  const generateNewProblem = () => {
    const problem = generateProblem(currentLevel);
    setCurrentProblem(problem);
    resetCanvas();
    setShowFeedback(false);
    setShowHint(false);
  };

  const resetCanvas = () => {
    setTensBlocks(0);
    setOnesBlocks(0);
    setUserAnswer(0);
  };

  const checkAnswer = () => {
    if (!currentProblem) return;
    
    const correct = userAnswer === currentProblem.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 2000);
      
      // Update progress
      const levelKey = `level${currentLevel}` as keyof typeof progress;
      setProgress(prev => ({
        ...prev,
        [levelKey]: Math.min(prev[levelKey] + 1, 10)
      }));
      
      // Auto-generate new problem after success
      setTimeout(generateNewProblem, 3000);
    }
  };

  const showSolution = () => {
    if (!currentProblem) return;
    
    const answer = currentProblem.answer;
    const tens = Math.floor(answer / 10);
    const ones = answer % 10;
    
    setTensBlocks(tens);
    setOnesBlocks(ones);
    setShowHint(true);
  };

  const handleAddTens = () => {
    setTensBlocks(prev => prev + 1);
  };

  const handleAddOnes = () => {
    if (onesBlocks < 20) {
      if (onesBlocks === 9) {
        setOnesBlocks(0);
        setTensBlocks(prev => prev + 1);
      } else {
        setOnesBlocks(prev => prev + 1);
      }
    }
  };

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress and Level Selection */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <LevelSelector currentLevel={currentLevel} onLevelChange={setCurrentLevel} />
        <ProgressTracker progress={progress} currentLevel={currentLevel} />
      </div>

      {/* Main Problem Display */}
      <ProblemDisplay problem={currentProblem} />

      {/* Place Value Canvas */}
      <div className="grid md:grid-cols-2 gap-8">
        <PlaceValueBoard 
          tensBlocks={tensBlocks}
          onesBlocks={onesBlocks}
          userAnswer={userAnswer}
        />
        
        <div className="space-y-6">
          <BlockControls 
            tensBlocks={tensBlocks}
            onesBlocks={onesBlocks}
            onAddTens={handleAddTens}
            onAddOnes={handleAddOnes}
          />
          
          <ActionButtons 
            onCheckAnswer={checkAnswer}
            onReset={resetCanvas}
            onShowSolution={showSolution}
          />
        </div>
      </div>

      <FeedbackDisplay 
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        celebrating={celebrating}
        problem={currentProblem}
        showHint={showHint}
      />
    </div>
  );
};

export default PlaceValueCanvas;
