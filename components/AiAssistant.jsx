'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Check, Send, X } from 'lucide-react';
import { BAKERY_ITEMS } from '../data/bakeryData';

const SUGGESTED_QUESTIONS = [
  '🥐 What is your signature pastry?',
  '🌱 What are your vegan options?',
  '☕ Best coffee pairing for morning bun?',
  '⏰ When are hot batches ready?',
  '💰 What can I get under $5.00?',
  '📦 How do weekend pastry boxes work?',
];

export function AiAssistant({ onAddToCart, cafeName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState({});
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello there! 🥐 I'm your ${cafeName} Assistant. Ask me about fresh hot batches, coffee pairings, dietary ingredients, or let me recommend something delicious for your morning!`,
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const generateMockReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes('signature') || q.includes('best seller') || q.includes('popular') || q.includes('famous')) {
      const croissant = BAKERY_ITEMS.find((i) => i.id === 'classic-croissant');
      const bun = BAKERY_ITEMS.find((i) => i.id === 'cardamom-bun');
      return {
        text: `Our absolute stars are the Classic Butter Croissant (72 flaky folds!) and the Cardamom Morning Bun with raw demerara sugar crunch. They usually sell out by noon!`,
        items: [croissant, bun].filter(Boolean),
      };
    }

    if (q.includes('vegan') || q.includes('dairy free') || q.includes('plant')) {
      const veganItems = BAKERY_ITEMS.filter((i) => i.dietary?.includes('Vegan'));
      return {
        text: `Yes! Our Country Sourdough Batard is 100% naturally vegan (wild starter, flour, water, sea salt). For drinks, our Sparkling Cold Brew Tonic and Iced Cardamom Spiced Latte (with oat milk) are completely plant-based!`,
        items: veganItems,
      };
    }

    if (q.includes('coffee') || q.includes('drink') || q.includes('latte') || q.includes('pairing')) {
      const flatWhite = BAKERY_ITEMS.find((i) => i.id === 'velvet-flat-white');
      const bun = BAKERY_ITEMS.find((i) => i.id === 'cardamom-bun');
      const coldBrew = BAKERY_ITEMS.find((i) => i.id === 'cold-brew-tonic');
      return {
        text: `For morning bliss, nothing beats our Velvet Flat White paired with a warm Cardamom Morning Bun! If you fancy something refreshing, try our Sparkling Cold Brew Tonic with candied orange peel.`,
        items: [flatWhite, bun, coldBrew].filter(Boolean),
      };
    }

    if (q.includes('time') || q.includes('batch') || q.includes('hot') || q.includes('hours') || q.includes('oven')) {
      return {
        text: `Our morning ovens drop fresh warm pastries in three daily batches:\n• 7:00 AM (Early riser batch)\n• 9:30 AM (Mid-morning rush)\n• 11:30 AM (Lunch sourdoughs)\nWe're open Tue–Fri 7am–3pm, and Sat–Sun 8am–2pm!`,
      };
    }

    if (q.includes('budget') || q.includes('under $5') || q.includes('under 5') || q.includes('cheap') || q.includes('price')) {
      const budgetItems = BAKERY_ITEMS.filter((i) => i.price <= 5.0);
      return {
        text: `Here are our top bakes and brews under $5.00:`,
        items: budgetItems,
      };
    }

    if (q.includes('box') || q.includes('pre-order') || q.includes('preorder') || q.includes('catering') || q.includes('six')) {
      const box = BAKERY_ITEMS.find((i) => i.id === 'weekend-box');
      return {
        text: `Our Weekend Pastry Box (6 pieces) comes with 2 butter croissants, 2 morning buns, and 2 pains au chocolat for $28.00. Pre-orders placed 24h ahead skip the line via our express pickup hatch!`,
        items: box ? [box] : undefined,
      };
    }

    const recommendations = BAKERY_ITEMS.slice(0, 2);
    return {
      text: `That sounds wonderful! At ${cafeName}, everything is hand-laminated with cultured Normandy butter and stoneground flour. Here are two of our favorites you might enjoy today:`,
      items: recommendations,
    };
  };

  const handleSend = (userText) => {
    if (!userText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateMockReply(userText);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply.text,
        items: reply.items,
        timestamp: 'Just now',
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMsg]);
    }, 750);
  };

  const handleAddItem = (item) => {
    onAddToCart(item);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0B3FBF] text-[#E6F55A] rounded-full shadow-2xl border-2 border-[#E6F55A] cursor-pointer"
            aria-label="Open AI Cafe Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6F55A] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E6F55A]" />
            </span>
            <Sparkles className="w-4 h-4 text-[#E6F55A]" />
            <span className="font-display text-sm tracking-wide text-white font-bold">
              Ask Bakery AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="w-[92vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-[#FFF8E7] rounded-3xl shadow-2xl border-4 border-[#0B3FBF] flex flex-col overflow-hidden text-[#0B3FBF]"
          >
            <div className="px-5 py-4 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E6F55A] text-[#0B3FBF] flex items-center justify-center font-bold text-lg shadow-sm">
                  🥐
                </div>
                <div>
                  <h3 className="font-display text-base leading-none text-white">
                    {cafeName} AI Assistant
                  </h3>
                  <p className="text-[11px] text-[#E6F55A] font-medium mt-0.5">
                    Online · Fresh from the oven
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0B3FBF] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-[#0B3FBF] border border-[#0B3FBF]/15 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>

                    {msg.items && msg.items.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-[#0B3FBF]/10">
                        {msg.items.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 bg-[#FFF8E7] rounded-xl border border-[#0B3FBF]/15 flex items-center justify-between gap-2.5"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#0B3FBF]/10"
                            />
                            <div className="flex-1 min-w-0 text-left">
                              <p className="font-display text-xs text-[#0B3FBF] truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] font-bold text-[#0B3FBF]/80 tabular-nums">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAddItem(item)}
                              className={`shrink-0 px-2 py-1 rounded-lg text-[10px] font-display uppercase font-bold transition-all cursor-pointer flex items-center gap-1 ${
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
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#0B3FBF]/50 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 bg-white rounded-2xl border border-[#0B3FBF]/15 w-16">
                  <span className="w-2 h-2 rounded-full bg-[#0B3FBF] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[#0B3FBF] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#0B3FBF] animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-2 bg-white/60 border-t border-[#0B3FBF]/10 overflow-x-auto flex gap-1.5 no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.replace(/^[^\s]+\s/, ''))}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-[#0B3FBF]/20 text-[11px] font-medium text-[#0B3FBF] hover:bg-[#E6F55A] transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white border-t border-[#0B3FBF]/15 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pastries, coffee, batches..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#FFF8E7] border border-[#0B3FBF]/20 text-xs text-[#0B3FBF] placeholder-[#0B3FBF]/50 focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-[#0B3FBF] text-[#E6F55A] hover:bg-[#093299] disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
