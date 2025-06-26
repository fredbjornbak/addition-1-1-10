
import { useRef, useCallback } from 'react';

export const useSoundEffects = () => {
  const audioContext = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    try {
      const ctx = initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Audio playback not available:', error);
    }
  }, [initAudioContext]);

  const playAddSound = useCallback((blockType: 'tens' | 'ones') => {
    // Higher pitch for ones, lower for tens
    const frequency = blockType === 'ones' ? 800 : 400;
    playTone(frequency, 0.2, 0.05);
  }, [playTone]);

  const playDragStart = useCallback((blockType: 'tens' | 'ones') => {
    // Rising tone for drag start
    const frequency = blockType === 'ones' ? 600 : 300;
    playTone(frequency, 0.15, 0.03);
  }, [playTone]);

  const playDragDrop = useCallback((blockType: 'tens' | 'ones') => {
    // Descending tone for successful drop
    const frequency = blockType === 'ones' ? 500 : 250;
    playTone(frequency, 0.25, 0.04);
  }, [playTone]);

  const playRemoveSound = useCallback(() => {
    // Short low tone for removal
    playTone(200, 0.1, 0.03);
  }, [playTone]);

  return {
    playAddSound,
    playDragStart,
    playDragDrop,
    playRemoveSound
  };
};
