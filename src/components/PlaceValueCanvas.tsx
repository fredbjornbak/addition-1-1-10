
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DraggableBlock from './DraggableBlock';
import LevelSelector from './LevelSelector';
import ProgressTracker from './ProgressTracker';
import { generateProblem, Problem } from '../utils/problemGenerator';
import { Star, RotateCcw, Lightbulb } from 'lucide-react';

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

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress and Level Selection */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <LevelSelector currentLevel={currentLevel} onLevelChange={setCurrentLevel} />
        <ProgressTracker progress={progress} currentLevel={currentLevel} />
      </div>

      {/* Main Problem Display */}
      <Card 
        className="p-8 text-center shadow-lg"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '50px',
          border: 'none',
          borderLeft: '10px solid #2F2E41',
          borderBottom: '10px solid #2F2E41'
        }}
      >
        <div 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ 
            color: '#6F00FF', 
            fontFamily: 'Space Grotesk',
            fontWeight: 700
          }}
        >
          {currentProblem.num1} + {currentProblem.num2} = ?
        </div>
        <div 
          className="text-xl"
          style={{ 
            color: '#2F2E41', 
            fontFamily: 'DM Sans',
            fontSize: '20px',
            lineHeight: '1.5'
          }}
        >
          {currentProblem.description}
        </div>
      </Card>

      {/* Place Value Canvas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Place Value Columns */}
        <Card 
          className="p-6 shadow-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '50px',
            border: 'none',
            borderLeft: '10px solid #2F2E41',
            borderBottom: '10px solid #2F2E41'
          }}
        >
          <h3 
            className="text-3xl font-bold text-center mb-6"
            style={{ 
              color: '#6F00FF', 
              fontFamily: 'Space Grotesk',
              fontWeight: 700
            }}
          >
            📊 Place Value Board
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Tens Column */}
            <div 
              className="rounded-2xl p-4 min-h-[200px]"
              style={{
                backgroundColor: '#0026FF',
                opacity: 0.1,
                border: '4px solid #0026FF'
              }}
            >
              <div 
                className="text-center font-bold mb-4 text-2xl"
                style={{ 
                  color: '#0026FF', 
                  fontFamily: 'DM Sans',
                  fontWeight: 700
                }}
              >
                TENS
              </div>
              <div className="grid gap-2">
                {Array.from({ length: tensBlocks }, (_, i) => (
                  <div 
                    key={i} 
                    className="h-10 rounded-lg flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: '#0026FF',
                      color: '#FAFAFA',
                      fontFamily: 'DM Sans',
                      fontSize: '18px'
                    }}
                  >
                    10
                  </div>
                ))}
              </div>
            </div>

            {/* Ones Column */}
            <div 
              className="rounded-2xl p-4 min-h-[200px]"
              style={{
                backgroundColor: '#FF6F00',
                opacity: 0.1,
                border: '4px solid #FF6F00'
              }}
            >
              <div 
                className="text-center font-bold mb-4 text-2xl"
                style={{ 
                  color: '#FF6F00', 
                  fontFamily: 'DM Sans',
                  fontWeight: 700
                }}
              >
                ONES
              </div>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: onesBlocks }, (_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: '#FF6F00',
                      color: '#FAFAFA',
                      fontFamily: 'DM Sans'
                    }}
                  >
                    1
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Answer Display */}
          <div className="text-center">
            <div 
              className="text-3xl font-bold mb-2"
              style={{ 
                color: '#2F2E41', 
                fontFamily: 'Space Grotesk',
                fontWeight: 700
              }}
            >
              Your Answer: {userAnswer}
            </div>
            <div 
              className="text-xl"
              style={{ 
                color: '#2F2E41', 
                fontFamily: 'DM Sans',
                fontSize: '18px'
              }}
            >
              ({tensBlocks} tens + {onesBlocks} ones)
            </div>
          </div>
        </Card>

        {/* Block Controls */}
        <Card 
          className="p-6 shadow-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '50px',
            border: 'none',
            borderLeft: '10px solid #2F2E41',
            borderBottom: '10px solid #2F2E41'
          }}
        >
          <h3 
            className="text-3xl font-bold text-center mb-6"
            style={{ 
              color: '#FF6F00', 
              fontFamily: 'Space Grotesk',
              fontWeight: 700
            }}
          >
            🧮 Number Blocks
          </h3>

          {/* Tens Blocks Control */}
          <div className="mb-8">
            <div 
              className="text-xl font-bold mb-4"
              style={{ 
                color: '#0026FF', 
                fontFamily: 'DM Sans',
                fontWeight: 700,
                fontSize: '20px'
              }}
            >
              Add Tens Blocks:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 2 }, (_, i) => (
                <DraggableBlock
                  key={`tens-${i}`}
                  value={10}
                  type="tens"
                  onClick={() => {
                    if (tensBlocks < 2) {
                      setTensBlocks(prev => prev + 1);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Ones Blocks Control */}
          <div className="mb-8">
            <div 
              className="text-xl font-bold mb-4"
              style={{ 
                color: '#FF6F00', 
                fontFamily: 'DM Sans',
                fontWeight: 700,
                fontSize: '20px'
              }}
            >
              Add Ones Blocks:
            </div>
            <div className="grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
              {Array.from({ length: 10 }, (_, i) => (
                <DraggableBlock
                  key={`ones-${i}`}
                  value={1}
                  type="ones"
                  onClick={() => {
                    if (onesBlocks < 20) {
                      if (onesBlocks === 9) {
                        setOnesBlocks(0);
                        setTensBlocks(prev => prev + 1);
                      } else {
                        setOnesBlocks(prev => prev + 1);
                      }
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={checkAnswer}
              className="px-8 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 min-w-[44px] min-h-[44px]"
              style={{
                backgroundColor: '#6F00FF',
                color: '#FAFAFA',
                borderRadius: '100px',
                border: 'none',
                borderLeft: '10px solid #2F2E41',
                borderBottom: '10px solid #2F2E41',
                boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.25)',
                fontFamily: 'DM Sans',
                fontSize: '20px',
                fontWeight: 700
              }}
            >
              ✓ Check Answer
            </button>
            
            <button
              onClick={resetCanvas}
              className="px-6 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 min-w-[44px] min-h-[44px]"
              style={{
                backgroundColor: '#F0F0F0',
                color: '#2F2E41',
                borderRadius: '100px',
                border: '2px solid #E5E7EB',
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 500
              }}
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
            
            <button
              onClick={showSolution}
              className="px-6 py-4 font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 min-w-[44px] min-h-[44px]"
              style={{
                backgroundColor: '#FF6F00',
                color: '#FAFAFA',
                borderRadius: '100px',
                border: 'none',
                borderLeft: '10px solid #2F2E41',
                borderBottom: '10px solid #2F2E41',
                boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.25)',
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 700
              }}
            >
              <Lightbulb className="w-5 h-5" />
              Show Me
            </button>
          </div>
        </Card>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <Card 
          className={`p-8 text-center shadow-lg ${celebrating ? 'animate-pulse' : ''}`}
          style={{
            backgroundColor: isCorrect ? '#FFFFFF' : '#FFFFFF',
            borderRadius: '50px',
            border: 'none',
            borderLeft: `10px solid ${isCorrect ? '#6F00FF' : '#FF6F00'}`,
            borderBottom: `10px solid ${isCorrect ? '#6F00FF' : '#FF6F00'}`
          }}
        >
          <div 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: isCorrect ? '#6F00FF' : '#FF6F00', 
              fontFamily: 'Space Grotesk',
              fontWeight: 700
            }}
          >
            {isCorrect ? '🎉 Excellent Work!' : '🤔 Try Again!'}
          </div>
          <div 
            className="text-xl"
            style={{ 
              color: '#2F2E41', 
              fontFamily: 'DM Sans',
              fontSize: '20px',
              lineHeight: '1.5'
            }}
          >
            {isCorrect 
              ? `Perfect! ${currentProblem.num1} + ${currentProblem.num2} = ${currentProblem.answer}`
              : `Not quite. The answer is ${currentProblem.answer}. Keep trying!`
            }
          </div>
          {isCorrect && (
            <div className="mt-6 flex justify-center">
              {Array.from({ length: 3 }, (_, i) => (
                <Star 
                  key={i} 
                  className="w-12 h-12 animate-bounce fill-current" 
                  style={{ 
                    color: '#FF6F00',
                    animationDelay: `${i * 0.2}s` 
                  }} 
                />
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Hint Display */}
      {showHint && (
        <Card 
          className="p-6 shadow-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '50px',
            border: 'none',
            borderLeft: '10px solid #6F00FF',
            borderBottom: '10px solid #6F00FF'
          }}
        >
          <div className="text-center">
            <div 
              className="text-2xl font-bold mb-4"
              style={{ 
                color: '#6F00FF', 
                fontFamily: 'Space Grotesk',
                fontWeight: 700
              }}
            >
              💡 Solution Explanation:
            </div>
            <div 
              className="text-xl mb-2"
              style={{ 
                color: '#2F2E41', 
                fontFamily: 'DM Sans',
                fontSize: '20px'
              }}
            >
              {currentProblem.num1} + {currentProblem.num2} = {currentProblem.answer}
            </div>
            <div 
              className="text-lg"
              style={{ 
                color: '#2F2E41', 
                fontFamily: 'DM Sans',
                fontSize: '18px'
              }}
            >
              This makes {Math.floor(currentProblem.answer / 10)} ten(s) and {currentProblem.answer % 10} one(s)
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PlaceValueCanvas;
