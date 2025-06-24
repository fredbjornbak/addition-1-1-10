
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
          className={`p-8 text-center shadow-grade-card bg-white rounded-grade-card border-0 animate-scale-in ${
            celebrating ? 'animate-pulse-glow' : ''
          }`}
          style={{
            borderLeft: `10px solid ${isCorrect ? '#6F00FF' : '#FF6F00'}`,
            borderBottom: `10px solid ${isCorrect ? '#6F00FF' : '#FF6F00'}`
          }}
          role="alert"
          aria-live="polite"
        >
          <div className="font-space-grotesk text-4xl font-bold mb-4" 
               style={{ color: isCorrect ? '#6F00FF' : '#FF6F00' }}>
            {isCorrect ? '🎉 Excellent Work!' : '🤔 Try Again!'}
          </div>
          <div className="font-dm-sans text-grade-body-lg text-grade-black leading-relaxed">
            {isCorrect 
              ? `Perfect! ${problem.num1} + ${problem.num2} = ${problem.answer}`
              : `Not quite. The answer is ${problem.answer}. Keep trying!`
            }
          </div>
          {isCorrect && (
            <div className="mt-6 flex justify-center" aria-label="Celebration stars">
              {Array.from({ length: 3 }, (_, i) => (
                <Star 
                  key={i} 
                  className="w-12 h-12 animate-bounce-gentle fill-current text-grade-orange" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Hint Display */}
      {showHint && (
        <Card 
          className="p-6 shadow-grade-card bg-white rounded-grade-card border-0 animate-scale-in"
          style={{
            borderLeft: '10px solid #6F00FF',
            borderBottom: '10px solid #6F00FF'
          }}
          role="complementary"
          aria-label="Solution explanation"
        >
          <div className="text-center">
            <div className="font-space-grotesk text-2xl font-bold mb-4 text-grade-purple">
              💡 Solution Explanation:
            </div>
            <div className="font-dm-sans text-grade-body-lg mb-2 text-grade-black">
              {problem.num1} + {problem.num2} = {problem.answer}
            </div>
            <div className="font-dm-sans text-grade-body text-grade-black">
              This makes {Math.floor(problem.answer / 10)} ten(s) and {problem.answer % 10} one(s)
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FeedbackDisplay;
