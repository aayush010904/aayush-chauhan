import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PlaybackBar from './PlaybackBar';
import MobileNav from './MobileNav';
import { useCallback, useRef, useState } from 'react';

export default function AppShell({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const mainRef = useRef(null);
  const pullStateRef = useRef({
    isArmed: false,
    startY: 0,
    deltaY: 0,
  });

  const handleTouchStart = useCallback((event) => {
    if (window.innerWidth >= 768 || !mainRef.current) return;

    const isAtTop = mainRef.current.scrollTop <= 0;
    pullStateRef.current.isArmed = isAtTop;
    pullStateRef.current.startY = event.touches[0]?.clientY ?? 0;
    pullStateRef.current.deltaY = 0;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (!pullStateRef.current.isArmed) return;

    const currentY = event.touches[0]?.clientY ?? 0;
    pullStateRef.current.deltaY = Math.max(0, currentY - pullStateRef.current.startY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!pullStateRef.current.isArmed) return;

    if (pullStateRef.current.deltaY > 96) {
      window.location.reload();
    }

    pullStateRef.current.isArmed = false;
    pullStateRef.current.startY = 0;
    pullStateRef.current.deltaY = 0;
  }, []);

  return (
    <div className="h-[100dvh] bg-black text-white flex flex-col overflow-hidden">
      {/* Main content area (sidebar + content) */}
      <div className="flex flex-1 min-h-0 p-1.5 md:p-2 gap-1.5 md:gap-2">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((previous) => !previous)}
        />
        <div className="flex-1 min-w-0 flex flex-col bg-base rounded-lg overflow-hidden shadow-inner-soft">
          <Topbar />
          <MobileNav />
          <main
            ref={mainRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex-1 overflow-y-auto scroll-container scrollbar-thin px-3 md:px-6 pb-[calc(8.5rem+env(safe-area-inset-bottom))] md:pb-6 pt-1"
          >
            {children}
          </main>
        </div>
      </div>
      <div className="md:hidden h-[calc(4.5rem+env(safe-area-inset-bottom))] shrink-0" aria-hidden="true" />
      {/* Fixed playback bar at bottom */}
      <PlaybackBar />
    </div>
  );
}
