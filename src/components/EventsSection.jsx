import React from 'react';
import engagementImg from '../assets/engagement.jpeg';
import haldiImg from '../assets/haldi.jpeg';
import weddingImg from '../assets/wedding.jpeg';
import foodImg from '../assets/food.jpeg';

const EVENTS_DATA = [
  {
    title: 'साखरपुडा (Engagement)',
    bg: engagementImg,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी सकाळी १०\u00A0वा.\u00A0३०\u00A0मि. (विवाहस्थळी)',
    dark: false,
    tagline: 'नात्याची गोड सुरवात...',
  },
  {
    title: 'हळदी समारंभ (Haldi)',
    bg: haldiImg,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी दुपारी १\u00A0वा.\u00A0१५\u00A0मि. (विवाहस्थळी)',
    dark: false,
    tagline: 'पिवळ्या रंगाची उधळण आणि आनंदाची सुरवात!',
  },
  {
    title: 'शुभविवाह (Wedding)',
    bg: weddingImg,
    marathiTime: 'शनिवार दि. १२/१२/२०२६ रोजी सायंकाळी ५\u00A0वा.\u00A0४५\u00A0मि. या शुभ मुहूर्तावर',
    dark: false,
    tagline: 'दोन हृदये, एक नवे आयुष्य...',
  },
  {
    title: 'भोजन समारंभ (Reception)',
    bg: foodImg,
    marathiTime: 'सायंकाळी ६\u00A0ते\u00A0९ (विवाहस्थळी)',
    dark: false,
    tagline: 'स्वादाने भरलेला सहवास...',
  }
];

function EventBlock({ event }) {
  return (
    <div className="event-block">
      <div className="event-invite-frame">
        <img className="event-invite-bg" src={event.bg} alt="" loading="lazy" />
      </div>

      <div className="evt-details">
        <h3 style={{ fontFamily: 'var(--font-marathi)', color: 'var(--sage-dark)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          {event.title}
        </h3>
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
