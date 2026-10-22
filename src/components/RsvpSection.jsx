import React, { useState, useEffect } from 'react';

const EVENTS_LIST = [
  { name: 'Sangeet Night', date: 'JUNE 30 · 7:00 PM' },
  { name: 'After Party', date: 'JUNE 30 · 11:00 PM' },
  { name: 'Carnival', date: 'JULY 01 · 11:00 AM' },
  { name: 'Shera Bandi', date: 'JULY 01 · 6:00 PM' },
  { name: 'Reception', date: 'JULY 01 · 7:00 PM' },
  { name: 'Phere', date: 'JULY 01 · 9:00 PM' }
];

function EventCheckbox({ label, sublabel, checked, onChange }) {
  return (
    <label
      onClick={onChange}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem',
        border: `1px solid ${checked ? '#8a4f4c' : '#e2d7c8'}`,
        borderRadius: '0.8rem',
        cursor: 'pointer',
        background: checked ? 'rgba(138, 79, 76, 0.03)' : 'transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div>
        <span
          style={{
            display: 'block',
            color: checked ? '#8a4f4c' : '#2c1e16',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            transition: 'color 0.3s'
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              display: 'block',
              color: '#a08070',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              marginTop: '0.35rem',
              textTransform: 'uppercase'
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
      <div
        style={{
          width: '1.5rem',
          height: '1.5rem',
          border: `2px solid ${checked ? '#8a4f4c' : '#dcd1c4'}`,
          borderRadius: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: checked ? '#8a4f4c' : 'transparent',
          transition: 'all 0.3s ease'
        }}
      >
        {checked && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </label>
  );
}

export default function RsvpSection() {
  const [attending, setAttending] = useState('yes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [songQuery, setSongQuery] = useState('');
  const [songResults, setSongResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(
    new Set(['Sangeet Night', 'After Party', 'Carnival', 'Shera Bandi', 'Reception', 'Phere'])
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live iTunes Song Search API
  useEffect(() => {
    if (!songQuery || songQuery.length < 2) {
      setSongResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songQuery)}&entity=song&limit=6`)
        .then((res) => res.json())
        .then((data) => {
          setSongResults(data.results || []);
          setShowDropdown(true);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error(err);
          setIsSearching(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [songQuery]);

  const toggleEvent = (eventName) => {
    const next = new Set(selectedEvents);
    if (next.has(eventName)) {
      next.delete(eventName);
    } else {
      next.add(eventName);
    }
    setSelectedEvents(next);
  };

  const selectSong = (trackName, artistName) => {
    setSongQuery(`${trackName} - ${artistName}`);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Play yay sound effect
      const yayAudio = new Audio('https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/kids-saying-yay-sound-effect.mp3');
      yayAudio.volume = 0.6;
      yayAudio.play().catch((err) => console.log('Audio play blocked:', err));
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <section
        id="rsvp-section"
        style={{
          padding: '8rem 1.5rem',
          background: 'var(--cream)',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#8a4f4c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}
        >
          <svg width="40" height="30" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: '#8a4f4c', marginBottom: '1rem' }}>
          Thank You!
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', color: '#4a3d36', fontSize: '1.2rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
          Your RSVP has been beautifully received. We can't wait to celebrate with you!
        </p>
      </section>
    );
  }

  return (
    <section id="rsvp-section" style={{ padding: '5rem 1.5rem', background: 'var(--cream)', textAlign: 'center' }}>
      <span className="scratch-title-sub" style={{ color: '#c9a270', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        Join the Celebration
      </span>
      <h2 className="scratch-title" style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
        RSVP
      </h2>
      <p style={{ fontFamily: 'var(--font-serif)', color: '#4a3d36', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
        Kindly let us know if you can make it — your presence will make this celebration whole.
      </p>

      <form className="rsvp-form" style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'left' }} onSubmit={handleSubmit}>
        {/* Your Details */}
        <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            Your details
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a4f4c', marginBottom: '0.5rem', fontWeight: 600 }}>
              Your name
            </label>
            <input
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0', border: 'none', borderBottom: '1px solid #dcd1c4', background: 'transparent', fontSize: '1.1rem', color: '#333', outline: 'none', fontFamily: 'var(--font-serif)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a4f4c', marginBottom: '0.5rem', fontWeight: 600 }}>
              Phone number
            </label>
            <div className="custom-phone-input">
              <select defaultValue="+91">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
              </select>
              <input
                type="tel"
                placeholder="00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Attendance choice */}
        <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            Will you join us?
          </p>
          <label
            onClick={() => setAttending('yes')}
            className="btn-micro"
            style={{
              display: 'block',
              background: attending === 'yes' ? '#8a4f4c' : '#ffffff',
              color: attending === 'yes' ? 'white' : '#8a4f4c',
              border: '1px solid #8a4f4c',
              borderRadius: '2rem',
              padding: '1rem',
              textAlign: 'center',
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Joyfully accept 🎉
          </label>
          <label
            onClick={() => setAttending('no')}
            className="btn-micro"
            style={{
              display: 'block',
              background: attending === 'no' ? '#8a4f4c' : '#ffffff',
              color: attending === 'no' ? 'white' : '#8a4f4c',
              border: '1px solid #e2d7c8',
              borderRadius: '2rem',
              padding: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Regrettably decline
          </label>
        </div>

        {attending === 'yes' && (
          <>
            {/* Party size */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Party size
              </p>
              <select style={{ width: '100%', padding: '0.8rem', border: '1px solid #dcd1c4', borderRadius: '0.5rem', background: 'transparent', fontSize: '1.1rem', color: '#333', outline: 'none', fontFamily: 'var(--font-serif)' }}>
                <option value="1">1 (Just me)</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
              </select>
            </div>

            {/* Events attending */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Events you'll attend
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {EVENTS_LIST.map((e) => (
                  <EventCheckbox
                    key={e.name}
                    label={e.name}
                    sublabel={e.date}
                    checked={selectedEvents.has(e.name)}
                    onChange={() => toggleEvent(e.name)}
                  />
                ))}
              </div>
            </div>

            {/* Dance floor song search */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left', position: 'relative', zIndex: 20 }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                A song for the dance floor
              </p>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={songQuery}
                  onChange={(e) => setSongQuery(e.target.value)}
                  onFocus={() => songResults.length > 0 && setShowDropdown(true)}
                  placeholder="e.g. Kala Chashma"
                  style={{ width: '100%', padding: '0.5rem 0', border: 'none', borderBottom: '1px solid #dcd1c4', background: 'transparent', fontSize: '1.1rem', color: '#333', outline: 'none', fontFamily: 'var(--font-serif)' }}
                />
                {isSearching && (
                  <div style={{ position: 'absolute', right: 0, top: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', border: '2px solid #e2d7c8', borderTop: '2px solid #8a4f4c', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  </div>
                )}
              </div>

              {showDropdown && songResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 30, marginTop: '0.5rem', border: '1px solid #e2d7c8', overflow: 'hidden' }}>
                  {songResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectSong(item.trackName, item.artistName)}
                      style={{ padding: '1rem', borderBottom: idx < songResults.length - 1 ? '1px solid #f5ebd9' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                      {item.artworkUrl60 && <img src={item.artworkUrl60} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px' }} />}
                      <div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#333', fontSize: '0.95rem' }}>{item.trackName}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', color: '#888', fontSize: '0.8rem', marginTop: '0.2rem' }}>{item.artistName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dietary preferences */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                🍽️ Dietary preferences
              </p>
              <select style={{ width: '100%', padding: '0.8rem', border: '1px solid #dcd1c4', borderRadius: '0.8rem', background: 'transparent', fontSize: '1.1rem', color: '#333', outline: 'none', fontFamily: 'var(--font-serif)', cursor: 'pointer' }}>
                <option value="none">No specific preferences</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="jain">Jain Food</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Advice */}
            <div className="evt-details" style={{ marginBottom: '2.5rem', padding: '2rem', textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Marriage advice for us
              </p>
              <textarea
                placeholder="Share something sweet, funny, or wise..."
                style={{ width: '100%', height: '100px', padding: '1rem', border: '1px solid #dcd1c4', borderRadius: '0.5rem', background: 'transparent', fontSize: '1.1rem', color: '#333', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-serif)' }}
              />
            </div>
          </>
        )}

        <button
          className="btn-micro"
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1.2rem',
            background: '#8a4f4c',
            color: 'white',
            border: 'none',
            borderRadius: '2rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: isSubmitting ? 'wait' : 'pointer',
            boxShadow: '0 4px 15px rgba(138, 79, 76, 0.3)',
            transition: 'all 0.3s',
            opacity: isSubmitting ? 0.8 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send RSVP'}
        </button>
      </form>
    </section>
  );
}
