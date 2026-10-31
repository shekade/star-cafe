'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { BestSellers } from '../components/BestSellers';
import { HowToOrder } from '../components/HowToOrder';
import { VisitUs } from '../components/VisitUs';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { Faq } from '../components/Faq';
import { Instagram } from '../components/Instagram';
import { Footer } from '../components/Footer';
import { OrderDrawer } from '../components/OrderDrawer';
import { ContactModal } from '../components/ContactModal';
import { DirectionsModal } from '../components/DirectionsModal';
import { MenuModal } from '../components/MenuModal';
import { TableBookingModal } from '../components/TableBookingModal';
import { SmartRecommendationsModal } from '../components/SmartRecommendationsModal';
import { AiAssistant } from '../components/AiAssistant';
import { WhatsAppButton } from '../components/WhatsAppButton';

export default function Home() {
  const [cafeName, setCafeName] = useState('Sunday Crumb');
  
  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('sunday_crumb_cart');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {
      // ignore
    }
    return [
      {
        item: {
          id: 'classic-croissant',
          name: 'Classic Butter Croissant',
          price: 4.50,
          category: 'pastry',
          badge: 'Our Signature',
          description: '72 laminated folds of cultured Normandy butter. Flakes when you look at it.',
          image: '/src/assets/images/hero_croissant_crumb_1793434738701.jpg',
          dietary: ['Vegetarian', 'Nut-Free'],
          flavor: ['sweet', 'buttery'],
          temperature: ['warm', 'room-temp'],
        },
        quantity: 2,
      },
    ];
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('sunday_crumb_cart', JSON.stringify(cart));
      }
    } catch {
      // ignore
    }
  }, [cart]);

  // Modals state
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactType, setContactType] = useState('general');
  const [contactTitle, setContactTitle] = useState('Get in Touch');
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [tableBookingOpen, setTableBookingOpen] = useState(false);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.item.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => setCart([]);

  const openCateringModal = () => {
    setContactType('catering');
    setContactTitle('Catering & Events Inquiry');
    setContactOpen(true);
  };

  const openGeneralContact = () => {
    setContactType('general');
    setContactTitle('A Few Questions? Knead Help?');
    setContactOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0B3FBF] selection:bg-[#E6F55A] selection:text-[#0B3FBF] flex flex-col justify-between">
      <Navbar
        cafeName={cafeName}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCatering={openCateringModal}
        onOpenTableBooking={() => setTableBookingOpen(true)}
        onOpenRecommendations={() => setRecommendationsOpen(true)}
      />

      <main className="flex-grow">
        <Hero
          cafeName={cafeName}
          onExploreMenu={() => setMenuModalOpen(true)}
        />

        <About
          cafeName={cafeName}
          onOurBakeryClick={() => scrollToSection('visit-us')}
        />

        <BestSellers
          onAddToCart={handleAddToCart}
          onExploreFullMenu={() => setMenuModalOpen(true)}
          onOpenRecommendations={() => setRecommendationsOpen(true)}
        />

        <HowToOrder
          onBrowseMenu={() => setMenuModalOpen(true)}
          onOpenPreorder={() => setCartOpen(true)}
          onOpenCatering={openCateringModal}
        />

        <VisitUs
          onGetDirections={() => setDirectionsOpen(true)}
          onBookTable={() => setTableBookingOpen(true)}
        />

        <MarqueeStrip />

        <Faq
          onGetInTouch={openGeneralContact}
        />

        <Instagram />
      </main>

      <Footer
        cafeName={cafeName}
        onOpenCatering={openCateringModal}
        onOpenMenu={() => setMenuModalOpen(true)}
      />

      {/* Feature 4: Online Ordering Cart Drawer */}
      <OrderDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        cafeName={cafeName}
      />

      {/* Feature 3: Table Booking Modal */}
      <TableBookingModal
        isOpen={tableBookingOpen}
        onClose={() => setTableBookingOpen(false)}
        cafeName={cafeName}
      />

      {/* Feature 2: Smart Food Recommendations Modal */}
      <SmartRecommendationsModal
        isOpen={recommendationsOpen}
        onClose={() => setRecommendationsOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Feature 1: Floating AI Cafe Assistant */}
      <AiAssistant
        onAddToCart={handleAddToCart}
        cafeName={cafeName}
      />

      {/* Feature 5: Floating WhatsApp Contact Widget */}
      <WhatsAppButton
        cafeName={cafeName}
      />

      {/* Existing Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title={contactTitle}
        defaultType={contactType}
        cafeName={cafeName}
      />

      <DirectionsModal
        isOpen={directionsOpen}
        onClose={() => setDirectionsOpen(false)}
      />

      <MenuModal
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenRecommendations={() => setRecommendationsOpen(true)}
        cafeName={cafeName}
      />
    </div>
  );
}
