import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TraceReveal({ onComplete }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const handlePointerMove = (e) => {
    if (isRevealed) return;
    
    // Simplistic interaction: dragging anywhere increases progress
    // A true path-tracing algorithm is complex, this is a simulated version for UX.
    setProgress(prev => {
      const next = prev + 3;
      if (next >= 100) {
        setIsRevealed(true);
        if (onComplete) onComplete();
        return 100;
      }
      return next;
    });
  };

  return (
    <div 
      className="relative w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6 text-center select-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      style={{ touchAction: 'none' }}
    >
      {/* Revealed Content */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-serif text-wedding-wine mb-2">Mehndi Ceremony</h3>
        <p className="text-sm italic text-gray-600 mb-8">Where henna meets hearts...</p>
        
        <div className="w-48 h-48 bg-green-200 rounded-2xl flex items-center justify-center border-2 border-green-700/20 mb-8 shadow-inner">
          <span className="text-green-800 text-xs font-semibold">Mehndi Illustration</span>
        </div>
      </motion.div>

      {/* The Tracing Layer */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-wedding-cream"
        animate={{ opacity: isRevealed ? 0 : 1 }}
        style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <svg viewBox="0 0 100 100" className="w-48 h-48 overflow-visible">
          {/* Base dotted path */}
          <path
            d="M 50,85 C 50,85 10,55 10,30 C 10,15 25,5 40,15 C 50,25 50,25 50,25 C 50,25 50,25 60,15 C 75,5 90,15 90,30 C 90,55 50,85 50,85 Z"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          {/* Drawing path */}
          <path
            ref={pathRef}
            d="M 50,85 C 50,85 10,55 10,30 C 10,15 25,5 40,15 C 50,25 50,25 50,25 C 50,25 50,25 60,15 C 75,5 90,15 90,30 C 90,55 50,85 50,85 Z"
            fill="none"
            stroke="#78350f" // henna brown
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - (pathLength * progress) / 100}
            className="transition-all duration-75 ease-out"
          />
        </svg>
        <p className="mt-8 text-sm font-bold tracking-widest text-wedding-gold uppercase animate-pulse">
          Trace the heart with henna
        </p>
      </motion.div>
    </div>
  );
}
