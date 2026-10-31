'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Check, Sparkles } from 'lucide-react';
import { BAKERY_ITEMS } from '../data/bakeryData';

export function MenuModal({ isOpen, onClose, onAddToCart, onOpenRecommendations, cafeName }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItem, setAddedItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'pastry', label: 'Laminated Pastries' },
    { id: 'bread', label: 'Slow Sourdoughs' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'box', label: 'Pastry Boxes' },
  ];

  const filteredItems = BAKERY_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  const handleAdd = (item) => {
    onAddToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#FFF8E7] text-[#0B3FBF] rounded-3xl shadow-2xl border-4 border-[#0B3FBF] flex flex-col overflow-hidden"
          >
            <div className="p-6 sm:p-8 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E6F55A] font-bold">
                  Daily Counter Menu
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight">
                  {cafeName} Bakes
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close menu modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 bg-white/70 border-b border-[#0B3FBF]/10 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#0B3FBF] text-[#E6F55A]'
                        : 'bg-white text-[#0B3FBF] border border-[#0B3FBF]/20 hover:bg-[#0B3FBF]/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {onOpenRecommendations && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRecommendations();
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider bg-[#E6F55A] text-[#0B3FBF] hover:bg-[#d8e847] font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Taste Matcher</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-[#0B3FBF]/15 shadow-xs flex gap-4 items-center justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#0B3FBF]/10"
                    />
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-lg text-[#0B3FBF] truncate">
                          {item.name}
                        </h4>
                        <span className="font-display text-base text-[#0B3FBF] font-black tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-[#0B3FBF]/75 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#0B3FBF]/60 tracking-wider">
                          {item.dietary?.join(' · ') || 'Fresh'}
                        </span>
                        <button
                          onClick={() => handleAdd(item)}
                          className={`px-3 py-1 rounded-full text-xs font-display uppercase font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                            addedItem === item.id
                              ? 'bg-[#0B3FBF] text-[#E6F55A]'
                              : 'bg-[#E6F55A] text-[#0B3FBF] hover:bg-[#d8e847]'
                          }`}
                        >
                          {addedItem === item.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#0B3FBF]/10 flex items-center justify-between text-xs text-[#0B3FBF]/80 font-medium">
              <span>All flour sourced sustainably from local stone mills.</span>
              <button
                onClick={onClose}
                className="font-bold underline text-[#0B3FBF] cursor-pointer"
              >
                Back to page
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
