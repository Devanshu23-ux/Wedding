import { motion } from 'framer-motion';

export default function GateSplash({ onOpen }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Left Door */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%', opacity: 0.5 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-wedding-gold to-yellow-600 border-r border-yellow-700/30"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1), transparent 50%)' }}
      >
        {/* Ornaments */}
        <div className="absolute top-0 right-0 w-8 h-full border-l-2 border-yellow-800/20" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%', opacity: 0.5 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-wedding-gold to-yellow-600 border-l border-yellow-700/30"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1), transparent 50%)' }}
      >
        <div className="absolute top-0 left-0 w-8 h-full border-r-2 border-yellow-800/20" />
      </motion.div>

      {/* Center Seal */}
      <motion.div
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        className="relative z-10 flex flex-col items-center"
      >
        <button
          onClick={onOpen}
          className="relative flex items-center justify-center w-32 h-32 rounded-full bg-wedding-wine border-4 border-wedding-gold shadow-2xl hover:scale-105 transition-transform"
        >
          <div className="absolute inset-2 rounded-full border border-wedding-gold/50 border-dashed" />
          <span className="font-serif text-4xl text-wedding-gold font-bold">
            S <span className="font-script text-2xl mx-1 font-normal">&</span> V
          </span>
        </button>
        <p className="mt-8 text-sm tracking-widest text-white/90 font-semibold animate-pulse uppercase">
          ✦ Tap to open
        </p>
      </motion.div>
    </div>
  );
}
