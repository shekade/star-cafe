import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, CheckCircle2, Phone, User, AlertCircle } from 'lucide-react';
import { ScallopButton } from './ScallopButton';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafeName: string;
}

interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: string;
  notes?: string;
  createdAt: string;
}

export function TableBookingModal({ isOpen, onClose, cafeName }: TableBookingModalProps) {
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('09:00 AM');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('Sunlit Window Booth');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [existingBookings, setExistingBookings] = useState<BookingRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const timeSlots = [
    '07:30 AM',
    '08:30 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '01:30 PM',
  ];

  // Load existing bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sunday_crumb_bookings');
      if (stored) {
        setExistingBookings(JSON.parse(stored));
      }
    } catch {
      // ignore JSON errors
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) return;

    const newBooking: BookingRecord = {
      id: `TB-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      seating,
      notes: notes.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      const updated = [newBooking, ...existingBookings];
      localStorage.setItem('sunday_crumb_bookings', JSON.stringify(updated));
      setExistingBookings(updated);
    } catch {
      // ignore
    }

    setConfirmedBooking(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setName('');
    setPhone('');
    setNotes('');
    onClose();
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
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative z-10 w-full max-w-xl max-h-[90vh] bg-[#FFF8E7] text-[#0B3FBF] rounded-3xl shadow-2xl border-4 border-[#0B3FBF] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#0B3FBF] text-white flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F55A] text-[#0B3FBF] rounded-xl font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#E6F55A] font-bold">
                    Morning & Brunch Seating
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                    Reserve a Table
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close table booking"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Demo Notice Banner */}
            <div className="px-6 py-2.5 bg-[#E6F55A] text-[#0B3FBF] text-xs font-semibold flex items-center gap-2 border-b border-[#0B3FBF]/15">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Demo Reservation System:</strong> Bookings are saved locally for demonstration purposes. Tables held for 15 minutes.
              </span>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {confirmedBooking ? (
                /* Confirmation Screen */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-[#E6F55A] text-[#0B3FBF] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-3xl text-[#0B3FBF]">
                    Table Reserved!
                  </h4>
                  <p className="text-sm text-[#0B3FBF]/80">
                    We can&apos;t wait to welcome you to {cafeName}!
                  </p>

                  <div className="p-5 bg-white rounded-2xl border-2 border-[#0B3FBF]/20 space-y-2 text-left text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-[#0B3FBF]/10 pb-2">
                      <span className="text-[#0B3FBF]/60">Booking Code:</span>
                      <strong className="font-display text-base text-[#0B3FBF]">
                        {confirmedBooking.id}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B3FBF]/60">Guest Name:</span>
                      <strong className="text-[#0B3FBF]">{confirmedBooking.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B3FBF]/60">Date & Time:</span>
                      <strong className="text-[#0B3FBF]">
                        {confirmedBooking.date} at {confirmedBooking.time}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B3FBF]/60">Party Size:</span>
                      <strong className="text-[#0B3FBF]">{confirmedBooking.guests} Guests</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0B3FBF]/60">Seating Area:</span>
                      <strong className="text-[#0B3FBF]">{confirmedBooking.seating}</strong>
                    </div>
                  </div>

                  <div className="pt-4">
                    <ScallopButton variant="cobalt" size="md" onClick={handleReset}>
                      Done, Thank You!
                    </ScallopButton>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Maya Lin"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                        />
                        <User className="w-4 h-4 text-[#0B3FBF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                        />
                        <Phone className="w-4 h-4 text-[#0B3FBF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                      >
                        <option value={1}>1 Person (Coffee solo)</option>
                        <option value={2}>2 People (Pair)</option>
                        <option value={3}>3 People</option>
                        <option value={4}>4 People (Table)</option>
                        <option value={5}>5 People</option>
                        <option value={6}>6 People (Pastry Party)</option>
                        <option value={8}>8+ People (Large Gathering)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1.5">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            time === slot
                              ? 'bg-[#0B3FBF] text-[#E6F55A] font-bold shadow-sm'
                              : 'bg-white text-[#0B3FBF] border border-[#0B3FBF]/20 hover:bg-[#0B3FBF]/5'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Preferred Seating Area
                    </label>
                    <select
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    >
                      <option>Sunlit Window Booth</option>
                      <option>Historic Wooden Counter</option>
                      <option>Outdoor Cobblestone Patio</option>
                      <option>Quiet Bakery Corner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3FBF] mb-1">
                      Special Requests / Occasion (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. High chair needed, celebrating birthday..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3FBF]/20 bg-white text-xs sm:text-sm text-[#0B3FBF] focus:outline-none focus:ring-2 focus:ring-[#0B3FBF]"
                    />
                  </div>

                  <div className="pt-2">
                    <ScallopButton
                      variant="lime"
                      size="md"
                      type="submit"
                      className="w-full"
                    >
                      Confirm Table Booking
                    </ScallopButton>
                  </div>

                  {existingBookings.length > 0 && (
                    <div className="pt-3 text-center">
                      <button
                        type="button"
                        onClick={() => setShowHistory(!showHistory)}
                        className="text-xs text-[#0B3FBF]/70 hover:text-[#0B3FBF] underline cursor-pointer"
                      >
                        {showHistory ? 'Hide My Demo Bookings' : `View My Past Bookings (${existingBookings.length})`}
                      </button>

                      {showHistory && (
                        <div className="mt-3 space-y-2 text-left">
                          {existingBookings.map((b) => (
                            <div
                              key={b.id}
                              className="p-2.5 bg-white rounded-xl border border-[#0B3FBF]/10 text-xs flex justify-between items-center"
                            >
                              <div>
                                <span className="font-bold text-[#0B3FBF]">{b.id}</span>
                                <span className="text-[#0B3FBF]/60 ml-2">
                                  {b.date} @ {b.time} ({b.guests} guests)
                                </span>
                              </div>
                              <span className="text-[10px] bg-[#E6F55A] text-[#0B3FBF] px-2 py-0.5 rounded-md font-bold">
                                Confirmed
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
