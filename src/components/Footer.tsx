import React, { useState } from 'react';
import { ScallopDivider } from './ScallopDivider';
import {
  BreadLoafDoodle,
  CroissantDoodle,
  CookieDoodle,
  TakeawayBagDoodle,
  PretzelDoodle,
  CrumbClubBadge,
} from './Doodles';
import { CAFE_INFO } from '../data/bakeryData';

interface FooterProps {
  cafeName: string;
  onOpenCatering: () => void;
  onOpenMenu: () => void;
}

export function Footer({ cafeName, onOpenCatering, onOpenMenu }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const brandWord = cafeName.split(' ')[0] ? cafeName.split(' ')[1] || cafeName.split(' ')[0] : 'CRUMB';

  return (
    <footer className="relative bg-[#0B3FBF] text-white pt-0 pb-12 overflow-hidden">
      
      {/* Scalloped wave top (Cream wave pointing down into blue) */}
      <div className="w-full relative z-20">
        <ScallopDivider color="#FFF8E7" direction="down" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 relative z-10">
        
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-white/15">
          
          {/* Column 1: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xl text-white tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#E6F55A] transition-colors cursor-pointer"
                >
                  Our Bakery
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCatering}
                  className="hover:text-[#E6F55A] transition-colors cursor-pointer"
                >
                  Catering & Events
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-[#E6F55A] transition-colors cursor-pointer"
                >
                  Daily Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('visit-us')}
                  className="hover:text-[#E6F55A] transition-colors cursor-pointer"
                >
                  Hours & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xl text-white tracking-wide">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li>
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="hover:text-[#E6F55A] transition-colors"
                >
                  {CAFE_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="hover:text-[#E6F55A] transition-colors"
                >
                  {CAFE_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CAFE_INFO.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E6F55A] transition-colors"
                >
                  Instagram ({CAFE_INFO.instagram})
                </a>
              </li>
              <li>
                <span className="text-white/60">WhatsApp Orders Available</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xl text-white tracking-wide">
              Visit Us
            </h4>
            <div className="space-y-2 text-sm text-white/80 font-medium">
              <p className="font-semibold text-white">{CAFE_INFO.address}</p>
              <p>Tue–Fri: 7am–3pm</p>
              <p>Sat–Sun: 8am–2pm</p>
              <p className="text-white/60 italic">Mon: Closed</p>
            </div>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xl text-white tracking-wide">
              Sign up for a little joy.
            </h4>
            <p className="text-xs text-white/75 font-normal leading-relaxed">
              Be the first to hear about special holiday bakes, weekend specials, and flour drops.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#E6F55A] text-[#0B3FBF] font-display text-xs rounded-xl text-center">
                🎉 Welcome to the club! Check your inbox for pastry love.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 text-xs focus:outline-none focus:border-[#E6F55A] focus:ring-1 focus:ring-[#E6F55A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-white text-[#0B3FBF] font-display text-xs uppercase tracking-wider hover:bg-[#E6F55A] transition-colors font-black shrink-0 cursor-pointer"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>

        </div>

        {/* GIANT Oversized Wordmark with Overlapping Hand-drawn Doodles */}
        <div className="relative pt-12 sm:pt-16 pb-8 text-center select-none overflow-visible">
          
          {/* Overlapping Doodle 1: Sourdough Loaf resting top-left */}
          <div className="absolute top-4 sm:top-6 left-[18%] z-20 pointer-events-none transform -rotate-12">
            <div className="p-2 bg-white rounded-2xl shadow-lg border-2 border-[#0B3FBF]/20">
              <BreadLoafDoodle className="w-14 h-10 sm:w-20 sm:h-14" stroke="#0B3FBF" />
            </div>
          </div>

          {/* Overlapping Doodle 2: Rotating Crumb Club Badge in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <CrumbClubBadge text="CRUMB CLUB" className="w-20 h-20 sm:w-28 sm:h-28" />
          </div>

          {/* Overlapping Doodle 3: Cookie with bite on right */}
          <div className="absolute top-2 sm:top-4 right-[16%] z-20 pointer-events-none transform rotate-12">
            <div className="p-2 bg-white rounded-2xl shadow-lg border-2 border-[#0B3FBF]/20">
              <CookieDoodle className="w-12 h-12 sm:w-16 sm:h-16" stroke="#0B3FBF" />
            </div>
          </div>

          {/* Overlapping Doodle 4: Croissant bottom-center */}
          <div className="absolute -bottom-2 right-[28%] z-20 pointer-events-none transform rotate-6">
            <div className="p-2 bg-white rounded-2xl shadow-lg border-2 border-[#0B3FBF]/20">
              <CroissantDoodle className="w-14 h-12 sm:w-18 sm:h-14" stroke="#0B3FBF" />
            </div>
          </div>

          {/* Overlapping Doodle 5: Takeaway bag bottom-left */}
          <div className="absolute -bottom-3 left-[28%] z-20 pointer-events-none transform -rotate-6">
            <div className="p-2 bg-white rounded-2xl shadow-lg border-2 border-[#0B3FBF]/20">
              <TakeawayBagDoodle className="w-12 h-14 sm:w-16 sm:h-18" stroke="#0B3FBF" />
            </div>
          </div>

          {/* The Massive Giant Typography Wordmark */}
          <h2 className="font-display text-[17vw] leading-none tracking-tighter text-[#FFF8E7] uppercase font-black drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] pointer-events-none">
            {brandWord.toUpperCase()}
          </h2>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 font-medium gap-4">
          <p>© {new Date().getFullYear()} {cafeName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>·</span>
            <span className="text-[#E6F55A] font-bold">Baked fresh daily 🥐</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
