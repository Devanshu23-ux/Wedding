import React, { useState, useRef } from 'react';
import envelopeImg from '../assets/envelope.png';

export default function VideoIntro({ onOpen }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const handleTriggerOpen = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (introRef.current) {
      introRef.current.classList.add('fade-out');
    }
    
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const handleEnvelopeClick = () => {
    if (!isImageLoaded) return;
    
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
      <div className={`envelope-wrapper ${isImageLoaded ? 'ready' : 'loading'}`}>
        <div 
          className="envelope"
          onClick={handleEnvelopeClick}
        >
          {/* Back of the envelope */}
          <div className="envelope-back"></div>
          
          {/* The invitation card - Commented out to prevent flicker before image load */}
          {/* 
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
          */}
          
          {/* Front Bottom & Sides */}
          <img 
            src={envelopeImg} 
            alt="Envelope Front" 
            className="envelope-front"
            onLoad={() => setIsImageLoaded(true)}
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
