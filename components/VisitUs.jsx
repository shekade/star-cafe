'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { CAFE_INFO } from '../data/bakeryData';
import { ScallopButton } from './ScallopButton';

export function VisitUs({ onGetDirections }) {
  const handleDirectionsClick = () => {
    if (onGetDirections) {
      onGetDirections();
    } else {
      window.open(CAFE_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="visit-us" className="bg-[#FFF8E7] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-5xl sm:text-7xl text-[#0B3FBF] tracking-tight">
            Come on in.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 sm:p-12 border-2 border-[#0B3FBF]/15 shadow-[0_15px_40px_rgba(11,63,191,0.08)] max-w-2xl mx-auto"
        >
          <div className="mb-4">
            <h3 className="font-display text-3xl sm:text-4xl text-[#0B3FBF] leading-tight">
              {CAFE_INFO.address}
            </h3>
            <p className="text-base text-[#0B3FBF]/80 mt-2 font-medium">
              Your morning coffee, a warm flaky pastry, and a sourdough loaf to take home. We&apos;ll see you at the counter.
            </p>
          </div>

          <div className="my-8 divide-y divide-[#0B3FBF]/10 border-y border-[#0B3FBF]/10">
            {CAFE_INFO.hours.map((row) => (
              <div
                key={row.day}
                className="py-3.5 flex items-center justify-between text-base sm:text-lg"
              >
                <span className="font-semibold text-[#0B3FBF]/90">
                  {row.day}
                </span>
                <span
                  className={`font-display tracking-wide ${
                    row.time.includes('Closed')
                      ? 'text-[#0B3FBF]/50 font-normal italic'
                      : 'text-[#0B3FBF] font-black'
                  }`}
                >
                  {row.time}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-xs sm:text-sm text-[#0B3FBF]/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0B3FBF] shrink-0" />
              <span>Corner of 3rd & Market</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0B3FBF] shrink-0" />
              <span>Fresh bakes out 7am</span>
            </div>
          </div>

          <div className="pt-2">
            <ScallopButton
              variant="cobalt"
              size="md"
              onClick={handleDirectionsClick}
              icon={<Navigation className="w-4 h-4" />}
            >
              Get directions
            </ScallopButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
