import { useState } from 'react';
import { ILLUSTRATIONS } from '../utils/illustrations';

const EVENTS = [
  {
    id: 'haldi',
    date: 'TUESDAY, 8 DECEMBER 2026',
    title: 'Haldi',
    subtitle: 'Manjal Neerattu Vizha',
    time: '6 PM onwards',
    venue: 'Taj Palace, Hyderabad',
    quote: 'Turmeric, laughter and the very first blessings.',
    hint: 'RUB TO REVEAL',
  },
  {
    id: 'mehendi',
    date: 'WEDNESDAY, 9 DECEMBER 2026',
    title: 'Mehndi',
    subtitle: 'Where henna meets hearts',
    time: '5:30 PM onwards',
    venue: 'Taj Palace, Hyderabad',
    quote: 'The deeper the mehndi, the deeper the love.',
    hint: 'TRACE HEART',
  },
  {
    id: 'sangeet',
    date: 'THURSDAY, 10 DECEMBER 2026',
    title: 'Sangeet',
    subtitle: 'An evening of song',
    time: '6 PM onwards',
    venue: 'Taj Palace, Hyderabad',
    quote: 'Music, dance and the whole family on its feet.',
    hint: 'TAP THE DHOL',
  },
  {
    id: 'wedding',
    date: 'FRIDAY, 11 DECEMBER 2026',
    title: 'The Wedding',
    subtitle: 'The Muhurtham',
    time: '6 PM onwards',
    venue: 'Taj Palace, Hyderabad',
    quote: 'The sacred vows — with your blessings.',
    hint: 'SCRATCH TO REVEAL',
  }
];

export default function Timeline({ onOpenModal }) {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto bg-wedding-cream">
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-widest text-wedding-gold uppercase mb-2">Four days of celebration</p>
        <h2 className="text-4xl font-serif text-wedding-wine">The Festivities</h2>
      </div>

      <div className="relative border-l-2 border-wedding-gold/30 ml-4 pl-8 space-y-16">
        {EVENTS.map((ev, index) => (
          <div key={ev.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-wedding-cream border-4 border-wedding-gold shadow-sm" />
            
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-wider text-wedding-gold mb-1">{ev.date}</p>
                <h3 className="text-3xl font-serif text-wedding-wine mb-1">{ev.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{ev.subtitle}</p>
                
                <p className="text-sm font-semibold text-gray-800">{ev.time} - {ev.venue}</p>
                
                <p className="text-sm italic text-gray-500 mt-3">&ldquo;{ev.quote}&rdquo;</p>
                
                <button className="mt-4 flex items-center text-xs font-bold text-wedding-wine tracking-wider border border-wedding-wine/20 rounded-full px-4 py-2 hover:bg-wedding-wine/5 transition-colors">
                  <span className="mr-2 text-lg leading-none">+</span> ADD TO CALENDAR
                </button>
              </div>

              <div 
                onClick={() => onOpenModal(ev.id)}
                className="w-24 h-32 flex-shrink-0 glass rounded-xl border border-wedding-gold/40 shadow-md cursor-pointer overflow-hidden relative group"
              >
                {/* Thumbnail from SVG */}
                <div 
                  className="absolute inset-0 flex items-center justify-center [&>svg]:w-[200%] [&>svg]:h-[200%] [&>svg]:object-cover"
                  dangerouslySetInnerHTML={{ __html: ILLUSTRATIONS[ev.id] ? ILLUSTRATIONS[ev.id].svg(400, 460) : '' }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 py-2 text-center transform group-hover:bg-wedding-wine transition-colors">
                  <span className="text-[9px] font-bold tracking-widest text-white">{ev.hint}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
