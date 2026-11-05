import React, { useEffect, useRef } from 'react';
import img1 from '../assets/WhatsApp Image 2026-10-28 at 21.44.24 (1).jpeg';
import img2 from '../assets/WhatsApp Image 2026-10-28 at 21.44.24.jpeg';
import img3 from '../assets/WhatsApp Image 2026-10-28 at 21.44.25 (1).jpeg';
import img4 from '../assets/WhatsApp Image 2026-10-28 at 21.44.25 (2).jpeg';
import img5 from '../assets/WhatsApp Image 2026-10-28 at 21.44.25 (3).jpeg';
import img6 from '../assets/WhatsApp Image 2026-10-28 at 21.44.25.jpeg';
import img7 from '../assets/WhatsApp Image 2026-10-28 at 21.44.26.jpeg';
import img8 from '../assets/WhatsApp Image 2026-10-28 at 21.44.27 (1).jpeg';
import img9 from '../assets/WhatsApp Image 2026-10-28 at 21.44.27.jpeg';
import img10 from '../assets/WhatsApp Image 2026-10-28 at 21.44.28 (1).jpeg';
import img11 from '../assets/WhatsApp Image 2026-10-28 at 21.44.28.jpeg';

const STORIES = [
  { src: img1, cap: 'Love & Laughter' },
  { src: img2, cap: 'Beautiful Beginnings' },
  { src: img3, cap: 'Captured Moments' },
  { src: img4, cap: 'Sweet Memories' },
  { src: img5, cap: 'Together Always' },
  { src: img6, cap: 'Pure Joy' },
  { src: img7, cap: 'Forever Us' },
  { src: img8, cap: 'Hand in Hand' },
  { src: img9, cap: 'Our Journey' },
  { src: img10, cap: 'Infinite Love' },
  { src: img11, cap: 'Written in the Stars' }
];

const ROTATIONS = [-2.5, 1.8, -1.5, 2.2, -2.0, 1.5, -1.8, 2.0, -2.2, 1.6, -1.4];

export default function StorySection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.story-card-wrapper');

    const handleScroll = () => {
      cards.forEach((card, idx) => {
        const rot = ROTATIONS[idx] || 0;
        if (idx < cards.length - 1) {
          const nextCardTop = cards[idx + 1].getBoundingClientRect().top;
          const targetTop = window.innerHeight * 0.22;

          if (nextCardTop <= targetTop) {
            card.style.transform = `scale(0.92) rotate(${rot}deg)`;
            card.style.filter = 'brightness(0.5)';
            card.style.opacity = '1';
          } else if (nextCardTop < window.innerHeight) {
            const diff = nextCardTop - targetTop;
            const range = window.innerHeight - targetTop;
            const progress = Math.max(0, Math.min(1, 1 - diff / range));
            const scale = 1 - 0.08 * progress;
            const brightness = 1 - 0.5 * progress;
            card.style.transform = `scale(${scale}) rotate(${rot}deg)`;
            card.style.filter = `brightness(${brightness})`;
            card.style.opacity = '1';
          } else {
            card.style.transform = `scale(1) rotate(${rot}deg)`;
            card.style.filter = 'brightness(1)';
            card.style.opacity = '1';
          }
        } else {
          card.style.transform = `scale(1) rotate(${rot}deg)`;
          card.style.filter = 'brightness(1)';
        }
      });
    };

    cards.forEach((card, idx) => {
      card.style.transform = `scale(1) rotate(${ROTATIONS[idx] || 0}deg)`;
      card.style.filter = 'brightness(1)';
      card.style.opacity = '1';
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{ background: 'var(--cream)' }}>
      <div
        style={{
          textAlign: 'center',
          padding: '2vh 1rem 2vh',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(var(--cream) 80%, transparent)'
        }}
      >
        <span className="scratch-title-sub" style={{ color: '#c9a270', display: 'block' }}>
          Our Story
        </span>
        <h2 className="scratch-title" style={{ fontSize: '4.5rem', marginBottom: 0 }}>
          Forever Us
        </h2>
      </div>

      <div className="story-stack-container" ref={containerRef} style={{ paddingBottom: '5vh' }}>
        {STORIES.map((story, index) => (
          <div key={index} className="story-card-wrapper">
            <div className="story-polaroid">
              <img src={story.src} alt={story.cap} loading="lazy" decoding="async" />
              <div className="story-polaroid-caption">{story.cap}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
