import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Make sure to register the plugins!
gsap.registerPlugin(ScrollTrigger, useGSAP);

const AnimateOnScroll = ({ 
  children, 
  className = '', 
  from = { opacity: 0, y: 50 }, 
  to = { opacity: 1, y: 0 }, 
  duration = 1.0, 
  start = 'top 90%' // Triggers when 90% from the top hits the viewport
}) => {
  const ref = useRef(null);

  useGSAP(() => {
    // Animate from the 'from' state to the 'to' state
    gsap.fromTo(
      ref.current,
      { ...from }, // The starting state
      {
        ...to,     // The ending state
        duration,
        scrollTrigger: {
          trigger: ref.current,
          start: start,
          once: true, // This makes it only play ONE TIME
        }
      }
    );
  }, { scope: ref, dependencies: [from, to, duration, start] }); // Re-run if props change

  // We start it at opacity 0 to prevent a "flash"
  // of the content before the animation runs.
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;