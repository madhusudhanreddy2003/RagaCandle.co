"use client";
import { ReactLenis } from 'lenis/react';

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.2,
        lerp: 0.1,         // Linear interpolation (0.1 = perfect balance of weight and speed)
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: true    // Keeps mobile performance completely optimized
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;