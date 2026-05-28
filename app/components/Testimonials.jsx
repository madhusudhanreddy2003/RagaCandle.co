"use client";
import Script from 'next/script';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 md:py-20 bg-[#FCF9F5] border-t border-gray-200/60 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Typography Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="uppercase tracking-[0.3em] text-[10px] text-[#8B927A] font-bold block">
            Social Proof
          </span>
          <h2 className="font-serif text-4xl text-[#2C2C2C] leading-tight">
            Our Testimonials and Blog Highlights
          </h2>
          <p className="text-sm text-[#6E6E6E] leading-relaxed font-light">
            Explore stories, reviews, and mindful spaces curated by our community directly from Instagram.
          </p>
        </div>

        {/* High-Performance Embed Container */}
        <div className="w-full bg-white border border-gray-200/40 rounded-sm p-4 md:p-8 min-h-[450px] shadow-sm relative">
          
          {/* Your Live EmbedSocial Container */}
          <div 
            className="embedsocial-hashtag" 
            data-ref="1a92660fe44af55c595127355ccf207ae5ff041d" 
            data-dynamicload="yes" 
            data-lazyload="yes"
          >
            {/* Elegant Background Loading Animation Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#FCF9F5]/40 backdrop-blur-sm -z-10 pointer-events-none">
              <div className="w-6 h-6 border-2 border-[#8B927A] border-t-transparent rounded-full animate-spin" />
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#8B927A]">Syncing Instagram Assets...</p>
            </div>
          </div>

          {/* Next.js Optimized Asynchronous Script Engine */}
          <Script 
            id="EmbedSocialHashtagScript"
            src="https://embedsocial.com/cdn/ht.js" 
            strategy="afterInteractive" 
          />
        </div>

      </div>
    </section>
  );
};

export default Testimonials;