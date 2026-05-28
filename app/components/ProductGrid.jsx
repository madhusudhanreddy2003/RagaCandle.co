"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sparkles, Check, Gift, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = ({ products = [] }) => {
  const { addToCart } = useCart();
  const [successProductId, setSuccessProductId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); 

  const standardFragrances = products.filter(p => !p.isBespokeStudio);
  const bespokeStudioDoc = products.find(p => p.isBespokeStudio);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [customFragrance, setCustomFragrance] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [customSize, setCustomSize] = useState('');
  const [isGiftPacked, setIsGiftPacked] = useState(false);

  useEffect(() => {
    if (standardFragrances.length > 0 && Object.keys(selectedSizes).length === 0) {
      const initialMap = {};
      standardFragrances.forEach(p => {
        if (p.sizeVariants?.length > 0) initialMap[p._id] = p.sizeVariants[0].sizeLabel;
      });
      setSelectedSizes(initialMap);
    }
    
    if (bespokeStudioDoc) {
      if (!customFragrance) setCustomFragrance(bespokeStudioDoc.customFragrances?.[0]?.name || '');
      if (!customColor) setCustomColor(bespokeStudioDoc.customColors?.[0]?.name || '');
      if (!customSize) setCustomSize(bespokeStudioDoc.customJarSizes?.[0]?.sizeLabel || '');
    }
  }, [products, bespokeStudioDoc]);

  const calculateCustomPrice = () => {
    if (!bespokeStudioDoc) return 0;
    const basePrice = bespokeStudioDoc.basePrice || 0;
    const fPrice = bespokeStudioDoc.customFragrances?.find(f => f.name === customFragrance)?.priceModifier || 0;
    const cPrice = bespokeStudioDoc.customColors?.find(c => c.name === customColor)?.priceModifier || 0;
    const sPrice = bespokeStudioDoc.customJarSizes?.find(s => s.sizeLabel === customSize)?.priceModifier || 0;
    const gPrice = isGiftPacked ? (bespokeStudioDoc.giftPackingPrice || 0) : 0;
    return Number(basePrice) + Number(fPrice) + Number(cPrice) + Number(sPrice) + Number(gPrice);
  };

  const triggerSuccess = (id) => {
    setSuccessProductId(id);
    setTimeout(() => setSuccessProductId(null), 1800);
  };

  const handleAddStandardCandle = (product) => {
    const chosenSizeLabel = selectedSizes[product._id] || product.sizeVariants?.[0]?.sizeLabel;
    if (!chosenSizeLabel) return;
    
    const variantDetails = product.sizeVariants?.find(v => v.sizeLabel === chosenSizeLabel);

    addToCart({
      _id: `${product._id}-${chosenSizeLabel.replace(/\s+/g, '-').toLowerCase()}`,
      name: `${product.name} Scented Candle`,
      price: variantDetails?.price || 0,
      customOptions: `Size: ${chosenSizeLabel}`, 
      image: product.image
    });
    triggerSuccess(product._id);
  };

  const handleAddCustomCandle = () => {
    if (!bespokeStudioDoc) return;
    const computedPrice = calculateCustomPrice();

    addToCart({
      _id: `bespoke-custom-${Date.now()}`,
      name: `Customized Candle`,
      price: computedPrice,
      customOptions: `Scent: ${customFragrance} | Color: ${customColor} | Jar: ${customSize}${isGiftPacked ? ' | Premium Gift Wrap' : ''}`,
      image: bespokeStudioDoc.image
    });
    triggerSuccess('bespoke-studio');
  };

  return (
    <section id="products" className="py-20 sm:py-24 bg-[#FCF9F5] px-4 sm:px-6 md:px-10 lg:px-12 overflow-visible">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 max-w-xl mx-auto px-4"
        >
          <span className="uppercase tracking-[0.3em] text-[9px] sm:text-[10px] text-[#8B927A] font-bold block">Signature Collection</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2C2C2C] leading-tight">Select Your Atmosphere</h2>
          <p className="text-[11px] sm:text-xs text-[#6E6E6E] font-light tracking-wide leading-relaxed">Simple Ingredients &bull; Beautiful Fragrances &bull; Made with Love</p>
        </motion.div>

        {/* ADAPTIVE BREAKPOINT MATRIX GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-start overflow-visible">
          
          {standardFragrances.map((product) => {
            const currentSizeLabel = selectedSizes[product._id];
            const activePrice = product.sizeVariants?.find(v => v.sizeLabel === currentSizeLabel)?.price || 0;
            const isDropdownOpen = activeDropdown === product._id;

            return (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200/60 rounded-sm p-4 sm:p-5 space-y-4 shadow-xs relative overflow-visible"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: product.accentColor || '#8B927A' }} />
                    <h3 className="font-serif text-sm sm:text-base font-medium text-[#2C2C2C] truncate">{product.name}</h3>
                  </div>
                  <span className="font-sans text-xs font-bold text-[#8B927A] bg-[#8B927A]/5 px-2 py-1 rounded-xs shrink-0">₹{activePrice}</span>
                </div>

                <div className="aspect-[4/3] w-full bg-gray-50 overflow-hidden rounded-xs relative group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                {/* PREMIUM STYLE DROPDOWN - STANDARD */}
                <div className="space-y-1.5 relative z-10">
                  <label className="block text-[9px] uppercase tracking-widest text-[#6E6E6E] font-bold">Select Variant Jar Size</label>
                  <button
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : product._id)}
                    className="w-full p-3 bg-[#FCF9F5] border border-gray-200/80 text-left text-xs font-sans text-[#2C2C2C] rounded-sm flex justify-between items-center transition-all hover:bg-[#F3EFE9] focus:border-[#8B927A]"
                  >
                    <span className="tracking-wide font-medium truncate">{currentSizeLabel || 'Choose Sizing...'}</span>
                    <ChevronDown size={14} className={`text-[#8B927A] transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                        <motion.ul 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 w-full mt-1.5 bg-white border border-gray-200/80 shadow-xl rounded-sm z-50 max-h-48 overflow-y-auto font-sans text-xs divide-y divide-gray-50 backdrop-blur-md"
                        >
                          {product.sizeVariants?.map((v, idx) => (
                            <li 
                              key={idx}
                              onClick={() => {
                                setSelectedSizes({ ...selectedSizes, [product._id]: v.sizeLabel });
                                setActiveDropdown(null);
                              }}
                              className="p-3 hover:bg-[#FCF9F5] cursor-pointer transition-colors flex justify-between items-center text-[#2C2C2C] hover:text-black font-medium"
                            >
                              <span>{v.sizeLabel}</span>
                              <span className="font-bold text-[#8B927A]">₹{v.price}</span>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => handleAddStandardCandle(product)}
                  className="w-full py-3 bg-[#2C2C2C] hover:bg-black text-white text-[9px] uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  {successProductId === product._id ? <><Check size={12} className="text-[#8B927A]" /> Added to Bag</> : <><ShoppingBag size={12} /> Add to Bag</>}
                </button>
              </motion.div>
            );
          })}

          {/* BESPOKE STUDIO CUSTOM MODULE */}
          {bespokeStudioDoc && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F3EFE9] border border-[#8B927A]/30 rounded-sm p-4 sm:p-6 md:p-8 space-y-6 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative items-center overflow-visible shadow-xs mt-4"
            >
              <div className="absolute top-0 right-0 bg-[#8B927A] text-white font-sans text-[8px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-bl-sm flex items-center gap-1 shadow-sm z-20"><Sparkles size={10} /> Specially By RAGA</div>
              
              <div className="lg:col-span-5 space-y-4 pt-4 lg:pt-0">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2C2C]">{bespokeStudioDoc.name}</h3>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#8B927A] font-bold mt-0.5">Your idea. Your candle.</p>
                </div>
                <div className="aspect-[16/10] lg:aspect-[4/3] w-full bg-white/40 overflow-hidden rounded-xs border border-white/30 shadow-xs">
                  <img src={bespokeStudioDoc.image} alt="Bespoke Studio" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Form Block Area */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-visible relative">
                
                {/* PREFERENCES DROPDOWN 1 */}
                <div className="space-y-1.5 relative z-30">
                  <label className="block text-[9px] uppercase tracking-widest text-[#6E6E6E] font-bold">1. Select Custom Fragrance</label>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'custom-fragrance' ? null : 'custom-fragrance')}
                    className="w-full p-3 bg-white border border-gray-200 text-left text-xs font-sans text-[#2C2C2C] rounded-sm flex justify-between items-center h-[42px] hover:bg-[#FCF9F5] transition-all"
                  >
                    <span className="font-medium truncate">{customFragrance || 'Choose Fragrance...'}</span>
                    <ChevronDown size={14} className="text-[#8B927A] shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'custom-fragrance' && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                        <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm z-40 max-h-40 overflow-y-auto font-sans text-xs divide-y divide-gray-50">
                          {bespokeStudioDoc.customFragrances?.map((f, idx) => (
                            <li key={idx} onClick={() => { setCustomFragrance(f.name); setActiveDropdown(null); }} className="p-3 hover:bg-[#FCF9F5] cursor-pointer transition-colors flex justify-between items-center font-medium">
                              <span>{f.name} Essence</span>
                              <span className="text-[#8B927A] font-bold">+₹{f.priceModifier}</span>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* PREFERENCES DROPDOWN 2 */}
                <div className="space-y-1.5 relative z-20">
                  <label className="block text-[9px] uppercase tracking-widest text-[#6E6E6E] font-bold">2. Select Wax Color Finish</label>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'custom-color' ? null : 'custom-color')}
                    className="w-full p-3 bg-white border border-gray-200 text-left text-xs font-sans text-[#2C2C2C] rounded-sm flex justify-between items-center h-[42px] hover:bg-[#FCF9F5] transition-all"
                  >
                    <span className="font-medium truncate">{customColor || 'Choose Color...'}</span>
                    <ChevronDown size={14} className="text-[#8B927A] shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'custom-color' && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                        <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm z-40 max-h-40 overflow-y-auto font-sans text-xs divide-y divide-gray-50">
                          {bespokeStudioDoc.customColors?.map((c, idx) => (
                            <li key={idx} onClick={() => { setCustomColor(c.name); setActiveDropdown(null); }} className="p-3 hover:bg-[#FCF9F5] cursor-pointer transition-colors flex justify-between items-center font-medium">
                              <span>{c.name} Matte</span>
                              <span className="text-[#8B927A] font-bold">+₹{c.priceModifier}</span>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* PREFERENCES DROPDOWN 3 */}
                <div className="space-y-1.5 relative z-10">
                  <label className="block text-[9px] uppercase tracking-widest text-[#6E6E6E] font-bold">3. Select Jar Dimensions</label>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'custom-size' ? null : 'custom-size')}
                    className="w-full p-3 bg-white border border-gray-200 text-left text-xs font-sans text-[#2C2C2C] rounded-sm flex justify-between items-center h-[42px] hover:bg-[#FCF9F5] transition-all"
                  >
                    <span className="font-medium truncate">{customSize || 'Choose Jar Style...'}</span>
                    <ChevronDown size={14} className="text-[#8B927A] shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'custom-size' && (
                      <>
                        <div className="fixed inset-0 z-5" onClick={() => setActiveDropdown(null)} />
                        <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm z-40 max-h-40 overflow-y-auto font-sans text-xs divide-y divide-gray-50">
                          {bespokeStudioDoc.customJarSizes?.map((s, idx) => (
                            <li key={idx} onClick={() => { setCustomSize(s.sizeLabel); setActiveDropdown(null); }} className="p-3 hover:bg-[#FCF9F5] cursor-pointer transition-colors flex justify-between items-center font-medium">
                              <span>{s.sizeLabel} Style</span>
                              <span className="text-[#8B927A] font-bold">+₹{s.priceModifier}</span>
                            </li>
                          ))}
                        </motion.ul>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* GIFT BOX UPGRADE */}
                <div className="sm:pt-5.5">
                  <label className="flex items-center gap-3 bg-white/70 p-2.5 rounded-sm border border-dashed border-[#8B927A]/40 cursor-pointer select-none hover:bg-white transition-colors h-[42px]">
                    <input type="checkbox" checked={isGiftPacked} onChange={(e) => setIsGiftPacked(e.target.checked)} className="w-4 h-4 accent-[#8B927A]" />
                    <div className="font-sans text-[11px] font-bold text-[#2C2C2C] flex items-center gap-1 truncate">
                      <Gift size={12} className="text-[#8B927A] shrink-0" /> Premium Gift Wrap (+₹{bespokeStudioDoc.giftPackingPrice || 0})
                    </div>
                  </label>
                </div>

                {/* Pricing Summary Row footer */}
                <div className="sm:col-span-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-3 bg-white/40 p-4 border border-white/20 rounded-sm">
                  <div className="font-sans text-xs font-bold text-[#4A4A4A] flex justify-between sm:justify-start items-center gap-2">
                    <span>Configured Total:</span> 
                    <span className="text-base text-black font-black">₹{calculateCustomPrice()}</span>
                  </div>
                  <button
                    onClick={handleAddCustomCandle}
                    className="py-3 px-5 bg-[#8B927A] hover:bg-[#7A8169] text-white text-[9px] uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                  >
                    {successProductId === 'bespoke-studio' ? <><Check size={12} /> Creation Added</> : <><Sparkles size={11} /> Add Custom Creation</>}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductGrid;