import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touch screens / mobile)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Central glowing precision point */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-cyan-400 mix-blend-screen transition-transform duration-75 ease-out shadow-[0_0_12px_#38bdf8]"
        style={{
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          transform: `translate3d(${position.x - (isHovering ? 4 : 3)}px, ${position.y - (isHovering ? 4 : 3)}px, 0)`,
        }}
      />
      {/* Subtle outer targeting ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-cyan-400/40 mix-blend-screen transition-all duration-150 ease-out"
        style={{
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          backgroundColor: isHovering ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
          transform: `translate3d(${position.x - (isHovering ? 22 : 14)}px, ${position.y - (isHovering ? 22 : 14)}px, 0)`,
        }}
      />
    </>
  );
}
