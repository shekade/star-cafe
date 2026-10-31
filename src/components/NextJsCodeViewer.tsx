import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, X, Copy, Check, FileCode } from 'lucide-react';

interface NextJsCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NEXTJS_FILES: { [key: string]: { path: string; language: string; content: string } } = {
  'app/page.jsx': {
    path: 'app/page.jsx',
    language: 'javascript',
    content: `'use client';

import React, { useState } from 'react';
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

export default function Home() {
  const [cafeName, setCafeName] = useState('Sunday Crumb');
  const [cart, setCart] = useState([
    {
      item: {
        id: 'classic-croissant',
        name: 'Classic Butter Croissant',
        price: 4.50,
        category: 'pastry',
        badge: 'Our Signature',
        description: '72 laminated folds of cultured Normandy butter. Flakes when you look at it.',
        image: '/assets/images/hero_croissant_crumb.jpg',
      },
      quantity: 2,
    },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactType, setContactType] = useState('general');
  const [contactTitle, setContactTitle] = useState('Get in Touch');
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#0B3FBF] selection:bg-[#E6F55A] selection:text-[#0B3FBF]">
      <Navbar
        cafeName={cafeName}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCatering={() => setContactOpen(true)}
      />
      <main>
        <Hero cafeName={cafeName} onExploreMenu={() => setMenuModalOpen(true)} />
        <About cafeName={cafeName} onOurBakeryClick={() => setDirectionsOpen(true)} />
        <BestSellers onAddToCart={handleAddToCart} onExploreFullMenu={() => setMenuModalOpen(true)} />
        <HowToOrder onBrowseMenu={() => setMenuModalOpen(true)} onOpenPreorder={() => setCartOpen(true)} />
        <VisitUs onGetDirections={() => setDirectionsOpen(true)} />
        <MarqueeStrip />
        <Faq onGetInTouch={() => setContactOpen(true)} />
        <Instagram />
      </main>
      <Footer cafeName={cafeName} onOpenCatering={() => setContactOpen(true)} onOpenMenu={() => setMenuModalOpen(true)} />
      <OrderDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQuantity={handleUpdateQuantity} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} title={contactTitle} />
      <DirectionsModal isOpen={directionsOpen} onClose={() => setDirectionsOpen(false)} />
      <MenuModal isOpen={menuModalOpen} onClose={() => setMenuModalOpen(false)} onAddToCart={handleAddToCart} />
    </div>
  );
}`,
  },
  'app/layout.jsx': {
    path: 'app/layout.jsx',
    language: 'javascript',
    content: `import './globals.css';

export const metadata = {
  title: 'Sunday Crumb Bakery | A little crust, a lot of joy',
  description: 'A playful, bold neighborhood bakery and cafe website with buttery pastries, slow-fermented bread, and joyful morning vibes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Lilita+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FFF8E7] text-[#0B3FBF] selection:bg-[#E6F55A] selection:text-[#0B3FBF] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}`,
  },
  'components/ScallopButton.jsx': {
    path: 'components/ScallopButton.jsx',
    language: 'javascript',
    content: `import React from 'react';

export function ScallopButton({
  variant = 'lime',
  size = 'md',
  href,
  children,
  className = '',
  icon,
  ...props
}) {
  const colorStyles = {
    lime: { fill: '#E6F55A', stroke: '#0B3FBF', text: 'text-[#0B3FBF]' },
    cobalt: { fill: '#0B3FBF', stroke: '#E6F55A', text: 'text-white' },
    cream: { fill: '#FFF8E7', stroke: '#0B3FBF', text: 'text-[#0B3FBF]' },
  }[variant] || { fill: '#E6F55A', stroke: '#0B3FBF', text: 'text-[#0B3FBF]' };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-bold',
    md: 'px-6 py-3 text-sm font-bold',
    lg: 'px-8 py-4 text-base font-bold',
  }[size] || 'px-6 py-3 text-sm font-bold';

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 select-none tracking-tight">
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );

  const buttonClasses = \`group relative inline-flex items-center justify-center font-display uppercase tracking-wide cursor-pointer transition-all duration-200 transform hover:scale-105 hover:-rotate-1 active:scale-95 \${colorStyles.text} \${sizeStyles} \${className}\`;

  const svgBackground = (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm transition-transform duration-200 group-hover:drop-shadow-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 32 4 C 42 -2, 58 -2, 68 4 C 78 -2, 94 -2, 104 4 C 114 -2, 130 -2, 140 4 C 150 -2, 166 -2, 176 6 C 192 12, 198 22, 196 30 C 198 38, 192 48, 176 54 C 166 62, 150 62, 140 56 C 130 62, 114 62, 104 56 C 94 62, 78 62, 68 56 C 58 62, 42 62, 32 56 C 22 62, 6 58, 2 48 C -2 40, -2 20, 2 12 C 6 2, 22 -2, 32 4 Z"
        fill={colorStyles.fill}
        stroke={colorStyles.stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {svgBackground}
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {svgBackground}
      {content}
    </button>
  );
}`,
  },
  'components/ScallopDivider.jsx': {
    path: 'components/ScallopDivider.jsx',
    language: 'javascript',
    content: `import React, { useId } from 'react';

export function ScallopDivider({ color = '#0B3FBF', direction = 'down', className = '' }) {
  const patternId = useId();

  return (
    <div
      className={\`w-full overflow-hidden leading-none block relative z-10 pointer-events-none select-none \${className}\`}
      style={{ height: '24px' }}
      aria-hidden="true"
    >
      <svg className="w-full h-full block" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={patternId} width="40" height="24" patternUnits="userSpaceOnUse">
            {direction === 'down' ? (
              <path d="M 0 0 A 20 24 0 0 0 40 0 Z" fill={color} />
            ) : (
              <path d="M 0 24 A 20 24 0 0 1 40 24 Z" fill={color} />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="24" fill={\`url(#\${patternId})\`} />
      </svg>
    </div>
  );
}`,
  },
};

export function NextJsCodeViewer({ isOpen, onClose }: NextJsCodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState('app/page.jsx');
  const [copied, setCopied] = useState(false);

  const fileData = NEXTJS_FILES[selectedFile] || NEXTJS_FILES['app/page.jsx'];

  const handleCopy = () => {
    navigator.clipboard.writeText(fileData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="relative z-10 w-full max-w-5xl h-[85vh] bg-[#0A1B44] text-white rounded-3xl shadow-2xl border-4 border-[#0B3FBF] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-[#0B3FBF] flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F55A] text-[#0B3FBF] rounded-xl font-bold">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">Next.js (App Router) JavaScript Source</h3>
                  <p className="text-xs text-white/70">Pure JavaScript (.jsx / .js) files — no TypeScript</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* File sidebar */}
              <div className="w-full md:w-60 bg-[#081534] border-r border-white/10 p-3 space-y-1 overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider px-3 py-1 block">
                  Next.js JS Files
                </span>
                {Object.keys(NEXTJS_FILES).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedFile(key)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      selectedFile === key
                        ? 'bg-[#0B3FBF] text-[#E6F55A] font-bold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{key}</span>
                  </button>
                ))}
              </div>

              {/* Code viewer pane */}
              <div className="flex-1 flex flex-col bg-[#050D24] overflow-hidden">
                <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#E6F55A]">{fileData.path}</span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E6F55A] text-[#0B3FBF] font-display text-xs font-bold hover:bg-[#d8e847] transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy File</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="flex-1 p-4 font-mono text-xs text-white/90 overflow-auto whitespace-pre leading-relaxed select-text">
                  <code>{fileData.content}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
