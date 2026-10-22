import React from 'react';

const EVENTS_DATA = [
  {
    title: 'हळदी समारंभ (Haldi)',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/carnival/37.png',
    date: { day: 'Saturday', num: '12', monthYear: 'Dec 2026' },
    time: '12:00 PM',
    dark: false,
    tagline: 'पिवळ्या रंगाची उधळण आणि आनंदाची सुरवात!',
    dresscode: {
      colors: ['rgb(255, 204, 0)', 'rgb(255, 255, 255)'],
      names: 'Yellow · White',
      note: 'Traditional / Yellow theme'
    },
    venue: 'Radhakrishna Garden and Banquet Hall, Pune',
    mapQuery: 'Radhakrishna Garden and Banquet Hall Pune'
  },
  {
    title: 'शुभविवाह (Wedding)',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/phere/44.png',
    date: { day: 'Saturday', num: '12', monthYear: 'Dec 2026' },
    time: '5:45 PM',
    dark: false,
    tagline: 'दोन हृदये, एक नवे आयुष्य...',
    dresscode: {
      colors: ['rgb(138, 32, 48)', 'rgb(212, 175, 55)', 'rgb(242, 234, 225)'],
      names: 'Maroon · Gold · Ivory',
      note: 'Traditional Indian'
    },
    venue: 'Radhakrishna Garden and Banquet Hall, Pune',
    mapQuery: 'Radhakrishna Garden and Banquet Hall Pune'
  }
];

function EventBlock({ event }) {
  return (
    <div className="event-block">
      <div className="event-invite-frame">
        <img className="event-invite-bg" src={event.bg} alt="" loading="lazy" />
        <div className="event-invite-overlay">
          <div className="event-invite-stack">
            <h3 className={`event-invite-title ${event.dark ? 'dark-text' : ''}`}>
              {event.title}
            </h3>
            <div className={`event-date-row ${event.dark ? 'dark-text' : ''}`}>
              <span>{event.date.day}</span>
              <span className="event-date-bar">|</span>
              <span className="event-date-num">{event.date.num}</span>
              <span className="event-date-bar">|</span>
              <span>{event.date.monthYear}</span>
            </div>
            <div className={`event-invite-time ${event.dark ? 'dark-text' : ''}`}>
              {event.time}
            </div>
          </div>
        </div>
      </div>

      <div className="evt-details">
        <p className="evt-tagline">"{event.tagline}"</p>

        {event.dresscode && (
          <div className="evt-dresscode">
            <span className="evt-dresscode-lbl">Dress code</span>
            <div className="evt-dresscode-dots">
              {event.dresscode.colors.map((c, i) => (
                <span key={i} className="evt-dresscode-dot" style={{ background: c }} />
              ))}
            </div>
            <span className="evt-dresscode-names">{event.dresscode.names}</span>
            <span className="evt-dresscode-note">{event.dresscode.note}</span>
          </div>
        )}

        <div className="evt-venue">
          <span className="evt-venue-name">{event.venue}</span>
          {event.mapQuery && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(event.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="evt-dir-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              GET DIRECTIONS
            </a>
          )}
        </div>
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
