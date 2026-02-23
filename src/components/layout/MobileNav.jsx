import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/research', label: 'Research' },
  { to: '/contact', label: 'Contact' },
  { to: '/other-side', label: 'Something More', accent: true },
];

export default function MobileNav() {
  const location = useLocation();
  const pillRefs = useRef({});
  const containerRef = useRef(null);

  const scrollPillIntoView = (pillNode) => {
    if (!pillNode || !containerRef.current) return;

    const container = containerRef.current;
    const gap = 12;
    const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    const currentScroll = container.scrollLeft;

    const pillLeft = pillNode.offsetLeft;
    const pillRight = pillLeft + pillNode.offsetWidth;
    const visibleLeft = currentScroll + gap;
    const visibleRight = currentScroll + container.clientWidth - gap;

    let targetScroll = null;

    if (pillLeft < visibleLeft) {
      targetScroll = pillLeft - gap;
    } else if (pillRight > visibleRight) {
      targetScroll = pillRight - container.clientWidth + gap;
    }

    if (targetScroll === null) {
      return;
    }

    container.scrollTo({
      left: Math.max(0, Math.min(maxScrollLeft, targetScroll)),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const activeItem = navItems.find(
      (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
    );

    if (!activeItem) return;

    const frameId = window.requestAnimationFrame(() => {
      scrollPillIntoView(pillRefs.current[activeItem.to]);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname]);

  return (
    <nav className="md:hidden px-3 py-1.5" style={{ minHeight: 'auto' }}>
      <div ref={containerRef} className="flex gap-2 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
          const isAccent = item.accent;

          const activeBg = isAccent ? 'bg-accent' : 'bg-white';
          const activeText = 'text-black font-semibold';
          const inactiveBg = isAccent ? 'bg-accent/10' : 'bg-[#2a2a2a]';
          const inactiveText = isAccent ? 'text-accent' : 'text-[#b3b3b3]';

          return (
            <NavLink
              key={item.to}
              to={item.to}
              ref={(node) => {
                if (node) {
                  pillRefs.current[item.to] = node;
                }
              }}
              onClick={(event) => {
                scrollPillIntoView(event.currentTarget);
              }}
              className="relative shrink-0"
              style={{ minHeight: 'auto', minWidth: 'auto' }}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-chip"
                  className={`absolute inset-0 rounded-full ${activeBg}`}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {!isActive && (
                <span className={`absolute inset-0 rounded-full ${inactiveBg}`} />
              )}
              <span
                className={`relative z-10 block px-3.5 py-[6px] text-[12px] leading-none font-medium whitespace-nowrap ${
                  isActive ? activeText : inactiveText
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}