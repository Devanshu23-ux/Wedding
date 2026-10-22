import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TeamSelector() {
  const [selectedTeam, setSelectedTeam] = useState(null); // 'bride' or 'groom'

  return (
    <section className="py-16 px-6 max-w-xl mx-auto text-center bg-wedding-cream">
      <p className="text-xs font-bold tracking-widest text-wedding-gold uppercase mb-2">A little friendly rivalry</p>
      <h2 className="text-4xl font-serif text-wedding-wine mb-4">Pick your side</h2>
      <p className="text-sm text-gray-600 mb-10 max-w-sm mx-auto">
        Whose side are you cheering for? Tap to join — your pick rides along with your RSVP.
      </p>

      <div className="flex justify-center items-center gap-4 sm:gap-8 mb-6">
        {/* Team Bride */}
        <button 
          onClick={() => setSelectedTeam('bride')}
          className="relative flex flex-col items-center focus:outline-none"
        >
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-md ${
              selectedTeam === 'bride' 
                ? 'bg-pink-50 border-pink-400 shadow-pink-200' 
                : 'bg-white border-gray-200 hover:border-pink-200'
            }`}
          >
            <span className="text-4xl sm:text-5xl">🌸</span>
            {selectedTeam === 'bride' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
              >
                <Check size={16} strokeWidth={3} />
              </motion.div>
            )}
            {selectedTeam === 'bride' && (
              <div className="absolute -top-6 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                You're in
              </div>
            )}
          </motion.div>
          <div className="mt-4">
            <p className={`font-semibold text-sm ${selectedTeam === 'bride' ? 'text-pink-600' : 'text-gray-600'}`}>Team Bride</p>
            <p className={`font-serif text-xl ${selectedTeam === 'bride' ? 'text-pink-700' : 'text-wedding-wine'}`}>Saanvi</p>
          </div>
        </button>

        <span className="text-gray-400 italic text-sm">vs</span>

        {/* Team Groom */}
        <button 
          onClick={() => setSelectedTeam('groom')}
          className="relative flex flex-col items-center focus:outline-none"
        >
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-md ${
              selectedTeam === 'groom' 
                ? 'bg-yellow-50 border-yellow-400 shadow-yellow-200' 
                : 'bg-white border-gray-200 hover:border-yellow-200'
            }`}
          >
            <span className="text-4xl sm:text-5xl">🌼</span>
            {selectedTeam === 'groom' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
              >
                <Check size={16} strokeWidth={3} />
              </motion.div>
            )}
            {selectedTeam === 'groom' && (
              <div className="absolute -top-6 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                You're in
              </div>
            )}
          </motion.div>
          <div className="mt-4">
            <p className={`font-semibold text-sm ${selectedTeam === 'groom' ? 'text-yellow-600' : 'text-gray-600'}`}>Team Groom</p>
            <p className={`font-serif text-xl ${selectedTeam === 'groom' ? 'text-yellow-700' : 'text-wedding-wine'}`}>Vihaan</p>
          </div>
        </button>
      </div>

      <div className="h-6">
        {selectedTeam && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold italic text-wedding-wine"
          >
            You're cheering for {selectedTeam === 'bride' ? 'Team Bride - Saanvi!' : 'Team Groom - Vihaan!'}
          </motion.p>
        )}
      </div>
    </section>
  );
}
