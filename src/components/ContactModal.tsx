import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { ScallopButton } from './ScallopButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultType?: string;
  cafeName: string;
}

export function ContactModal({
  isOpen,
  onClose,
  title = 'Get in Touch',
  defaultType = 'general',
  cafeName,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState(defaultType);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setNotes('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative z-10 w-full max-w-lg bg-[#FFF8E7] text-[#0B3FBF] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#0B3FBF] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#0B3FBF]/10 text-[#0B3FBF] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#E6F55A] text-[#0B3FBF] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-3xl text-[#0B3FBF]">
                  Message Received!
                </h3>
                <p className="text-sm text-[#0B3FBF]/85 max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out! Our head baker or catering coordinator will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B3FBF]/60">
                  {cafeName}
                </span>
                <h3 className="font-display text-3xl text-[#0B3FBF] mt-1 mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0B3FBF]/80 mb-6 font-medium">
                  Have a question about ingredients, pre-ordering, or catering a special breakfast gathering? Drop us a note!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Topic / Event Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    >
                      <option value="catering">Catering & Event Pastry Boxes</option>
                      <option value="preorder">Pre-Order Question</option>
                      <option value="dietary">Dietary & Allergen Inquiries</option>
                      <option value="general">General Friendly Hello</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Details / Number of Guests
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you have in mind (date, guest count, favorite pastries)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    />
                  </div>

                  <div className="pt-2">
                    <ScallopButton
                      variant="lime"
                      size="md"
                      type="submit"
                      className="w-full"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </ScallopButton>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
