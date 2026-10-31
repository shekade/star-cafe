import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check } from 'lucide-react';
import { BAKERY_ITEMS, BakeryItem } from '../data/bakeryData';
import { ScallopButton } from './ScallopButton';

interface BestSellersProps {
  onAddToCart: (item: BakeryItem) => void;
  onExploreFullMenu: () => void;
}

export function BestSellers({ onAddToCart, onExploreFullMenu }: BestSellersProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (item: BakeryItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  // Rotation angles for playful polaroid effect
  const cardRotations = ['-rotate-1', 'rotate-1.5', '-rotate-1.5', 'rotate-1', '-rotate-0.5', 'rotate-1'];

  return (
    <section id="best-sellers" className="bg-[#FFF8E7] pb-24 sm:pb-32 pt-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Title + Subtext */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl text-[#0B3FBF] tracking-tight"
          >
            Our Best Seller
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg text-[#0B3FBF]/80 font-medium mt-2 tracking-wide lowercase"
          >
            reasons to make us your usual.
          </motion.p>
        </div>

        {/* Responsive Grid of 6 Signature Bakery Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {BAKERY_ITEMS.map((item, index) => {
            const rotation = cardRotations[index % cardRotations.length];
            const isAdded = addedId === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`bg-white rounded-3xl p-5 border-2 border-[#0B3FBF]/10 shadow-[0_10px_30px_rgba(11,63,191,0.06)] transform transition-all duration-300 hover:-translate-y-2.5 hover:rotate-0 hover:shadow-[0_20px_40px_rgba(11,63,191,0.14)] ${rotation} flex flex-col justify-between`}
              >
                <div>
                  {/* Photo with rounded container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF8E7] mb-5 border border-[#0B3FBF]/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-[#E6F55A] text-[#0B3FBF] font-display text-xs uppercase px-3 py-1 rounded-full border border-[#0B3FBF]/20 shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl sm:text-2xl text-[#0B3FBF] leading-snug">
                      {item.name}
                    </h3>
                    <span className="font-display text-lg text-[#0B3FBF] font-bold tabular-nums shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#0B3FBF]/80 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row / Action */}
                <div className="pt-2 border-t border-[#0B3FBF]/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0B3FBF]/60 uppercase tracking-wider">
                    {item.dietary?.join(' · ') || 'Fresh Daily'}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isAdded
                        ? 'bg-[#0B3FBF] text-[#E6F55A]'
                        : 'bg-[#E6F55A] text-[#0B3FBF] hover:bg-[#d8e847] hover:scale-105'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Box</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Explore the Menu Button Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <ScallopButton
            variant="cobalt"
            size="md"
            onClick={onExploreFullMenu}
          >
            Explore the Menu
          </ScallopButton>
        </motion.div>

      </div>
    </section>
  );
}
