import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TapReveal({ onComplete }) {
  const [taps, setTaps] = useState(0);
  const maxTaps = 5;
  const isRevealed = taps >= maxTaps;

  const handleTap = () => {
    if (isRevealed) return;
    const nextTaps = taps + 1;
    setTaps(nextTaps);
    if (nextTaps >= maxTaps && onComplete) {
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <div className="relative w-full h-full bg-red-900 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      
      {/* Revealed Content */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 bg-[#3a1030]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.9 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h3 className="text-3xl font-serif text-pink-200 mb-2">Sangeet Ceremony</h3>
        <p className="text-sm italic text-pink-300 mb-8">An evening of song...</p>
        
        <div className="w-48 h-48 bg-pink-900/50 rounded-2xl flex items-center justify-center border-2 border-pink-500/30 shadow-2xl mb-8">
          <span className="text-pink-200 text-xs font-semibold">Sangeet Illustration</span>
        </div>
      </motion.div>

      {/* Tapping Layer */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        animate={{ opacity: isRevealed ? 0 : 1 }}
        style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
      >
        <motion.button 
          onClick={handleTap}
          whileTap={{ scale: 0.9 }}
          className="relative w-40 h-40 rounded-full bg-orange-700 border-4 border-yellow-500 flex items-center justify-center shadow-xl focus:outline-none"
        >
          <span className="text-white font-bold tracking-widest uppercase">Dhol</span>
        </motion.button>
        
        <h4 className="mt-8 font-script text-3xl text-white">Tap the dhol</h4>
        
        {/* Progress Dots */}
        <div className="flex gap-2 mt-4">
          {Array.from({ length: maxTaps }).map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${i < taps ? 'bg-yellow-400' : 'bg-red-800'}`}
            />
          ))}
        </div>
        
        <p className="absolute bottom-8 text-xs font-bold tracking-widest text-white/50 uppercase">
          Tap the dhol to the beat
        </p>
      </motion.div>
    </div>
  );
}
