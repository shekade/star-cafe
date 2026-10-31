import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/bakeryData';
import { ScallopButton } from './ScallopButton';

interface FaqProps {
  onGetInTouch: () => void;
}

export function Faq({ onGetInTouch }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#FFF8E7] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading + Pun + Get in Touch button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="font-display text-4xl sm:text-6xl text-[#0B3FBF] tracking-tight leading-[1.05]">
              A few things you
              <br />
              <span className="text-[#0B3FBF] underline decoration-[#E6F55A] decoration-4 underline-offset-4">
                knead
              </span>{' '}
              to know.
            </h2>
            <p className="text-base sm:text-lg text-[#0B3FBF]/80 font-medium">
              Everything from morning bake times and flour sourcing to picking up pre-ordered weekend boxes.
            </p>
            <div className="pt-2">
              <ScallopButton
                variant="lime"
                size="md"
                onClick={onGetInTouch}
              >
                Get in touch
              </ScallopButton>
            </div>
          </motion.div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="bg-white/80 backdrop-blur-xs rounded-2xl border-2 border-[#0B3FBF]/10 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg sm:text-xl text-[#0B3FBF] leading-snug">
                      {item.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#0B3FBF]/5 flex items-center justify-center text-[#0B3FBF] transition-transform duration-200">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#0B3FBF]/85 leading-relaxed border-t border-[#0B3FBF]/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
