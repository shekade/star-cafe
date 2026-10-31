import React from 'react';
import { motion } from 'motion/react';
import { ScallopButton } from './ScallopButton';
import { ScallopDivider } from './ScallopDivider';
import { CrumbClubBadge, CroissantDoodle, SparkleDoodle } from './Doodles';

interface HeroProps {
  cafeName: string;
  onExploreMenu: () => void;
}

export function Hero({ cafeName, onExploreMenu }: HeroProps) {
  return (
    <section className="relative bg-[#0B3FBF] text-white pt-8 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Area */}
        <div className="relative min-h-[580px] lg:min-h-[660px] flex flex-col justify-between">
          
          {/* Top Section: Giant Headline + Rotating Club Badge */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white drop-shadow-sm">
                A little crust,
                <br />
                <span className="text-white">A lot of joy</span>
              </h1>
            </motion.div>

            {/* Rotating Sticker Badge (CRUMB CLUB) */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              className="self-end md:self-start shrink-0 mr-2 lg:mr-10 -mt-2 sm:mt-2"
            >
              <CrumbClubBadge
                text={`${cafeName.split(' ')[0] || 'CRUMB'} CLUB`}
                className="w-28 h-28 sm:w-36 sm:h-36"
              />
            </motion.div>
          </div>

          {/* Centerpiece: Food photo with 3D White Swoop & Doodles */}
          <div className="relative my-4 sm:my-0 flex items-center justify-center">
            
            {/* Playful Floating Line-art Croissant Doodle on Left */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -12 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -left-2 sm:left-4 lg:left-16 top-1/4 z-20 hidden sm:block bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 shadow-lg"
            >
              <CroissantDoodle className="w-14 h-14 sm:w-20 sm:h-20" stroke="#FFFFFF" />
              <div className="absolute -top-3 -right-2">
                <SparkleDoodle className="w-6 h-6" fill="#E6F55A" />
              </div>
            </motion.div>

            {/* The Main Hero Croissant Photo Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-xl sm:max-w-2xl w-full mx-auto"
            >
              {/* Back Layer of White Curved Swoop (behind photo) */}
              <svg
                viewBox="0 0 600 350"
                className="absolute -top-16 -left-12 w-[120%] h-[140%] pointer-events-none z-0 overflow-visible"
                fill="none"
              >
                <path
                  d="M 100 240 C 40 180, 80 40, 280 20 C 480 0, 560 120, 520 220"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.95"
                />
              </svg>

              {/* The Hero Croissant Image with smooth rounded frame and soft glow */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 transform hover:scale-[1.01] transition-transform duration-500">
                <img
                  src="/src/assets/images/hero_croissant_crumb_1793434738701.jpg"
                  alt="Golden French butter croissant halved showing open honeycomb crumb"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Front Layer of White Curved Swoop (wrapping over front of photo) */}
              <svg
                viewBox="0 0 600 350"
                className="absolute -top-16 -left-12 w-[120%] h-[140%] pointer-events-none z-20 overflow-visible"
                fill="none"
              >
                <path
                  d="M 520 220 C 480 300, 240 340, 160 300 C 100 270, 90 220, 120 180"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Row: Explore Menu Button (left) + Warm Tagline (right) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 pb-12 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <ScallopButton
                variant="lime"
                size="lg"
                onClick={onExploreMenu}
                className="shadow-xl"
              >
                Explore the menu
              </ScallopButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-right sm:max-w-md"
            >
              <p className="text-sm sm:text-base font-medium text-white/90 leading-snug">
                <span className="mr-1.5" role="img" aria-label="croissant">🥐</span>
                A neighborhood bakery making slow-fermented bread, buttery pastries, and reasons to stop by.
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scalloped Wavy Bottom Edge Transitioning into Warm Cream */}
      <div className="w-full relative z-30">
        <ScallopDivider color="#0B3FBF" direction="down" />
      </div>
    </section>
  );
}
