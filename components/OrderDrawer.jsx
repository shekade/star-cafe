'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { ScallopButton } from './ScallopButton';

export function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
  cafeName,
}) {
  const [pickupTime, setPickupTime] = useState('Today, 8:30 AM (Express)');
  const [customerName, setCustomerName] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(`SC-${randomNum}`);
    setIsOrdered(true);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative z-10 w-full max-w-md bg-[#FFF8E7] text-[#0B3FBF] h-full shadow-2xl flex flex-col justify-between border-l-4 border-[#0B3FBF]"
          >
            <div className="p-6 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F55A] text-[#0B3FBF] rounded-xl font-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl leading-none">Your Pastry Box</h3>
                  <p className="text-xs text-white/80 mt-1 font-medium">
                    {cart.reduce((total, i) => total + i.quantity, 0)} freshly packed bakes
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isOrdered ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#E6F55A] text-[#0B3FBF] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-3xl text-[#0B3FBF]">
                    Bakes Confirmed!
                  </h4>
                  <div className="p-4 bg-white rounded-2xl border-2 border-[#0B3FBF]/20">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#0B3FBF]/60">
                      Order Reference
                    </p>
                    <p className="font-display text-2xl text-[#0B3FBF] font-black mt-1">
                      {orderNumber}
                    </p>
                    <p className="text-xs text-[#0B3FBF]/80 mt-2 font-medium">
                      Pickup Window: <strong>{pickupTime}</strong>
                    </p>
                    <p className="text-xs text-[#0B3FBF]/80 font-medium">
                      Location: 18 Market Lane, Brookfield
                    </p>
                  </div>
                  <p className="text-sm text-[#0B3FBF]/80 leading-relaxed">
                    Your box has been sent to our morning ovens! Just show your name or order number at the side counter for express pickup.
                  </p>
                  <div className="pt-4">
                    <ScallopButton variant="cobalt" size="md" onClick={handleReset}>
                      Got it, thank you!
                    </ScallopButton>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0B3FBF]/10 mx-auto flex items-center justify-center text-3xl shadow-sm">
                    🥐
                  </div>
                  <h4 className="font-display text-2xl text-[#0B3FBF]">
                    Your box is empty!
                  </h4>
                  <p className="text-sm text-[#0B3FBF]/75 max-w-xs mx-auto">
                    Add a flaky butter croissant, cardamom morning bun, or country sourdough to get started.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm font-display font-bold text-[#0B3FBF] underline underline-offset-4 hover:text-[#0B3FBF]/80 cursor-pointer pt-2"
                  >
                    <span>Browse today&apos;s bakes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-2xl border border-[#0B3FBF]/15 shadow-xs flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#0B3FBF]/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-base text-[#0B3FBF] truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs font-semibold text-[#0B3FBF]/70 tabular-nums">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-[#FFF8E7] px-2 py-1 rounded-full border border-[#0B3FBF]/20">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0B3FBF] hover:bg-[#E6F55A] transition-colors cursor-pointer text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display text-sm font-bold w-4 text-center tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0B3FBF] hover:bg-[#E6F55A] transition-colors cursor-pointer text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-white rounded-2xl border border-[#0B3FBF]/15 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF]">
                      Express Pickup Time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#0B3FBF]/20 text-xs font-medium text-[#0B3FBF] bg-[#FFF8E7] focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
                    >
                      <option>Today, 8:30 AM (Express)</option>
                      <option>Today, 10:00 AM (Hot Batch 2)</option>
                      <option>Today, 12:00 PM (Lunch Break)</option>
                      <option>Tomorrow, 7:30 AM (Early Birds)</option>
                      <option>Tomorrow, 9:00 AM (Weekend Brunch)</option>
                    </select>

                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] pt-1">
                      Your Name on Box
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex M."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-[#0B3FBF]/20 text-xs text-[#0B3FBF] placeholder-[#0B3FBF]/50 focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
                    />
                  </div>
                </div>
              )}
            </div>

            {!isOrdered && cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#0B3FBF]/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0B3FBF]/80">
                    Subtotal (Taxes incl.)
                  </span>
                  <span className="font-display text-2xl text-[#0B3FBF] font-black tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <ScallopButton
                  variant="lime"
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Confirm Pre-Order (${subtotal.toFixed(2)})
                </ScallopButton>
                <p className="text-center text-[11px] text-[#0B3FBF]/60 font-medium">
                  Pay at counter or online on pickup · Packed with love at {cafeName}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
