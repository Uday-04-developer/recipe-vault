import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimateOnLoad = ({ 
  children, 
  className = '', 
  from = { opacity: 0, y: 20 }, 
  to = { opacity: 1, y: 0 }, 
  duration = 0.6,
  delay = 0,
  ease = 'power3.out'
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    
    // Create the animation
    const tl = gsap.timeline({
      delay: delay,
      onComplete: () => {
        // Clean up inline styles after animation completes
        if (element) {
          gsap.set(element, { clearProps: "opacity,transform" });
        }
      }
    });

    tl.fromTo(element, 
      { ...from },
      { 
        ...to, 
        duration: duration, 
        ease: ease 
      }
    );

    return () => {
      // Kill animation on unmount
      tl.kill();
    };
  }, [from, to, duration, delay, ease]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default AnimateOnLoad;