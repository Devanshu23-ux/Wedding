import React, { useState, useRef, useEffect, useCallback } from 'react';

function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#c9a270', '#e8d5b7', '#d4af37', '#f5c6cb', '#ff9a9e', '#fad0c4', '#a8e6cf', '#dcedc1', '#ffd3b6', '#fff1e6'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.12 + Math.random() * 0.08,
        opacity: 1
      });
    }

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx *= 0.99;

        if (p.y > canvas.height * 0.7) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9998,
        pointerEvents: 'none'
      }}
    />
  );
}

function ScratchCard({ label, value, onComplete }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 120;
    canvas.height = 160;

    const grad = ctx.createLinearGradient(0, 0, 120, 160);
    grad.addColorStop(0, '#d1a3a4');
    grad.addColorStop(0.5, '#b97a7e');
    grad.addColorStop(1, '#a15b5f');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 120, 160);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const drawCircle = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 32.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleStart = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      drawCircle(pos.x, pos.y);
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 65;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
    };

    const checkScratch = () => {
      if (isRevealed) return;
      const imgData = ctx.getImageData(0, 0, 120, 160).data;
      let clearPixels = 0;
      for (let i = 3; i < imgData.length; i += 4) {
        if (imgData[i] < 128) clearPixels++;
      }
      const totalPixels = imgData.length / 4;
      if (clearPixels / totalPixels > 0.45) {
        setIsRevealed(true);
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
          canvas.style.display = 'none';
          onComplete();
        }, 600);
      }
    };

    const handleEnd = () => {
      isDrawing = false;
      checkScratch();
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed, onComplete]);

  return (
    <div className="scratch-item">
      <span className="scratch-label">{label}</span>
      <div className={`scratch-card-wrapper ${isRevealed ? '' : 'wiggling'}`} ref={cardRef}>
        <div className="scratch-value">{value}</div>
        <canvas className="scratch-canvas" ref={canvasRef} />
        {!isRevealed && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase',
                fontWeight: 700,
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              SCRATCH
            </span>
          </div>
        )}
      </div>
      <span className={`scratch-hint ${isRevealed ? 'hidden' : ''}`}>↑ SCRATCH</span>
    </div>
  );
}

export default function ScratchSection({ onCompleteAll }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const completedCountRef = useRef(0);

  const handleCardComplete = useCallback(() => {
    completedCountRef.current += 1;
    if (completedCountRef.current === 3) {
      setShowConfetti(true);
      setTimeout(() => {
        onCompleteAll();
      }, 1200);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3500);
    }
  }, [onCompleteAll]);

  return (
    <section id="scratch-section" className="scratch-section">
      {showConfetti && <ConfettiCanvas />}
      <span className="scratch-title-sub">The Date</span>
      <h2 className="scratch-title">Save the Date</h2>
      <div className="scratch-desc">Scratch below to reveal our wedding date</div>

      <div className="scratch-grid">
        <ScratchCard label="MONTH" value="DEC" onComplete={handleCardComplete} />
        <ScratchCard label="DAY" value="12" onComplete={handleCardComplete} />
        <ScratchCard label="YEAR" value="2026" onComplete={handleCardComplete} />
      </div>
    </section>
  );
}
