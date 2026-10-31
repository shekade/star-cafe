import React from 'react';
import { motion } from 'motion/react';
import { Instagram as InstagramIcon } from 'lucide-react';
import { ScallopButton } from './ScallopButton';
import { CroissantDoodle, BreadLoafDoodle, TakeawayBagDoodle } from './Doodles';
import { CAFE_INFO } from '../data/bakeryData';

export function Instagram() {
  const handleInstagramClick = () => {
    window.open(`https://instagram.com/${CAFE_INFO.instagram.replace('@', '')}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-[#FFF8E7] py-20 sm:py-28 relative overflow-hidden">
      
      {/* Faint Background Line-Art Bakery Doodles */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10 overflow-hidden">
        <div className="absolute -top-10 -left-10 transform -rotate-12">
          <BreadLoafDoodle className="w-96 h-80" stroke="#0B3FBF" />
        </div>
        <div className="absolute -bottom-10 -right-10 transform rotate-12">
          <CroissantDoodle className="w-96 h-80" stroke="#0B3FBF" />
        </div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 rotate-6">
          <TakeawayBagDoodle className="w-72 h-80" stroke="#0B3FBF" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display text-5xl sm:text-7xl text-[#0B3FBF] tracking-tight">
            Follow the crumbs.
          </h2>
          <p className="text-base sm:text-lg text-[#0B3FBF]/80 font-medium mt-2">
            Daily oven drops, flour experiments, and slow mornings on {CAFE_INFO.instagram}
          </p>
        </motion.div>

        {/* Tilted Photo Collage */}
        <div className="relative max-w-2xl sm:max-w-3xl mx-auto my-8 sm:my-12 h-80 sm:h-96 flex items-center justify-center">
          
          {/* Left Tilted Photo (Morning bun) */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -15 }}
            whileInView={{ opacity: 1, x: 0, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute left-4 sm:left-12 z-10 w-48 sm:w-64 p-3 bg-white rounded-2xl shadow-xl border-2 border-[#0B3FBF]/10 transform hover:scale-105 hover:z-30 transition-all duration-300"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF8E7]">
              <img
                src="/src/assets/images/pastry_cinnamon_bun_1793434739515.jpg"
                alt="Cardamom morning bun"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#0B3FBF] font-display mt-2 text-left">
              Fresh 7am batch ✨
            </p>
          </motion.div>

          {/* Right Tilted Photo (Pain au chocolat) */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 15 }}
            whileInView={{ opacity: 1, x: 0, rotate: 9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute right-4 sm:right-12 z-10 w-48 sm:w-64 p-3 bg-white rounded-2xl shadow-xl border-2 border-[#0B3FBF]/10 transform hover:scale-105 hover:z-30 transition-all duration-300"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF8E7]">
              <img
                src="/src/assets/images/pastry_pain_chocolat_1793434739673.jpg"
                alt="Flaky pain au chocolat"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#0B3FBF] font-display mt-2 text-left">
              70% Valrhona layers 🍫
            </p>
          </motion.div>

          {/* Center Dominant Photo (Cafe table spread) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-20 w-56 sm:w-80 p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-[#0B3FBF]/15 transform hover:scale-105 transition-all duration-300 -rotate-1"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF8E7]">
              <img
                src="/src/assets/images/pastry_table_spread_1793434739663.jpg"
                alt="Table spread with coffee and warm bun"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs font-display text-[#0B3FBF]">
              <span>Sunday morning routine</span>
              <span>☕🥐</span>
            </div>
          </motion.div>

        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <ScallopButton
            variant="cobalt"
            size="md"
            onClick={handleInstagramClick}
            icon={<InstagramIcon className="w-4 h-4" />}
          >
            Follow along on Instagram
          </ScallopButton>
        </motion.div>

      </div>
    </section>
  );
}
