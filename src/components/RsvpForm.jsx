import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    events: ['The Wedding'],
    guests: 1
  });

  const toggleEvent = (event) => {
    setFormData(prev => {
      const events = prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event];
      return { ...prev, events };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = '919876543210'; // Placeholder
    const message = `Hello! I am RSVPing for Saanvi & Vihaan's wedding.%0A%0A*Name*: ${formData.name}%0A*Attending*: ${formData.attending === 'yes' ? 'Joyfully Yes' : 'Regretfully No'}%0A*Events*: ${formData.events.join(', ')}%0A*Guests*: ${formData.guests}`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 px-6 max-w-xl mx-auto bg-wedding-cream text-center">
      <h2 className="text-4xl font-serif text-wedding-wine mb-2">Will you join us?</h2>
      <p className="text-sm text-gray-600 mb-8">
        Kindly reply by 15 November 2026.<br />
        Your response opens straight in WhatsApp.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <button className="text-xs font-bold tracking-wider text-wedding-wine border border-wedding-wine/20 rounded-full px-6 py-3 hover:bg-wedding-wine/5">
          + ADD WEDDING TO CALENDAR
        </button>
        <button className="text-xs font-bold tracking-wider text-wedding-wine border border-wedding-wine/20 rounded-full px-6 py-3 hover:bg-wedding-wine/5">
          📍 DIRECTIONS
        </button>
      </div>

      <form onSubmit={handleSubmit} className="text-left space-y-6">
        <div>
          <label className="block text-xs font-bold tracking-widest text-wedding-wine uppercase mb-2">Your Name</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Lakshmi Iyer"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-wedding-wine uppercase mb-2">Will you attend?</label>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setFormData({...formData, attending: 'yes'})}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${formData.attending === 'yes' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              Joyfully yes
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, attending: 'no'})}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${formData.attending === 'no' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              Regretfully no
            </button>
          </div>
        </div>

        {formData.attending === 'yes' && (
          <>
            <div>
              <label className="block text-xs font-bold tracking-widest text-wedding-wine uppercase mb-2">Which celebrations? (tap all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {['Haldi', 'Mehndi', 'Sangeet', 'The Wedding'].map(event => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => toggleEvent(event)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${formData.events.includes(event) ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-wedding-wine uppercase mb-2">Number of guests</label>
              <input 
                type="number" 
                min="1"
                max="10"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-wedding-gold transition-colors"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
              />
            </div>
          </>
        )}

        <button 
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30"
        >
          <FaWhatsapp size={20} />
          SEND RSVP ON WHATSAPP
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Prefer to call? <a href="#" className="text-wedding-wine font-semibold underline">Call the family</a>
        </p>
      </form>

      {/* Footer Details */}
      <div className="mt-20 pt-10 border-t border-gray-200 text-center">
        <div className="text-2xl text-wedding-gold mb-4">ॐ</div>
        <p className="font-serif text-xl text-wedding-wine italic mb-6">
          With the blessings of our elders<br/>and the warmth of your presence.
        </p>
        <h3 className="font-script text-4xl text-wedding-gold mb-2">Saanvi & Vihaan</h3>
        <p className="text-[10px] tracking-widest uppercase text-gray-400">Made with love</p>
      </div>
    </section>
  );
}
