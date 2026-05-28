"use client";
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import BrandStory from './components/BrandStory';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch product datasets completely linked to the deep options matrix arrays in Sanity
  useEffect(() => {
    async function fetchInventory() {
      const query = `*[_type == "product"]{
        _id,
        name,
        isBespokeStudio,
        accentColor,
        sizeVariants[]{ sizeLabel, price },
        customFragrances[]{ name, priceModifier },
        customColors[]{ name, priceModifier },
        customJarSizes[]{ sizeLabel, priceModifier },
        giftPackingPrice,
        "image": image.asset->url
      }`;
      
      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("FETCH ERROR:", error);
        // Clean matching structural fallback array layout if database errors occur
        setProducts([
          {
            _id: 'fallback-rose',
            name: 'Rose',
            isBespokeStudio: false,
            accentColor: '#E11D48',
            sizeVariants: [
              { sizeLabel: 'Small (Single Wick)', price: 95 },
              { sizeLabel: 'Medium (Decor Jar)', price: 189 },
              { sizeLabel: 'Large (Premium Jar)', price: 299 }
            ],
            image: 'https://via.placeholder.com/400'
          }
        ]);
      }
    }
    fetchInventory();
  }, []);

  // Viewport Intersection Observer for section entry transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll('.premium-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, [products]);

  return (
    <SmoothScroll>
      <main className="bg-[#FCF9F5] min-h-screen selection:bg-[#8B927A] selection:text-white">
        <Navbar />
        <CartDrawer />
        
        {/* Hero sits immediately open at viewport top */}
        <Hero />
        
        {/* 1. Interactive Customizable Products Section */}
        <div id="products" className="premium-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <ProductGrid products={products} />
        </div>

       <BrandStory />
       <Testimonials />

        {/* 4. Lead Gen Contact Form Section */}
        <div id="contact" className="premium-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <Contact />
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}