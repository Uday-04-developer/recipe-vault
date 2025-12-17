// src/components/ImageTrail.jsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ImageTrail = ({ items = [], variant = 5 }) => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let lastMousePos = { x: 0, y: 0 };
    let mousePos = { x: 0, y: 0 };
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      mousePos = { x: e.clientX, y: e.clientY };
    };

    // Create image trail effect
    const animateImages = () => {
      // Calculate distance moved
      const dx = mousePos.x - lastMousePos.x;
      const dy = mousePos.y - lastMousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only show images when mouse moves significantly
      if (distance > 50) {
        const img = imagesRef.current[currentIndexRef.current];
        
        if (img) {
          // Position image at mouse location
          gsap.set(img, {
            x: mousePos.x,
            y: mousePos.y,
            scale: 0,
            opacity: 1,
          });

          // Animate image appearance and fade
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(img, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.in',
          });

          // Cycle through images
          currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        }

        lastMousePos = { ...mousePos };
      }

      requestAnimationFrame(animateImages);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const rafId = requestAnimationFrame(animateImages);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [items]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {items.map((src, index) => (
        <img
          key={index}
          ref={(el) => (imagesRef.current[index] = el)}
          src={src}
          alt=""
          className="absolute pointer-events-none rounded-xl shadow-2xl"
          style={{
            width: '102px',        // Smaller aesthetic size
            height: '105px',       // 4:3 aspect ratio
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default ImageTrail;
