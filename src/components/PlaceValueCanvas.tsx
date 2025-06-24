
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DraggableBlock from './DraggableBlock';
import LevelSelector from './LevelSelector';
import ProgressTracker from './ProgressTracker';
import { generateProblem, Problem } from '../utils/problemGenerator';
import { Star, RotateCcw, Lightbulb, Volume2 } from 'lucide-react';

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

  const playSound = (type: 'success' | 'error' | 'click') => {
    // Placeholder for audio feedback
    console.log(`Playing ${type} sound`);
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
      <Card className="p-6 text-center bg-white shadow-lg border-4 border-blue-200">
        <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
          {currentProblem.num1} + {currentProblem.num2} = ?
        </div>
        <div className="text-lg text-gray-600">
          {currentProblem.description}
        </div>
      </Card>

      {/* Place Value Canvas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Place Value Columns */}
        <Card className="p-6 bg-gradient-to-b from-green-50 to-green-100 border-4 border-green-300">
          <h3 className="text-2xl font-bold text-center mb-6 text-green-800">
            📊 Place Value Board
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Tens Column */}
            <div className="bg-blue-200 rounded-xl p-4 min-h-[200px] border-4 border-blue-400">
              <div className="text-center font-bold text-blue-800 mb-4 text-xl">
                TENS
              </div>
              <div className="grid gap-2">
                {Array.from({ length: tensBlocks }, (_, i) => (
                  <div key={i} className="bg-blue-500 h-8 rounded-lg flex items-center justify-center text-white font-bold">
                    10
                  </div>
                ))}
              </div>
            </div>

            {/* Ones Column */}
            <div className="bg-orange-200 rounded-xl p-4 min-h-[200px] border-4 border-orange-400">
              <div className="text-center font-bold text-orange-800 mb-4 text-xl">
                ONES
              </div>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: onesBlocks }, (_, i) => (
                  <div key={i} className="bg-orange-500 w-6 h-6 rounded-md flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Answer Display */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Your Answer: {userAnswer}
            </div>
            <div className="text-lg text-gray-600">
              ({tensBlocks} tens + {onesBlocks} ones)
            </div>
          </div>
        </Card>

        {/* Block Controls */}
        <Card className="p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 border-4 border-yellow-300">
          <h3 className="text-2xl font-bold text-center mb-6 text-yellow-800">
            🧮 Number Blocks
          </h3>

          {/* Tens Blocks Control */}
          <div className="mb-8">
            <div className="text-lg font-bold text-blue-800 mb-3">Add Tens Blocks:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 2 }, (_, i) => (
                <DraggableBlock
                  key={`tens-${i}`}
                  value={10}
                  type="tens"
                  onClick={() => {
                    if (tensBlocks < 2) {
                      setTensBlocks(prev => prev + 1);
                      playSound('click');
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Ones Blocks Control */}
          <div className="mb-8">
            <div className="text-lg font-bold text-orange-800 mb-3">Add Ones Blocks:</div>
            <div className="grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
              {Array.from({ length: 10 }, (_, i) => (
                <DraggableBlock
                  key={`ones-${i}`}
                  value={1}
                  type="ones"
                  onClick={() => {
                    if (onesBlocks < 20) {
                      if (onesBlocks === 9) {
                        // Show "making 10" animation
                        setOnesBlocks(0);
                        setTensBlocks(prev => prev + 1);
                      } else {
                        setOnesBlocks(prev => prev + 1);
                      }
                      playSound('click');
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={checkAnswer}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg font-bold rounded-xl"
            >
              ✓ Check Answer
            </Button>
            
            <Button
              onClick={resetCanvas}
              variant="outline"
              className="border-2 border-gray-400 px-4 py-3 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={showSolution}
              variant="outline"
              className="border-2 border-purple-400 px-4 py-3 rounded-xl"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Show Me
            </Button>
          </div>
        </Card>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <Card className={`p-6 text-center border-4 ${
          isCorrect 
            ? 'bg-green-100 border-green-400' 
            : 'bg-red-100 border-red-400'
        } ${celebrating ? 'animate-pulse' : ''}`}>
          <div className={`text-3xl font-bold mb-2 ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect ? '🎉 Excellent Work!' : '🤔 Try Again!'}
          </div>
          <div className={`text-lg ${
            isCorrect ? 'text-green-700' : 'text-red-700'
          }`}>
            {isCorrect 
              ? `Perfect! ${currentProblem.num1} + ${currentProblem.num2} = ${currentProblem.answer}`
              : `Not quite. The answer is ${currentProblem.answer}. Keep trying!`
            }
          </div>
          {isCorrect && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: 3 }, (_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-500 fill-current animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Hint Display */}
      {showHint && (
        <Card className="p-4 bg-purple-100 border-4 border-purple-300">
          <div className="text-center text-purple-800">
            <div className="text-lg font-bold mb-2">💡 Solution Explanation:</div>
            <div>
              {currentProblem.num1} + {currentProblem.num2} = {currentProblem.answer}
            </div>
            <div className="text-sm mt-2">
              This makes {Math.floor(currentProblem.answer / 10)} ten(s) and {currentProblem.answer % 10} one(s)
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PlaceValueCanvas;
