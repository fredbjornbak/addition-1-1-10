
import React from 'react';

interface BundleOverlayProps {
  onBundleClick: () => void;
  bundleState?: 'idle' | 'vibrating' | 'gathering' | 'transforming' | 'complete';
}

const BundleOverlay: React.FC<BundleOverlayProps> = ({ 
  onBundleClick, 
  bundleState = 'idle' 
}) => {
  const getOverlayClasses = () => {
    switch (bundleState) {
      case 'gathering':
        return "absolute bg-gradient-to-br from-purple-200 to-purple-400 border-4 border-solid border-purple-600 rounded-xl cursor-pointer animate-pulse scale-110";
      case 'transforming':
        return "absolute bg-gradient-to-br from-yellow-200 to-yellow-400 border-4 border-solid border-yellow-600 rounded-xl cursor-pointer animate-bounce scale-125";
      default:
        return "absolute bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-dashed border-purple-500 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse";
    }
  };

  const getTextContent = () => {
    switch (bundleState) {
      case 'gathering':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-800 font-bold">
            <div className="text-lg animate-bounce">✨ Bundling!</div>
          </div>
        );
      case 'transforming':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-800 font-bold">
            <div className="text-lg animate-spin">🔄</div>
            <div className="text-sm">Almost done!</div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-700 font-bold">
            <div className="text-lg">🔄 Click to</div>
            <div className="text-sm">Make 1 Ten!</div>
          </div>
        );
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (bundleState === 'idle' || bundleState === 'vibrating') {
          onBundleClick();
        }
      }}
      className={getOverlayClasses()}
      style={{
        left: '40px',
        top: '70px',
        width: '180px',
        height: '100px',
        zIndex: 10
      }}
    >
      {getTextContent()}
    </div>
  );
};

export default BundleOverlay;
