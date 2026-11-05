import React from 'react';

export default function VenueSection() {
  const venueImageUrl = 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SwZUNWoMuvscadAfLYy_rs5d1Hx5TomsI_Wui_CoDoN40gvhkUuBuIoGKDaFNAI7C7674WqRQnh6GD6JKQOZ-HTEtVAR4CIQjvbVRNyIQ3OUdIupPGFqVhmZD2fis0JUq_DAAh=w1000-h750-k-no';

  return (
    <section id="venue-section">
      <span className="sec-label">Where</span>
      <h2 className="sec-heading">The Venue</h2>

      <div className="venue-card">
        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <img
            src={venueImageUrl}
            alt="Venue"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000';
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(138, 79, 76, 0.4), transparent)'
            }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--sage-deep)',
              marginBottom: '0.8rem',
              lineHeight: 1.3,
              fontWeight: 600
            }}
          >
            Radhakrishna Garden Mangal Karyalaya
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: '#a08070',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '1.8rem'
            }}
          >
            Shivapur (Tolanaka), Haveli,<br />
            Pune, Maharashtra
          </p>

          <button
            className="venue-btn"
            onClick={() =>
              window.open('https://maps.google.com/?q=Radhakrishna+Garden+Mangal+Karyalaya+Shivapur+Tolanaka+Pune', '_blank')
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            VIEW ON MAPS
          </button>
        </div>
      </div>
    </section>
  );
}
