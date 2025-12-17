// src/components/FreeSplitText.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Register the plugins


const FreeSplitText = ({
  text,
  className = '',
  tag: Tag = 'p',
  delay = 50,
  duration = 1.6,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  splitBy = 'words' // <-- NEW PROP!
}) => {
  const container = useRef(null);

  // 1. Split the text by words or chars
  const parts = splitBy === 'words' ? text.split(' ') : text.split('');

  useGSAP(() => {
  if (!container.current) return;

  gsap.fromTo(
    container.current.querySelectorAll('.split-part'),
    { ...from },
    {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,

      // --- ADD THIS OBJECT BACK ---
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%', // Start when 90% from top hits the viewport

        // This is the magic property!
        toggleActions: "restart none none reset"
      }
      // --- END OF ADDED OBJECT ---
    }
  );
}, { 
  scope: container, 
  dependencies: [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), splitBy] 
});

  return (
    // 2. Render each part in its own span
    <Tag ref={container} className={className}>
      {parts.map((part, index) => (
        <span
          key={index}
          className="split-part" // Add class for targeting
          style={{
            display: 'inline-block',
            opacity: 0
          }}
        >
          {part === ' ' ? '\u00A0' : part}
          {/* Add a space after each word */}
          {splitBy === 'words' ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
};

export default FreeSplitText;