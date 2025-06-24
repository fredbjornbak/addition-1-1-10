
import React from 'react';
import VisualAdditionTool from '../components/VisualAdditionTool';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VisualAddition = () => {
  return (
    <div className="min-h-screen bg-grade-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" className="font-dm-sans">
                ← Back to Simple Tool
              </Button>
            </Link>
          </div>
          <h1 className="font-space-grotesk text-grade-heading-lg text-grade-black font-bold mb-4">
            🔢 Visual Addition Workspace
          </h1>
          <p className="font-dm-sans text-grade-body-lg text-grade-black max-w-3xl mx-auto leading-relaxed">
            Build each number with blocks in separate workspaces, then drag all blocks to the total area to find the sum!
          </p>
        </header>
        
        <VisualAdditionTool />
      </div>
    </div>
  );
};

export default VisualAddition;
