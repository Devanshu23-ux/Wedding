import React from 'react';
import weddingImage from '../assets/NILESH MARNE 2.jpg.jpeg';

const EVENTS_DATA = [
  {
    title: 'साखरपुडा (Engagement)',
    bg: weddingImage,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी सकाळी १० वा. ३० मि. (विवाहस्थळी)',
    dark: false,
    tagline: 'नात्याची गोड सुरवात...',
  },
  {
    title: 'हळदी समारंभ (Haldi)',
    bg: weddingImage,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी दुपारी १ वा. १५ मि. (विवाहस्थळी)',
    dark: false,
    tagline: 'पिवळ्या रंगाची उधळण आणि आनंदाची सुरवात!',
  },
  {
    title: 'शुभविवाह (Wedding)',
    bg: weddingImage,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी सायंकाळी ५ वा. ४५ मि. या शुभ मुहूर्तावर',
    dark: false,
    tagline: 'दोन हृदये, एक नवे आयुष्य...',
  },
  {
    title: 'भोजन समारंभ (Reception)',
    bg: weddingImage,
    marathiTime: 'सायंकाळी ६ ते ९ (विवाहस्थळी)',
    dark: false,
    tagline: 'स्वादाने भरलेला सहवास...',
  }
];

function EventBlock({ event }) {
  return (
    <div className="event-block">
      <div className="event-invite-frame">
        <img className="event-invite-bg" src={event.bg} alt="" loading="lazy" />
        <div className="event-invite-overlay">
          <div className="event-invite-stack">
            <h3 className={`event-invite-title ${event.dark ? 'dark-text' : ''}`} style={{ fontFamily: 'var(--font-marathi)' }}>
              {event.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="evt-details">
        <p className="evt-tagline" style={{ fontFamily: 'var(--font-marathi)', marginBottom: '0.75rem' }}>"{event.tagline}"</p>
        <p className="evt-time-marathi" style={{ fontFamily: 'var(--font-marathi)', fontSize: '1.1rem', color: 'var(--sage-deep)', lineHeight: '1.6' }}>
          {event.marathiTime}
        </p>
      </div>
    </div>
  );
}

export default function EventsSection() {
  return (
    <section id="events-section" style={{ textAlign: 'center' }}>
      <span className="scratch-title-sub" style={{ color: '#c9a270', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        The Celebrations Unfold
      </span>
      <h2 className="scratch-title" style={{ fontSize: '4.5rem', marginBottom: 0 }}>
        Festivities
      </h2>

      <div className="events-stack" style={{ marginTop: '3.5rem' }}>
        {EVENTS_DATA.map((evt) => (
          <EventBlock key={evt.title} event={evt} />
        ))}
      </div>
    </section>
  );
}
