import React, { useState } from 'react';
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
import { BakeryItem } from './data/bakeryData';

export default function App() {
  // Brand name state (defaults to Sunday Crumb; customizable)
  const [cafeName, setCafeName] = useState('Sunday Crumb');
  const [isEditingName, setIsEditingName] = useState(false);

  // Cart / Pastry box state
  const [cart, setCart] = useState<CartItem[]>([
    // Start with 1 complimentary fresh croissant so drawer is immediately enjoyable
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
  ]);

  // Modal visibility states
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactType, setContactType] = useState('general');
  const [contactTitle, setContactTitle] = useState('Get in Touch');
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

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
        />

        {/* 5. How to Order: Full blue section with wavy edges, stacked cards */}
        <HowToOrder
          onBrowseMenu={() => setMenuModalOpen(true)}
          onOpenPreorder={() => setCartOpen(true)}
          onOpenCatering={openCateringModal}
        />

        {/* 6. Visit Us: "Come on in." cream card with hours table and directions */}
        <VisitUs
          onGetDirections={() => setDirectionsOpen(true)}
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
        cafeName={cafeName}
      />

      {/* Subtle Bottom Floating Cafe Name Customizer tool */}
      <div className="fixed bottom-4 left-4 z-40">
        {isEditingName ? (
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border-2 border-[#0B3FBF] flex items-center gap-2">
            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="Enter Cafe Name"
              className="px-2.5 py-1 text-xs font-display font-bold text-[#0B3FBF] border border-[#0B3FBF]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B3FBF]"
              autoFocus
            />
            <button
              onClick={() => setIsEditingName(false)}
              className="px-2.5 py-1 bg-[#E6F55A] text-[#0B3FBF] rounded-lg text-xs font-display font-bold cursor-pointer hover:bg-[#d8e847]"
            >
              Done
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            title="Customise Cafe Name"
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8E7] text-[#0B3FBF] hover:bg-[#E6F55A] rounded-full border-2 border-[#0B3FBF] shadow-lg text-xs font-display transition-all duration-200 cursor-pointer"
          >
            <span className="opacity-80">Cafe:</span>
            <span className="font-bold underline decoration-dotted">{cafeName}</span>
            <span className="text-[10px] opacity-60 group-hover:opacity-100">✏️</span>
          </button>
        )}
      </div>

    </div>
  );
}
