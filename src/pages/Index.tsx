
import React from 'react';
import SimplePlaceValueTool from '../components/SimplePlaceValueTool';

const Index = () => {
  return (
    <div className="min-h-screen bg-grade-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
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
