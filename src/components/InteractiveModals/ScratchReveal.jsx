import { useEffect, useRef, useState } from 'react';
import { ILLUSTRATIONS } from '../utils/illustrations';

export default function ScratchReveal({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    
    // Setup canvas size to match parent accurately using devicePixelRatio
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Paint the foil gradient as in the original
      ctx.globalCompositeOperation = "source-over";
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, "#d9c17a"); 
      grad.addColorStop(1, "#c8a24e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      ctx.fillStyle = "rgba(255,255,255,.12)";
      for(let i=0; i<rect.width; i+=10){ ctx.fillRect(i,0,1,rect.height); }
    };
    
    resize();
    window.addEventListener('resize', resize);

    let isDrawing = false;
    
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
    };

    let raf = null;
    const checkReveal = () => {
      if (isRevealed) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let data;
      try {
        data = ctx.getImageData(0, 0, canvas.width, canvas.height, {willReadFrequently: true});
      } catch(e) { return; }
      
      let transparent = 0, total = 0;
      for (let i = 3; i < data.data.length; i += 4 * 37) {
        total++;
        if (data.data[i] < 80) transparent++;
      }
      const pct = transparent / Math.max(1, total);
      if (pct > 0.45) {
        setIsRevealed(true);
        if (onComplete) onComplete();
      }
    };

    const handleStart = (e) => {
      isDrawing = true;
      handleMove(e);
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
      if (!raf) {
        raf = requestAnimationFrame(() => { checkReveal(); raf = null; });
      }
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed, onComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#f8c24c] flex flex-col overflow-hidden">
      {/* Revealed Background Image from SVG */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover"
        dangerouslySetInnerHTML={{ __html: ILLUSTRATIONS.haldi.svg(400, 800) }}
      />

      {/* The Scratch Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 z-10 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
      
      {/* Scratch Hint Overlay (like video) */}
      {!isRevealed && (
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center z-20 pointer-events-none opacity-80 animate-pulse">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M9 3c-2 3-2 6 0 8m6-8c2 3 2 6 0 8M6 21l4-4M18 21l-4-4M9 11c-3 2-5 5-5 8m14-8c3 2 5 5 5 8"/>
          </svg>
          <span className="text-white font-bold tracking-widest uppercase mt-2 drop-shadow-md">Rub off the turmeric</span>
        </div>
      )}
    </div>
  );
}
