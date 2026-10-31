'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScallopDivider } from './ScallopDivider';
import { ScallopButton } from './ScallopButton';

export function HowToOrder({ onBrowseMenu, onOpenPreorder, onOpenCatering }) {
  const [activeTab, setActiveTab] = useState(0);

  const orderMethods = [
    {
      id: 'visit',
      title: 'Visit the bakery.',
      subtitle: 'Drop-ins & Daily Craving',
      description:
        "Pop in for fresh bread, pastries and coffee to take away. Choose from the day's counter selection, available while it lasts. Warm batches out at 7am, 9:30am, and 11:30am.",
      image: '/src/assets/images/bakery_counter_bag_1793434740010.jpg',
      alt: 'Baker passing blue paper pastry takeaway bag over sunlit wooden counter',
      buttonText: 'Browse the menu',
      action: onBrowseMenu,
      rotation: '-rotate-1',
    },
    {
      id: 'preorder',
      title: 'Pre-order pastry boxes.',
      subtitle: 'Skip the Weekend Queue',
      description:
        'Planning a family breakfast or office treat? Order your pastry box 24 hours in advance. Walk straight to our side express hatch, grab your box, and be the favorite human of the day.',
      image: '/src/assets/images/pastry_table_spread_1793434739663.jpg',
      alt: 'Assorted pastries and flat white coffees on wooden cafe table',
      buttonText: 'Pre-order a box',
      action: onOpenPreorder,
      rotation: 'rotate-1',
    },
    {
      id: 'catering',
      title: 'Catering & large gatherings.',
      subtitle: 'Meetings, Parties & Weddings',
      description:
        'We bake customized assortments for events of 15 to 200+ people. Mini laminated pastries, batch-brewed specialty filter coffee urns, and artisanal sourdough sandwich platters.',
      image: '/src/assets/images/pastry_cinnamon_bun_1793434739515.jpg',
      alt: 'Cardamom morning buns freshly baked',
      buttonText: 'Inquire for catering',
      action: onOpenCatering,
      rotation: '-rotate-1.5',
    },
  ];

  return (
    <section className="relative bg-[#0B3FBF] text-white pt-0 pb-0 overflow-hidden">
      <div className="w-full relative z-20">
        <ScallopDivider color="#FFF8E7" direction="down" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight"
          >
            How to order
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl text-white/85 font-medium mt-3 max-w-xl mx-auto"
          >
            Drop in for today&apos;s bakes, or plan ahead for catering and larger orders.
          </motion.p>

          <div className="mt-8 inline-flex items-center gap-2 p-1.5 bg-white/10 rounded-full border border-white/20">
            {orderMethods.map((method, idx) => (
              <button
                key={method.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-[#E6F55A] text-[#0B3FBF] shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {method.id === 'visit' ? '01. Visit us' : method.id === 'preorder' ? '02. Pre-order' : '03. Catering'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[440px] flex items-center justify-center">
          <div className="absolute inset-0 max-w-3xl mx-auto bg-white/20 rounded-3xl transform rotate-3 scale-95 pointer-events-none" />
          <div className="absolute inset-0 max-w-3xl mx-auto bg-white/40 rounded-3xl transform -rotate-2 scale-98 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`relative z-20 w-full bg-[#FFF8E7] text-[#0B3FBF] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-white/60 transform ${orderMethods[activeTab].rotation}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border-2 border-[#0B3FBF]/10 bg-white">
                    <img
                      src={orderMethods[activeTab].image}
                      alt={orderMethods[activeTab].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B3FBF]/60">
                    {orderMethods[activeTab].subtitle}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#0B3FBF] tracking-tight leading-tight">
                    {orderMethods[activeTab].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0B3FBF]/85 leading-relaxed">
                    {orderMethods[activeTab].description}
                  </p>
                  <div className="pt-3">
                    <ScallopButton
                      variant="lime"
                      size="md"
                      onClick={orderMethods[activeTab].action}
                    >
                      {orderMethods[activeTab].buttonText}
                    </ScallopButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full relative z-20">
        <ScallopDivider color="#0B3FBF" direction="down" />
      </div>
    </section>
  );
}
