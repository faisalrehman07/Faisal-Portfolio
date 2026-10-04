import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementsHover = () => {
      const interactiveButtons = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveButtons.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });

      const interactiveCards = document.querySelectorAll('.interactive-card, .glass-panel');
      interactiveCards.forEach(el => {
        el.addEventListener('mouseenter', () => setIsCardHovered(true));
        el.addEventListener('mouseleave', () => setIsCardHovered(false));
      });
    };

    window.addEventListener('mousemove', updateMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    handleElementsHover();
    const observer = new MutationObserver(handleElementsHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const activeHover = isHovered || isCardHovered;

  return (
    <>
      {/* Outer Magnetic Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/50 mix-blend-screen"
        animate={{
          x: mousePosition.x - (activeHover ? 26 : 16),
          y: mousePosition.y - (activeHover ? 26 : 16),
          width: activeHover ? 52 : 32,
          height: activeHover ? 52 : 32,
          backgroundColor: isHovered 
            ? 'rgba(6, 182, 212, 0.2)' 
            : isCardHovered 
            ? 'rgba(129, 140, 248, 0.12)' 
            : 'rgba(6, 182, 212, 0.04)',
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.4)',
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 380,
          mass: 0.4,
        }}
      />
      {/* Central Precision Point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]"
        animate={{
          x: mousePosition.x - (isHovered ? 4 : 3),
          y: mousePosition.y - (isHovered ? 4 : 3),
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 850,
        }}
      />
    </>
  );
};
