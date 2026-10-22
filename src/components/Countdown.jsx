import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: 11 December 2026, 6:00 PM
    const targetDate = new Date('2026-12-11T18:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-wedding-wine text-white py-12 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-bold tracking-widest text-wedding-gold uppercase mb-6">Counting down to the Muhurtham</p>
        
        <div className="flex justify-center gap-2 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 w-20 sm:w-24">
            <span className="block text-3xl sm:text-4xl font-serif text-wedding-light-gold font-bold">{timeLeft.days}</span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-80">Days</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 w-20 sm:w-24">
            <span className="block text-3xl sm:text-4xl font-serif text-wedding-light-gold font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-80">Hours</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 w-20 sm:w-24">
            <span className="block text-3xl sm:text-4xl font-serif text-wedding-light-gold font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-80">Mins</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 w-20 sm:w-24">
            <span className="block text-3xl sm:text-4xl font-serif text-wedding-light-gold font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-80">Secs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
