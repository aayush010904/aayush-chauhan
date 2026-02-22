import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PlaybackBar from './PlaybackBar';
import MobileNav from './MobileNav';
import { useRef, useState } from 'react';

export default function AppShell({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const mainRef = useRef(null);

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
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
            className="flex-1 overflow-y-auto scroll-container scrollbar-thin px-3 md:px-6 pb-6 pt-1"
          >
            {children}
          </main>
        </div>
      </div>
      {/* Fixed playback bar at bottom */}
      <PlaybackBar />
    </div>
  );
}
