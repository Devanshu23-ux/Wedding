import React, { useEffect, useRef } from 'react';

const STORIES = [
  {
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000',
    cap: 'Memories together'
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    cap: 'Written in the stars'
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000',
    cap: 'Joy and laughter'
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000',
    cap: 'Forever Us'
  }
];

const ROTATIONS = [-2.5, 1.8, -1.5, 2.2];

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
