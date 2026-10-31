'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Bus, Car, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/bakeryData';
import { ScallopButton } from './ScallopButton';

export function DirectionsModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative z-10 w-full max-w-lg bg-[#FFF8E7] text-[#0B3FBF] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#0B3FBF] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#0B3FBF]/10 text-[#0B3FBF] transition-colors cursor-pointer"
              aria-label="Close directions modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-[#0B3FBF]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B3FBF]/60">
                Finding Us
              </span>
            </div>
            <h3 className="font-display text-3xl text-[#0B3FBF] mb-2">
              {CAFE_INFO.address}
            </h3>
            <p className="text-xs sm:text-sm text-[#0B3FBF]/80 mb-6 font-medium">
              We&apos;re situated right on the corner of Market Lane and Elm Street, directly across from the historic clocktower. Look for our cobalt blue awnings and the aroma of roasted cardamom!
            </p>

            <div className="relative h-44 rounded-2xl bg-white border-2 border-[#0B3FBF]/15 overflow-hidden p-4 mb-6 flex flex-col justify-between">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0B3FBF_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="absolute top-1/2 left-0 right-0 h-8 bg-[#0B3FBF]/10 -translate-y-1/2 flex items-center px-4">
                <span className="text-[10px] font-bold text-[#0B3FBF]/40 uppercase tracking-widest">
                  Market Lane
                </span>
              </div>
              <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-[#0B3FBF]/10 flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#0B3FBF]/40 uppercase tracking-widest rotate-90 whitespace-nowrap">
                  Elm St
                </span>
              </div>

              <div className="relative z-10 self-center my-auto flex flex-col items-center">
                <div className="p-2.5 bg-[#E6F55A] text-[#0B3FBF] rounded-full border-2 border-[#0B3FBF] shadow-md animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="mt-1 px-2.5 py-0.5 bg-[#0B3FBF] text-white text-[11px] font-display rounded-md">
                  Sunday Crumb Bakery
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#0B3FBF]/85 font-medium mb-6">
              <div className="flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-[#0B3FBF] shrink-0 mt-0.5" />
                <span>Transit: Bus routes #14 & #22 stop directly at Market Lane (1 min walk).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#0B3FBF] shrink-0 mt-0.5" />
                <span>Parking: 30-minute quick-pickup parking bays right outside our front door.</span>
              </div>
            </div>

            <ScallopButton
              variant="lime"
              size="md"
              className="w-full"
              onClick={() => window.open(CAFE_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer')}
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Open in Google Maps
            </ScallopButton>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
