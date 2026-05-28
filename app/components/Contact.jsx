"use client";
import { useState } from 'react';
import { ArrowRight, AlertCircle, MapPin, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errorMessage) setErrorMessage('');
  };

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.businessName) {
      setErrorMessage('Please fill in all mandatory details to submit your inquiry.');
      return;
    }

    const introduction = `*B2B Bulk Order Inquiry | Raga Candle Co.*%0A%0A`;
    const details = 
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Contact Number:* ${formData.phone}%0A` +
      `*Business/Establishment Name:* ${formData.businessName}%0A%0A`;
    
    const notes = formData.message 
      ? `*Enquiry Notes:*%0A${formData.message}` 
      : `*Enquiry Notes:* Requesting catalog and bulk pricing tier details.`;

    const fullMessage = introduction + details + notes;
    const whatsappNumber = "916305313849"; 
    
    window.open(`https://wa.me/${whatsappNumber}?text=${fullMessage}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#FCF9F5] border-t border-gray-200/60 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
        

        {/* Right Side: Lead Generation Inquiry Form Frame (Spans 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <div className="space-y-3">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#8B927A] font-bold block">
              Corporate & Bespoke Gifting
            </span>
            <h2 className="font-serif text-4xl text-[#2C2C2C] leading-tight">
              Bulk Orders & Custom Partnerships
            </h2>
            <p className="text-sm text-[#6E6E6E] max-w-xl leading-relaxed">
              Elevate your establishment's sensory environment. We design custom aromatic profiles and tailored wholesale pricing tiers for luxury **Hotels**, boutique **Restaurants**, **Community Houses**, and high-profile events. Submit your credentials below to request our custom B2B catalog.
            </p>
          </div>

          <form onSubmit={handleWhatsAppInquiry} className="space-y-4">
            
            {/* Error Message Box */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200/60 text-red-700 text-xs flex items-center gap-2 rounded-sm font-sans"
              >
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs font-sans rounded-sm text-[#2C2C2C]"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs font-sans rounded-sm text-[#2C2C2C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="tel" 
                name="phone"
                placeholder="Contact Number *"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs font-sans rounded-sm text-[#2C2C2C]"
              />
              <input 
                type="text" 
                name="businessName"
                placeholder="Business / Establishment Name *"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs font-sans rounded-sm text-[#2C2C2C]"
              />
            </div>

            <textarea 
              name="message"
              rows="4"
              placeholder="Tell us about your volume requirements or custom packaging preferences... (Optional)"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-4 bg-white border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs font-sans rounded-sm resize-none text-[#2C2C2C]"
            />

            <button 
              type="submit"
              className="mt-2 bg-[#2C2C2C] text-white px-8 py-4.5 rounded-sm flex items-center justify-center gap-3 hover:bg-black transition-all uppercase tracking-widest text-[10px] font-bold shadow-md w-full md:w-auto"
            >
              Send Enquiry <ArrowRight size={14} />
            </button>
          </form>
        </div>

                {/* Left Side: Full-Bleed Structural Company Logo Container (Replaces Map Embed Area) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#F3EFE9] border border-gray-200/50 rounded-sm p-8 md:p-12 relative overflow-hidden min-h-[450px] lg:min-h-full">
          
          {/* Subtle Background Architectural Line Graphic for Premium Texture */}
          <div className="absolute right-0 bottom-0 w-72 h-72 border-r border-b border-[#2C2C2C]/5 rounded-br-full pointer-events-none" />

          {/* Centered Massive Logo Frame — Built exactly like an elegant Map Showcase */}
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-[#FCF9F5] shadow-sm rounded-full flex items-center justify-center p-6 border border-gray-200/30 transition-transform duration-700 hover:scale-105">
              <img 
                src="/images/logo.jpg"  // Target path: public/images/logo.png
                alt="Raga Candle Co. Official Logo" 
                className="w-full h-full object-contain filter grayscale"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span class="font-serif text-4xl font-bold tracking-[0.2em] text-[#2C2C2C]/20">RAGA</span>';
                }}
              />
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#8B927A] font-bold mt-6">
              EST. 2026 / OFFICIAL BRAND
            </p>
          </div>

          {/* Baseline Company Info Blocks — Replaces Map Text/Coordinates */}
          <div className="border-t border-[#2C2C2C]/10 pt-8 space-y-3 font-sans text-xs text-[#6E6E6E]">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#8B927A] shrink-0" />
              <span>Bengaluru, Karnataka</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[#8B927A] shrink-0" />
              <span className="hover:text-black transition-colors">+91 (0) 6305313849</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-[#8B927A] shrink-0" />
              <span className="hover:text-black transition-colors">ragacandles@gmail.com</span>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Contact;