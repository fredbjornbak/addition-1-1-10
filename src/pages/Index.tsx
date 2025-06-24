
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SimplePlaceValueTool from '../components/SimplePlaceValueTool';

const Index = () => {
  return (
    <div className="min-h-screen bg-grade-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Link to="/visual-addition">
              <Button className="font-dm-sans text-grade-button font-bold bg-grade-purple hover:bg-grade-purple/90 text-white px-6 py-3 rounded-grade-pill">
                Try Compact Visual Addition →
              </Button>
            </Link>
          </div>
          <h1 className="font-space-grotesk text-grade-heading-lg text-grade-black font-bold mb-4">
            🔢 Place Value Addition 
          </h1>
          <p className="font-dm-sans text-grade-body-lg text-grade-black max-w-2xl mx-auto leading-relaxed">
            Click the tens and ones columns to add blocks and solve 10 addition problems!
          </p>
        </header>
        
        <SimplePlaceValueTool />
      </div>
    </div>
  );
};

export default Index;
