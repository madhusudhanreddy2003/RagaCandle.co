"use client";
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#FCF9F5] border-t border-gray-200/40 overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Editorial Typography Column */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-center lg:text-left">
          <div className="space-y-3">
            <span className="uppercase tracking-[0.3em] text-[9px] sm:text-[10px] text-[#8B927A] font-bold block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C] leading-[1.2] lg:leading-[1.15]">
              Crafted for the <br />
              <span className="italic font-light">Mindful Sanctuary</span>
            </h2>
          </div>
          
          <div className="w-12 h-[1px] bg-[#8B927A]/60 mx-auto lg:mx-0" />

          <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
            Born out of a desire to create clean, intentional atmosphere, Raga Candle Co. balances modern aesthetics with traditional pouring techniques. Every vessel is formed around sustainability, using pure soy wax and pure essential oils.
          </p>
          
          <p className="text-sm italic text-[#6E6E6E] font-serif leading-relaxed max-w-lg mx-auto lg:mx-0">
            "We do not simply scent a room; we alter its architectural vibration."
          </p>

          <div className="pt-2 flex gap-10 justify-center lg:justify-start text-center">
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">100%</p>
              <p className="uppercase tracking-widest text-[8px] sm:text-[9px] text-[#8B927A] mt-1 font-bold">Soy Wax</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">80 Hr</p>
              <p className="uppercase tracking-widest text-[8px] sm:text-[9px] text-[#8B927A] mt-1 font-bold">Burn Time</p>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive Collage Block */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 sm:gap-6 relative pt-4 pb-12 lg:py-12">
          
          {/* Main Photo Layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="col-span-9 lg:col-span-8 aspect-[3/4] bg-[#F3EFE9] rounded-b-full overflow-hidden shadow-xs z-10 mx-auto lg:mx-0 w-full max-w-[340px] lg:max-w-none"
          >
            <img 
              src="images/candle-craft-2.jpg" 
              alt="Pouring raw candle wax" 
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-[2s]"
            />
          </motion.div>

          {/* Overlapping Text Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="col-span-6 sm:col-span-5 absolute bottom-0 right-0 sm:right-6 lg:right-4 xl:right-12 aspect-square bg-[#8B927A]/15 h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] backdrop-blur-md border border-white/20 shadow-xl p-3 sm:p-4 flex flex-col justify-end z-20 rounded-sm"
          >
            <div className="space-y-1 sm:space-y-2">
              <span className="font-mono text-[8px] sm:text-[10px] text-[#8B927A] tracking-wider block font-bold">MADE WITH PASSION<img src="images/star.png" alt="Passion Icon" className="inline-block w-4 h-4 ml-1" /></span>
              <p className="font-serif text-xs sm:text-sm md:text-base text-[#2C2C2C] leading-tight">Each candle is meticulously crafted to bring warmth and tranquility to your space.</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default BrandStory;