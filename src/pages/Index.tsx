
import React from 'react';
import PlaceValueCanvas from '../components/PlaceValueCanvas';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ 
            fontFamily: 'Space Grotesk', 
            color: '#2F2E41',
            fontWeight: 700
          }}>
            🔢 Place Value Addition Fun! 🎯
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ 
            fontFamily: 'DM Sans', 
            color: '#2F2E41',
            fontSize: '20px',
            lineHeight: '1.5'
          }}>
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
