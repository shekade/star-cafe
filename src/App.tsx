import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BestSellers } from './components/BestSellers';
import { HowToOrder } from './components/HowToOrder';
import { VisitUs } from './components/VisitUs';
import { MarqueeStrip } from './components/MarqueeStrip';
import { Faq } from './components/Faq';
import { Instagram } from './components/Instagram';
import { Footer } from './components/Footer';
import { OrderDrawer, CartItem } from './components/OrderDrawer';
import { ContactModal } from './components/ContactModal';
import { DirectionsModal } from './components/DirectionsModal';
import { MenuModal } from './components/MenuModal';
import { TableBookingModal } from './components/TableBookingModal';
import { SmartRecommendationsModal } from './components/SmartRecommendationsModal';
import { AiAssistant } from './components/AiAssistant';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BakeryItem } from './data/bakeryData';

export default function App() {
  const [cafeName] = useState('Sunday Crumb');

  // Cart / Pastry box state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunday_crumb_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
        },
        quantity: 2,
      },
    ];
  });

  // Sync cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sunday_crumb_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Modal visibility states
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactType, setContactType] = useState('general');
  const [contactTitle, setContactTitle] = useState('Get in Touch');
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [tableBookingOpen, setTableBookingOpen] = useState(false);
  const [recommendationsOpen, setRecommendationsOpen] = useState(false);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (item: BakeryItem) => {
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

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.item.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0B3FBF] selection:bg-[#E6F55A] selection:text-[#0B3FBF] flex flex-col justify-between">
      
      {/* 1. Navbar: Sticky blue navbar */}
      <Navbar
        cafeName={cafeName}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCatering={openCateringModal}
        onOpenTableBooking={() => setTableBookingOpen(true)}
        onOpenRecommendations={() => setRecommendationsOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero: Full-width blue section with halved croissant photo, 3D swooping curve, rotating badge */}
        <Hero
          cafeName={cafeName}
          onExploreMenu={() => setMenuModalOpen(true)}
        />

        {/* 3. About: Warm cream background, 2-line big heading, pretzel doodle, short story */}
        <About
          cafeName={cafeName}
          onOurBakeryClick={() => scrollToSection('visit-us')}
        />

        {/* 4. Best Sellers: Heading + tilted polaroid cards, hover lift, add-to-box */}
        <BestSellers
          onAddToCart={handleAddToCart}
          onExploreFullMenu={() => setMenuModalOpen(true)}
          onOpenRecommendations={() => setRecommendationsOpen(true)}
        />

        {/* 5. How to Order: Full blue section with wavy edges, stacked cards */}
        <HowToOrder
          onBrowseMenu={() => setMenuModalOpen(true)}
          onOpenPreorder={() => setCartOpen(true)}
          onOpenCatering={openCateringModal}
        />

        {/* 6. Visit Us: "Come on in." cream card with hours table, directions, and table booking */}
        <VisitUs
          onGetDirections={() => setDirectionsOpen(true)}
          onBookTable={() => setTableBookingOpen(true)}
        />

        {/* 7. Marquee Strip: Infinite horizontal scrolling bakery doodles */}
        <MarqueeStrip />

        {/* 8. FAQ: Two-column layout with "knead to know" pun and accordion */}
        <Faq
          onGetInTouch={openGeneralContact}
        />

        {/* 9. Instagram: "Follow the crumbs." tilted photo collage over faint line-art */}
        <Instagram />
      </main>

      {/* 10. Footer: Blue background, 4 columns, giant oversized wordmark with overlapping doodles */}
      <Footer
        cafeName={cafeName}
        onOpenCatering={openCateringModal}
        onOpenMenu={() => setMenuModalOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <OrderDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        cafeName={cafeName}
      />

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

      <TableBookingModal
        isOpen={tableBookingOpen}
        onClose={() => setTableBookingOpen(false)}
        cafeName={cafeName}
      />

      <SmartRecommendationsModal
        isOpen={recommendationsOpen}
        onClose={() => setRecommendationsOpen(false)}
        onAddToCart={handleAddToCart}
        cafeName={cafeName}
      />

      {/* 1. Floating AI Cafe Assistant */}
      <AiAssistant
        onAddToCart={handleAddToCart}
        cafeName={cafeName}
      />

      {/* 5. Floating WhatsApp Button */}
      <WhatsAppButton
        cafeName={cafeName}
      />



    </div>
  );
}
