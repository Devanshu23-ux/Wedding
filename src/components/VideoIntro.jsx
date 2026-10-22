import React, { useRef } from 'react';
import envelopeImg from '../assets/envelope.png';

export default function VideoIntro({ onOpen }) {
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const handleTriggerOpen = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    
    // Create bright flash transition effect
    const flashEl = document.createElement('div');
    flashEl.className = 'bright-flash';
    document.body.appendChild(flashEl);
    
    // Fade in flash
    flashEl.style.opacity = '1';
    
    setTimeout(() => {
      onOpen();
      if (introRef.current) {
        introRef.current.style.display = 'none';
      }
      setTimeout(() => {
        flashEl.style.opacity = '0';
        setTimeout(() => flashEl.remove(), 1000);
      }, 200);
    }, 800);
  };

  const handleEnvelopeClick = () => {
    // Play audio
    const bgAudio = document.getElementById('bg-music');
    if (bgAudio) {
      bgAudio.play().catch((err) => console.log('Audio autoplay blocked:', err));
    }

    // Skip opening animation and proceed directly to main content
    handleTriggerOpen();
  };

  return (
    <div
      className="video-intro"
      ref={introRef}
      style={{ backgroundColor: '#fdfbf7' }}
    >
      <div className="envelope-wrapper">
        <div 
          className="envelope"
          onClick={handleEnvelopeClick}
        >
          {/* Back of the envelope */}
          <div className="envelope-back"></div>
          
          {/* The invitation card */}
          <div className="card-preview">
            <img 
              className="ganesha-mini"
              src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/ganesha.png" 
              alt="Ganesha" 
            />
            <div className="card-text">
              चि. निलेश व चि. सौ. का. Xxx
            </div>
          </div>
          
          {/* Front Bottom & Sides */}
          <img 
            src={envelopeImg} 
            alt="Envelope Front" 
            className="envelope-front"
          />
          
          {/* Top Flap */}
          <img 
            src={envelopeImg} 
            alt="Envelope Flap" 
            className="envelope-flap-img"
          />
        </div>
      </div>
    </div>
  );
}
