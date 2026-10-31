'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Plus, Check, RefreshCw } from 'lucide-react';
import { BAKERY_ITEMS } from '../data/bakeryData';

export function SmartRecommendationsModal({
  isOpen,
  onClose,
  onAddToCart,
  cafeName,
}) {
  const [flavor, setFlavor] = useState('any');
  const [temperature, setTemperature] = useState('any');
  const [dietary, setDietary] = useState('any');
  const [budget, setBudget] = useState(10);
  const [addedItemMap, setAddedItemMap] = useState({});

  const matchedItems = useMemo(() => {
    return BAKERY_ITEMS.filter((item) => {
      if (item.price > budget) return false;
      if (flavor !== 'any' && item.flavor && !item.flavor.includes(flavor)) {
        return false;
      }
      if (temperature !== 'any' && item.temperature && !item.temperature.includes(temperature)) {
        return false;
      }
      if (dietary !== 'any' && (!item.dietary || !item.dietary.includes(dietary))) {
        return false;
      }
      return true;
    });
  }, [flavor, temperature, dietary, budget]);

  const handleAddItem = (item) => {
    onAddToCart(item);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const resetFilters = () => {
    setFlavor('any');
    setTemperature('any');
    setDietary('any');
    setBudget(10);
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
            <div className="p-6 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F55A] text-[#0B3FBF] rounded-xl font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#E6F55A] font-bold">
                    Taste Matcher
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                    Smart Food & Drink Recommendations
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close recommendations"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-white/80 border-b border-[#0B3FBF]/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1.5">
                    Flavor Profile
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'any', label: 'All' },
                      { id: 'sweet', label: 'Sweet' },
                      { id: 'spiced', label: 'Spiced' },
                      { id: 'savory', label: 'Savory' },
                      { id: 'buttery', label: 'Buttery' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setFlavor(opt.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          flavor === opt.id
                            ? 'bg-[#0B3FBF] text-[#E6F55A]'
                            : 'bg-[#FFF8E7] text-[#0B3FBF] hover:bg-[#0B3FBF]/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1.5">
                    Temperature
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'any', label: 'Any' },
                      { id: 'hot', label: '🔥 Hot / Warm' },
                      { id: 'cold', label: '❄️ Cold' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setTemperature(opt.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          temperature === opt.id
                            ? 'bg-[#0B3FBF] text-[#E6F55A]'
                            : 'bg-[#FFF8E7] text-[#0B3FBF] hover:bg-[#0B3FBF]/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1.5">
                    Dietary
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'any', label: 'Any' },
                      { id: 'Vegetarian', label: 'Vegetarian' },
                      { id: 'Vegan', label: 'Vegan' },
                      { id: 'Nut-Free', label: 'Nut-Free' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDietary(opt.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          dietary === opt.id
                            ? 'bg-[#0B3FBF] text-[#E6F55A]'
                            : 'bg-[#FFF8E7] text-[#0B3FBF] hover:bg-[#0B3FBF]/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0B3FBF]">
                      Budget Cap
                    </label>
                    <span className="text-xs font-display font-black text-[#0B3FBF] tabular-nums">
                      Up to ${budget.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    step="0.5"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                    className="w-full accent-[#0B3FBF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#0B3FBF]/60 font-semibold mt-1">
                    <span>$4.00</span>
                    <span>$15.00</span>
                    <span>$30.00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#0B3FBF]/10 text-xs">
                <span className="font-semibold text-[#0B3FBF]">
                  Found <strong className="underline decoration-[#E6F55A] decoration-2">{matchedItems.length} matching bakes & brews</strong>
                </span>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[#0B3FBF]/70 hover:text-[#0B3FBF] font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {matchedItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <span className="text-3xl">🥣</span>
                  <h4 className="font-display text-xl text-[#0B3FBF]">
                    No exact match found
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0B3FBF]/70 max-w-sm mx-auto">
                    Try adjusting the budget slider or clearing the dietary filters to see our full daily oven selection.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#E6F55A] text-[#0B3FBF] font-display text-xs font-bold rounded-full hover:bg-[#d8e847] cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 border-2 border-[#0B3FBF]/15 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF8E7] mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {item.badge && (
                            <span className="absolute top-2 left-2 bg-[#E6F55A] text-[#0B3FBF] font-display text-[10px] uppercase px-2 py-0.5 rounded-full border border-[#0B3FBF]/20 shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-display text-base text-[#0B3FBF] leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-display text-sm text-[#0B3FBF] font-black tabular-nums shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-[#0B3FBF]/75 line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#0B3FBF]/10 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B3FBF]/60">
                          {item.dietary?.join(' · ') || 'Fresh daily'}
                        </span>
                        <button
                          onClick={() => handleAddItem(item)}
                          className={`px-3 py-1.5 rounded-full text-xs font-display uppercase font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            addedItemMap[item.id]
                              ? 'bg-[#0B3FBF] text-[#E6F55A]'
                              : 'bg-[#E6F55A] text-[#0B3FBF] hover:bg-[#d8e847]'
                          }`}
                        >
                          {addedItemMap[item.id] ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add to Box</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-[#0B3FBF]/10 flex items-center justify-between text-xs text-[#0B3FBF]/80 font-medium">
              <span>All recipes handcrafted daily with stoneground grain.</span>
              <button
                onClick={onClose}
                className="font-bold underline text-[#0B3FBF] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
