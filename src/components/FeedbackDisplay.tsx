
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Problem } from '../utils/problemGenerator';

interface FeedbackDisplayProps {
  showFeedback: boolean;
  isCorrect: boolean;
  celebrating: boolean;
  problem: Problem;
  showHint: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  showFeedback, 
  isCorrect, 
  celebrating, 
  problem, 
  showHint 
}) => {
  return (
    <>
      {/* Feedback */}
      {showFeedback && (
        <Card 
          className={`p-8 text-center shadow-lg ${celebrating ? 'animate-pulse' : ''}`}
          style={{
            backgroundColor: '#FFFFFF',
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
              ? `Perfect! ${problem.num1} + ${problem.num2} = ${problem.answer}`
              : `Not quite. The answer is ${problem.answer}. Keep trying!`
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
              {problem.num1} + {problem.num2} = {problem.answer}
            </div>
            <div 
              className="text-lg"
              style={{ 
                color: '#2F2E41', 
                fontFamily: 'DM Sans',
                fontSize: '18px'
              }}
            >
              This makes {Math.floor(problem.answer / 10)} ten(s) and {problem.answer % 10} one(s)
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FeedbackDisplay;
