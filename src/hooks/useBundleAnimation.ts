
import { useState, useCallback } from 'react';

export type BundleState = 'idle' | 'vibrating' | 'gathering' | 'transforming' | 'complete';

export const useBundleAnimation = () => {
  const [bundleState, setBundleState] = useState<BundleState>('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  const startBundleAnimation = useCallback((onComplete: () => void) => {
    setIsAnimating(true);
    setBundleState('gathering');

    // Sequence of animations
    setTimeout(() => {
      setBundleState('transforming');
    }, 800);

    setTimeout(() => {
      setBundleState('complete');
      onComplete();
    }, 1400);

    setTimeout(() => {
      setBundleState('idle');
      setIsAnimating(false);
    }, 2000);
  }, []);

  const startVibrating = useCallback(() => {
    if (!isAnimating) {
      setBundleState('vibrating');
    }
  }, [isAnimating]);

  const stopVibrating = useCallback(() => {
    if (bundleState === 'vibrating') {
      setBundleState('idle');
    }
  }, [bundleState]);

  return {
    bundleState,
    isAnimating,
    startBundleAnimation,
    startVibrating,
    stopVibrating
  };
};
