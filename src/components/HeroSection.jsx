import React from 'react';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('scratch-section') || document.getElementById('countdown-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero">
      <div className="hero-corner">
        <span />
      </div>
      
      <div className="hero-card">
        <img
          className="hero-icon reveal"
          src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/ganesha.png"
          alt="Ganesha"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        <div className="god-quote reveal">
          ॥ श्री गणेशाय नमः ॥<br />
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </div>

        <div className="intro-text reveal" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          आमच्या जीवनाच्या या सुंदर प्रवासात<br />
          आपली प्रेमपूर्वक उपस्थिती हीच आमच्यासाठी सर्वात मोठी भेट आहे.
        </div>

        <div className="couple-name shimmer reveal">
          चि. निलेश
        </div>

        <div className="amp-row reveal">
          <span className="amp-line" />
          <span className="amp">व</span>
          <span className="amp-line" />
        </div>

        <div className="couple-name shimmer reveal">
          चि. सौ. का. Xxx
        </div>

        <div className="parent-sub reveal" style={{ lineHeight: '1.6', fontSize: '1rem', marginTop: '1rem' }}>
          सुपुत्र – श्री. शिवाजी मारणे (मारणे परिवार, पुणे)<br />
          सुपुत्री – श्री. Xxxx xxxx (xxxx परिवार, पुणे)
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}>
        <span>Scroll to see magic</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
