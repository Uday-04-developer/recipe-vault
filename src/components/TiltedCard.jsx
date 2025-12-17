// src/components/TiltedCard.jsx
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  className = '', // We will pass your "w-[30vw] h-[50vh]" classes here
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- DYNAMIC RANGES (The Fix) ---
  // We use the component's actual size to calculate the rotation
  const rotateX = useTransform(
    y,
    [-dimensions.height / 2, dimensions.height / 2],
    [rotateAmplitude, -rotateAmplitude]
  );
  const rotateY = useTransform(
    x,
    [-dimensions.width / 2, dimensions.width / 2],
    [-rotateAmplitude, rotateAmplitude]
  );
  // ---

  const springRotateX = useSpring(rotateX, springValues);
  const springRotateY = useSpring(rotateY, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  // Get dimensions on mount and resize
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
    rotateFigcaption.set(-offsetY * 0.3);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    x.set(0);
    y.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      // Apply sizing and layout classes to the main figure
      className={`relative perspective-midrange flex flex-col items-center justify-center ${className}`} 
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative transform:3d w-full h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl will-change-transform transform:[translateZ(0)]"


          // Note: The 'rounded-2xl' from your original code is now on the image
        />
        {displayOverlayContent && overlayContent && (
          <motion.div 
            className="absolute top-0 left-0 z-2 will-change-transform w-full h-full"
            style={{ transform: "translateZ(30px)" }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.figcaption
        className="pointer-events-none absolute left-0 top-0 rounded-4px bg-white px-2.5 py-1 text-[10px] text-[#2d2d2d] opacity-0 z-3 hidden sm:block"
        style={{
          x: useTransform(x, val => val + dimensions.width / 2),
          y: useTransform(y, val => val + dimensions.height / 2),
          opacity,
          rotate: rotateFigcaption
        }}
      >
        {captionText}
      </motion.figcaption>
    </figure>
  );
}