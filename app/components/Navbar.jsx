"use client";
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { setIsDrawerOpen, cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cartItems.length;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#products' },
    { name: 'Our Story', href: '#story' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FCF9F5]/80 backdrop-blur-md border-b border-gray-200/40 transition-all duration-300 px-4 sm:px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Typography */}
          <div className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-[0.25em] text-[#2C2C2C] select-none">
            RAGA CANDLE CO.
          </div>

          {/* Editorial Navigation Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#4A4A4A]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-black transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </div>

          {/* Interactive Action Menu (Cart & Hamburger Group) */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Shopping Bag Button */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 hover:bg-gray-200/30 rounded-full transition-all duration-300 group focus:outline-none"
              aria-label="Open shopping bag"
            >
              <ShoppingBag 
                size={20} 
                strokeWidth={1.25} 
                className="text-[#2C2C2C] group-hover:scale-105 transition-transform duration-300" 
              />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#8B927A] text-[#FCF9F5] text-[9px] font-sans font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Premium Hamburger Toggle (Mobile & Tablet only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block lg:hidden p-2.5 hover:bg-gray-200/30 rounded-full transition-all duration-300 focus:outline-none z-50"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>

          </div>
        </div>
      </nav>

      {/* Slide-out Mobile/Tablet Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Tint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Right Sliding Nav Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-[280px] sm:w-[320px] bg-[#FCF9F5] z-45 pt-24 px-8 pb-8 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <nav className="flex flex-col gap-5 font-serif text-lg text-[#2C2C2C]">
                {navLinks.map((link, index) => (
                  <motion.a
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#8B927A] transition-colors border-b border-gray-200/40 pb-2 text-base tracking-wide"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-2">
                <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8B927A] font-bold">
                  Hand-Poured in Small Batches
                </p>
                <p className="text-[10px] text-gray-400 font-sans font-light">
                  &copy; {new Date().getFullYear()} Raga Candle Co.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;