import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight, Trash2, AlertCircle } from 'lucide-react';
import { BakeryItem } from '../data/bakeryData';
import { ScallopButton } from './ScallopButton';

export interface CartItem {
  item: BakeryItem;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  cafeName: string;
}

export function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  cafeName,
}: OrderDrawerProps) {
  const [pickupTime, setPickupTime] = useState('Today, 8:30 AM (Express)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState<{
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
  } | null>(null);

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const tax = subtotal * 0.05; // 5% bakery tax
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName.trim()) {
      setFormError('Please enter your name for the order pickup box.');
      return;
    }
    setFormError('');

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `SC-${randomNum}`;
    setOrderNumber(orderRef);
    setOrderSummary({
      items: [...cart],
      subtotal,
      tax,
      total,
    });

    // Save demo order to localStorage
    try {
      const demoOrder = {
        id: orderRef,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        pickupTime,
        items: cart,
        total,
        date: new Date().toLocaleString(),
      };
      const existing = JSON.parse(localStorage.getItem('sunday_crumb_orders') || '[]');
      localStorage.setItem('sunday_crumb_orders', JSON.stringify([demoOrder, ...existing]));
    } catch {
      // ignore
    }

    setIsOrdered(true);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearCart();
    setCustomerName('');
    setCustomerPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative z-10 w-full max-w-md bg-[#FFF8E7] text-[#0B3FBF] h-full shadow-2xl flex flex-col justify-between border-l-4 border-[#0B3FBF]"
          >
            {/* Header */}
            <div className="p-6 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F55A] text-[#0B3FBF] rounded-xl font-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl leading-none text-white">Your Pastry Box</h3>
                  <p className="text-xs text-white/80 mt-1 font-medium">
                    {cart.reduce((tot, i) => tot + i.quantity, 0)} freshly packed bakes
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

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isOrdered ? (
                /* Confirmation Screen */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-[#E6F55A] text-[#0B3FBF] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-3xl text-[#0B3FBF]">
                    Order Confirmed!
                  </h4>
                  <div className="p-4 bg-white rounded-2xl border-2 border-[#0B3FBF]/20 text-left space-y-2">
                    <div className="flex justify-between border-b border-[#0B3FBF]/10 pb-2">
                      <span className="text-xs uppercase tracking-widest font-bold text-[#0B3FBF]/60">
                        Order Code
                      </span>
                      <strong className="font-display text-lg text-[#0B3FBF]">
                        {orderNumber}
                      </strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#0B3FBF]/70">Customer:</span>
                      <strong className="text-[#0B3FBF]">{customerName}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#0B3FBF]/70">Pickup Window:</span>
                      <strong className="text-[#0B3FBF]">{pickupTime}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#0B3FBF]/70">Total (Demo):</span>
                      <strong className="text-[#0B3FBF]">${orderSummary?.total.toFixed(2)}</strong>
                    </div>

                    <div className="pt-2 border-t border-[#0B3FBF]/10 text-xs space-y-1">
                      <span className="font-bold text-[#0B3FBF]/70">Packed Items:</span>
                      {orderSummary?.items.map((it) => (
                        <div key={it.item.id} className="flex justify-between text-[11px] text-[#0B3FBF]/80">
                          <span>{it.quantity}x {it.item.name}</span>
                          <span>${(it.item.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#E6F55A]/50 rounded-xl text-xs text-[#0B3FBF] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Demo order saved locally. Pay at counter on pickup.</span>
                  </div>

                  <div className="pt-2">
                    <ScallopButton variant="cobalt" size="md" onClick={handleReset}>
                      Got it, thank you!
                    </ScallopButton>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                /* Empty Cart */
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
                /* Cart Items List */
                <div className="space-y-4">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-2xl border border-[#0B3FBF]/15 shadow-xs flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#0B3FBF]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-sm sm:text-base text-[#0B3FBF] truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs font-semibold text-[#0B3FBF]/70 tabular-nums">
                          ${item.price.toFixed(2)} each · ${(item.price * quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-[#FFF8E7] px-2 py-1 rounded-full border border-[#0B3FBF]/20 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0B3FBF] hover:bg-[#E6F55A] transition-colors cursor-pointer text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display text-xs font-bold w-4 text-center tabular-nums">
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

                      {/* Remove Trash Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#0B3FBF]/40 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Pickup Options & Form */}
                  <div className="p-4 bg-white rounded-2xl border border-[#0B3FBF]/15 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF]">
                      Express Pickup Time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#0B3FBF]/20 text-xs font-medium text-[#0B3FBF] bg-[#FFF8E7] focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
                    >
                      <option>Today, 8:30 AM (Express Hatch)</option>
                      <option>Today, 10:00 AM (Hot Batch 2)</option>
                      <option>Today, 12:00 PM (Lunch Break)</option>
                      <option>Tomorrow, 7:30 AM (Early Birds)</option>
                      <option>Tomorrow, 9:00 AM (Weekend Brunch)</option>
                    </select>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                          className="w-full p-2 rounded-xl border border-[#0B3FBF]/20 text-xs text-[#0B3FBF] placeholder-[#0B3FBF]/50 focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="(555) 000-0000"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full p-2 rounded-xl border border-[#0B3FBF]/20 text-xs text-[#0B3FBF] placeholder-[#0B3FBF]/50 focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Calculations & Checkout */}
            {!isOrdered && cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#0B3FBF]/15 space-y-3">
                <div className="space-y-1.5 text-xs text-[#0B3FBF]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Local Tax (5%)</span>
                    <span className="font-semibold tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#0B3FBF] pt-1 border-t border-[#0B3FBF]/10">
                    <span>Total</span>
                    <span className="font-display text-xl text-[#0B3FBF] tabular-nums">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {formError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <ScallopButton
                  variant="lime"
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Place Demo Order (${total.toFixed(2)})
                </ScallopButton>
                <p className="text-center text-[10px] text-[#0B3FBF]/60 font-medium">
                  Demo Checkout · No real charge · Express pickup at {cafeName}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
