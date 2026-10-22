import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-b from-wedding-cream to-[#fdf9f1]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-wedding-gold/10 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-xl mx-auto z-10"
      >
        <p className="text-sm font-semibold tracking-widest text-wedding-gold uppercase mb-8">
          Together with their families
          <br />
          <span className="text-xs text-gray-500 mt-2 block">Request the honor of your presence</span>
        </p>

        {/* Placeholder for Illustration */}
        <div className="relative w-64 h-80 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-wedding-wine/20 to-transparent rounded-t-full shadow-lg border border-wedding-gold/20 flex items-center justify-center">
            {/* If we had the SVG we would place it here */}
            <span className="text-sm text-gray-400">Couple Illustration</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-serif text-wedding-wine mb-2">
          Saanvi
        </h1>
        <p className="text-xs text-gray-500 mb-2">Daughter of Anita & S. R. Naidu</p>
        
        <div className="text-4xl font-script text-wedding-gold my-2">&</div>
        
        <h1 className="text-5xl md:text-6xl font-serif text-wedding-wine mb-2">
          Vihaan
        </h1>
        <p className="text-xs text-gray-500 mb-8">Son of Madhu & Ram Reddy</p>

        <p className="text-sm text-gray-600 mb-8 italic">at their wedding celebration</p>

        <div className="glass p-6 rounded-2xl inline-block text-center border-wedding-gold/30">
          <p className="font-semibold text-wedding-wine text-lg mb-1">From 6:00 PM onwards</p>
          <p className="font-bold text-gray-800 text-xl font-serif mb-2">Saturday, 11 December 2026</p>
          <p className="text-sm text-gray-600">Venue: Taj Palace, Hyderabad</p>
        </div>

      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs font-bold tracking-widest text-wedding-gold mb-2 uppercase">See all celebrations</span>
        <div className="w-px h-12 bg-gradient-to-b from-wedding-gold to-transparent" />
      </div>
    </section>
  );
}
