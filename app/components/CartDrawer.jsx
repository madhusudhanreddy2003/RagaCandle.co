"use client";
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    cartItems, 
    removeFromCart, 
    shippingInfo = { name: '', address: '', pincode: '' }, 
    setShippingInfo 
  } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // BUG 3 CHECK: Validates that all fields are completely filled out
  const isShippingValid = 
    shippingInfo.name?.trim().length > 0 && 
    shippingInfo.address?.trim().length > 0 && 
    shippingInfo.pincode?.trim().length > 0;

  const handleWhatsAppCheckout = () => {
    if (!isShippingValid) return; // Guard clause defense

    // BUG 4 FIX: Format dynamic items with all chosen layout specs cleanly structured
    const itemsList = cartItems.map(item => {
      const optionsText = item.customOptions ? ` (${item.customOptions})` : '';
      return `- ${item.name}${optionsText} [₹${item.price}]`;
    }).join('\n');
    
    // Create the message layout blueprint safely encoded for Web URIs
    const rawMessage = `*New Order from Raga Candle Co.*\n\n` +
                       `*Items:*\n${itemsList}\n\n` +
                       `*Total:* ₹${total}\n\n` +
                       `*Shipping Details:*\n` +
                       `• Name: ${shippingInfo.name.trim()}\n` +
                       `• Address: ${shippingInfo.address.trim()}\n` +
                       `• Pincode: ${shippingInfo.pincode.trim()}`;
    
    const encodedMessage = encodeURIComponent(rawMessage);
    const phoneNumber = "6305313849"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Dark Overlay Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer Side Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#FCF9F5] z-[70] shadow-2xl flex flex-col"
          >
            {/* Header Frame */}
            <div className="p-6 border-b flex justify-between items-center bg-white">
              <div className="flex items-center gap-2 font-serif text-xl">
                <ShoppingBag size={20} />
                <span>Your Bag</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            {/* Shopping Item List Wrapper */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-sans uppercase tracking-widest text-xs">
                  Your bag is empty
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item._id || index} className="flex gap-4 items-start border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-[#2C2C2C] leading-tight font-medium break-words">{item.name}</h3>
                      
                      {/* BUG 1 & BUG 2 FIX: Display customOptions parameters layout safely */}
                      {item.customOptions && (
                        <p className="text-[11px] text-[#6E6E6E] font-sans mt-1 leading-relaxed bg-[#8B927A]/5 p-2 rounded-xs border border-[#8B927A]/10">
                          {item.customOptions}
                        </p>
                      )}
                      
                      <p className="text-[#8B927A] font-sans text-xs font-bold mt-1.5">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500 transition-colors pt-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Shipping Form Enclosure and Subtotals */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t space-y-4 shadow-xl">
                <div className="space-y-2.5">
                  <label className="block text-[9px] uppercase tracking-widest text-[#6E6E6E] font-bold">Shipping Destination Address</label>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 bg-[#FCF9F5] border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs rounded-sm"
                    value={shippingInfo.name || ''}
                    onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Full Delivery Address" 
                    className="w-full p-3 bg-[#FCF9F5] border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs rounded-sm"
                    value={shippingInfo.address || ''}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Pincode (6-digits)" 
                    className="w-full p-3 bg-[#FCF9F5] border border-gray-200/80 focus:border-[#8B927A] outline-none transition-colors text-xs rounded-sm"
                    value={shippingInfo.pincode || ''}
                    onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-baseline font-serif text-xl mb-4">
                    <span>Total Amount</span>
                    <span className="font-sans font-bold text-[#8B927A]">₹{total}</span>
                  </div>

                  {/* BUG 3 FIX: Conditional classes block visual actions unless valid */}
                  <button 
                    disabled={!isShippingValid}
                    onClick={handleWhatsAppCheckout}
                    className={`w-full py-4 rounded-sm flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-[10px] font-bold shadow-md
                      ${isShippingValid 
                        ? 'bg-[#2C2C2C] text-white hover:bg-black active:scale-[0.99]' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                  >
                    {isShippingValid ? 'Checkout via WhatsApp' : 'Fill Shipping details to Order'} 
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;