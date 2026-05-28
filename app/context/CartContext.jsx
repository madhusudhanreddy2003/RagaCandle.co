"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // State for the WhatsApp Checkout Form
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    pincode: ''
  });

  // Load cart from local storage so it doesn't disappear on refresh
  useEffect(() => {
    const savedCart = localStorage.getItem('raga-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('raga-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Check if item already exists to avoid duplicates, or just add new
    setCartItems((prev) => [...prev, product]);
    setIsDrawerOpen(true); // Automatically slide the cart open
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      isDrawerOpen, 
      setIsDrawerOpen,
      shippingInfo,
      setShippingInfo 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};