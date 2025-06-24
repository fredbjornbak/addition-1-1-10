
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
      className="absolute bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-dashed border-yellow-500 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
      style={{
        left: '40px',
        top: '70px',
        width: '180px',
        height: '100px',
        zIndex: 15
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-700 font-bold">
        <div className="text-lg animate-bounce-gentle">🔄 Click to</div>
        <div className="text-sm">Make 1 Ten!</div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-sparkle flex items-center justify-center text-xs">
          ✨
        </div>
      </div>
    </div>
  );
};

export default BundleOverlay;
