"use client";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-5 sm:pt-28 lg:pt-20 bg-[#FCF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-0">
        
        {/* Editorial Text Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <span className="uppercase tracking-[0.3em] text-[9px] sm:text-[10px] text-[#8B927A] font-bold mb-3 sm:mb-4 block">
            Hand-Poured in Small Batches
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.15] lg:leading-[1.1] text-[#2C2C2C] mb-4 sm:mb-6">
            Light Your <br className="hidden sm:inline" />
            <span className="italic font-light">Inner Space</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#4A4A4A] max-w-md mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed font-light">
            Curated scents designed to elevate your mood and define your sanctuary.
          </p>
          <a href="#products" className="inline-block bg-[#2C2C2C] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm uppercase tracking-widest text-[9px] sm:text-[10px] font-bold hover:bg-black transition-all active:scale-95 shadow-sm">
            Explore the Collection
          </a>
        </motion.div>

        {/* Asymmetric Profile Graphic Image Block */}
        <div className="order-1 lg:order-2 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none mx-auto px-2 sm:px-0">
          <div className="relative aspect-[4/5] bg-[#F3EFE9] rounded-t-full overflow-hidden flex items-end justify-center shadow-xs">
            <img 
              src="/images/Hero-Candle.png" 
              alt="Premium Candle" 
              className="w-3/4 h-3/4 sm:w-4/5 sm:h-4/5 object-contain mb-8 sm:mb-10 drop-shadow-2xl hover:scale-102 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;