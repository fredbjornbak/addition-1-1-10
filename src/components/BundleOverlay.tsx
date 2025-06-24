
import React from 'react';

interface BundleOverlayProps {
  onBundleClick: () => void;
}

const BundleOverlay: React.FC<BundleOverlayProps> = ({
  onBundleClick
}) => {
  return (
    <div 
      className="absolute inset-0 bg-yellow-400 bg-opacity-20 rounded-2xl border-4 border-yellow-400 border-dashed animate-pulse cursor-pointer flex items-center justify-center z-10"
      onClick={(e) => {
        e.stopPropagation();
        onBundleClick();
      }}
    >
      <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
        Bundle 10 ones!
      </div>
    </div>
  );
};

export default BundleOverlay;
