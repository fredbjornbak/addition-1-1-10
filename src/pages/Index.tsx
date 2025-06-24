
import React from 'react';
import PlaceValueCanvas from '../components/PlaceValueCanvas';

const Index = () => {
  return (
    <div className="min-h-screen bg-grade-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="font-space-grotesk text-grade-heading-lg text-grade-black font-bold mb-4">
            🔢 Place Value Addition Fun! 🎯
          </h1>
          <p className="font-dm-sans text-grade-body-lg text-grade-black max-w-2xl mx-auto leading-relaxed">
            Learn addition up to 20 by moving tens and ones blocks! 
            Discover how numbers work together in the place value system.
          </p>
        </header>
        
        <PlaceValueCanvas />
      </div>
    </div>
  );
};

export default Index;
