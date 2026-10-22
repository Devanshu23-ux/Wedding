import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ delay, duration, startX, endX, scale }) => {
  return (
    <motion.div
      initial={{ y: -50, x: startX, opacity: 0, rotate: 0, scale }}
      animate={{
        y: '110vh',
        x: endX,
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute top-0 pointer-events-none z-50 text-pink-400"
    >
      <svg
        viewBox="0 0 32 29"
        width="24"
        height="22"
        fill="currentColor"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
      >
        <path d="M16 29S1 19.5 1 9.6C1 4.3 5 1 9.4 1c3 0 5.4 1.6 6.6 4 1.2-2.4 3.6-4 6.6-4C27 1 31 4.3 31 9.6 31 19.5 16 29 16 29Z" />
      </svg>
    </motion.div>
  );
};

export default function FallingPetals({ count = 20 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      startX: `${Math.random() * 100}vw`,
      endX: `${Math.random() * 100}vw`,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setPetals(generatedPetals);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  );
}
