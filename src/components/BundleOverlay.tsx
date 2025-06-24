
import React from 'react';

interface BundleOverlayProps {
  onBundleClick: () => void;
}

const BundleOverlay: React.FC<BundleOverlayProps> = ({ onBundleClick }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onBundleClick();
      }}
      className="absolute bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-dashed border-purple-500 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
      style={{
        left: '40px',
        top: '70px',
        width: '180px',
        height: '100px',
        zIndex: 10
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-700 font-bold">
        <div className="text-lg">🔄 Click to</div>
        <div className="text-sm">Make 1 Ten!</div>
      </div>
    </div>
  );
};

export default BundleOverlay;
