import React, { useState, useEffect } from 'react';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00'
  });

  useEffect(() => {
    const targetDate = new Date(2026, 11, 12, 17, 45, 0); // Dec 12, 2026, 5:45 PM

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { val: timeLeft.days, lbl: 'DAYS' },
    { val: timeLeft.hours, lbl: 'HOURS' },
    { val: timeLeft.mins, lbl: 'MINS' },
    { val: timeLeft.secs, lbl: 'SECS' }
  ];

  return (
    <section id="countdown-section">
      <div className="cd-card" style={{ maxWidth: '420px' }}>
        <div className="cd-quote" style={{ fontSize: '1.2rem', fontFamily: 'var(--font-marathi)' }}>
          नव्या आयुष्याची सुंदर सुरवात...
        </div>
        <span className="cd-script" style={{ fontSize: '3.5rem', margin: '1rem 0', fontFamily: 'var(--font-marathi)' }}>
          शुभविवाह
        </span>
        <span className="cd-date" style={{ marginBottom: '2rem' }}>
          12 · 12 · 2026
        </span>
        <div className="cd-grid">
          {units.map((unit) => (
            <div key={unit.lbl} className="cd-unit">
              <span className="cd-num">{unit.val}</span>
              <span className="cd-lbl" style={{ fontSize: '0.65rem' }}>
                {unit.lbl}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
