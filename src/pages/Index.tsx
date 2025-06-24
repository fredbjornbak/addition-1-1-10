
import React from 'react';
import PlaceValueCanvas from '../components/PlaceValueCanvas';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            🔢 Place Value Addition Fun! 🎯
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
