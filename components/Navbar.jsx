'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { ScallopButton } from './ScallopButton';

export function Navbar({ cafeName, cartCount, onOpenCart, onOpenCatering }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B3FBF] text-white border-b border-[#0B3FBF]/20 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-2 font-display text-2xl sm:text-3xl tracking-tight text-white transition-transform duration-200 hover:scale-105"
        >
          <span>{cafeName}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-white/90">
          <button
            onClick={() => scrollTo('best-sellers')}
            className="hover:text-[#E6F55A] transition-colors cursor-pointer py-1"
          >
            Menu
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-[#E6F55A] transition-colors cursor-pointer py-1"
          >
            Our bakery
          </button>
          <button
            onClick={() => onOpenCatering()}
            className="hover:text-[#E6F55A] transition-colors cursor-pointer py-1"
          >
            Catering
          </button>
          <button
            onClick={() => scrollTo('visit-us')}
            className="hover:text-[#E6F55A] transition-colors cursor-pointer py-1"
          >
            Visit us
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-[#E6F55A] transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <ScallopButton
            variant="lime"
            size="sm"
            onClick={onOpenCart}
            className="shadow-md"
            icon={<ShoppingBag className="w-4 h-4" />}
          >
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center bg-[#0B3FBF] text-[#E6F55A] font-bold text-xs rounded-full w-5 h-5">
                {cartCount}
              </span>
            )}
          </ScallopButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B3FBF] border-t border-white/10 px-4 pt-4 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('best-sellers')}
            className="block w-full text-left font-display text-xl text-white py-2 hover:text-[#E6F55A] transition-colors"
          >
            Menu
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left font-display text-xl text-white py-2 hover:text-[#E6F55A] transition-colors"
          >
            Our bakery
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCatering();
            }}
            className="block w-full text-left font-display text-xl text-white py-2 hover:text-[#E6F55A] transition-colors"
          >
            Catering & Events
          </button>
          <button
            onClick={() => scrollTo('visit-us')}
            className="block w-full text-left font-display text-xl text-white py-2 hover:text-[#E6F55A] transition-colors"
          >
            Hours & Location
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="block w-full text-left font-display text-xl text-white py-2 hover:text-[#E6F55A] transition-colors"
          >
            Frequently Asked
          </button>
        </div>
      )}
    </header>
  );
}
