import { Link, NavLink } from 'react-router-dom';
import { House, User, FolderKanban, FlaskConical, Mail, Music, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { getPinnedLibrary } from '../../data/portfolioData';

const navItems = [
  { to: '/home', label: 'Home', icon: House },
  { to: '/about', label: 'About', icon: User },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/research', label: 'Research', icon: FlaskConical },
  { to: '/contact', label: 'Contact', icon: Mail },
  { to: '/other-side', label: 'Something More', icon: Music, accent: true },
];

function ProfileAvatar({ size = 'md' }) {
  const dim = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-9 w-9 text-sm';
  return (
    <div className={`${dim} rounded-full bg-accent grid place-items-center shrink-0`}>
      <span className="font-bold text-black leading-none">AC</span>
    </div>
  );
}

export default function Sidebar({ isCollapsed = false, onToggle }) {
  // Random 4 pinned items — stable for the session, reshuffled on next page load
  const pinnedLibrary = useMemo(() => getPinnedLibrary(), []);
  return (
    <motion.aside
      className="hidden md:flex shrink-0 sticky top-0 h-full"
      animate={{ width: isCollapsed ? 72 : 300 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="h-full w-full flex flex-col gap-2">
        {/* Navigation Panel */}
        <div className="glass-panel rounded-lg p-3">
          {/* Header: Avatar + Name */}
          <div className={`mb-3 flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
            <ProfileAvatar size={isCollapsed ? 'sm' : 'md'} />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-0 flex-1"
                >
                  <h1 className="text-sm font-bold tracking-tight leading-tight">Aayush Chauhan</h1>
                  <p className="text-[11px] text-textMuted leading-tight">Portfolio</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="space-y-0.5">
            {navItems.map(({ to, label, icon: Icon, accent }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} rounded-md px-3 py-2 transition-all duration-220 ease-out-expo ${
                    isActive
                      ? 'text-white'
                      : accent
                        ? 'text-accent hover:text-accent hover:bg-accent/[0.08]'
                        : 'text-textMuted hover:text-white hover:bg-white/[0.04]'
                  }`
                }
                title={label}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className={`absolute inset-0 rounded-md ${accent ? 'bg-accent/[0.12]' : 'bg-white/[0.07]'}`}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      <Icon size={18} className={isActive ? (accent ? 'text-accent' : 'text-white') : accent ? 'text-accent' : 'group-hover:text-white'} />
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            key="label"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.15 }}
                            className={`font-medium text-sm whitespace-nowrap overflow-hidden ${isActive ? (accent ? 'text-accent' : 'text-white') : ''}`}
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Library Panel */}
        <div className="glass-panel rounded-lg p-3 flex-1 min-h-0 flex flex-col">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="full-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col flex-1 min-h-0"
              >
                <div className="flex items-center justify-between px-1 mb-3">
                  <p className="text-sm font-semibold text-slate-200">Your Library</p>
                  <span className="text-[11px] text-textMuted uppercase tracking-wide">Pinned</span>
                </div>

                <div className="space-y-0.5 overflow-y-auto scroll-container scrollbar-thin pr-1 flex-1">
                  {pinnedLibrary.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <Link
                        to={item.to}
                        className="flex items-center gap-2.5 rounded-md p-2 hover:bg-white/[0.04] transition-all duration-220 ease-out-expo group"
                      >
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="h-10 w-10 rounded object-cover group-hover:shadow-card-hover transition-shadow duration-220"
                        />
                        <div className="min-w-0">
                          <p className="text-sm text-slate-100 line-clamp-1 group-hover:text-white transition-colors">{item.title}</p>
                          <p className="text-[11px] text-textMuted line-clamp-1">{item.subtitle}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 rounded-md bg-white/[0.03] p-3 text-sm text-textMuted">
                  <p className="text-white font-medium text-xs uppercase tracking-wide mb-1">Now Building</p>
                  <p className="text-[13px] leading-relaxed">Scalable AI Systems for the future.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 gap-1.5 overflow-y-auto scroll-container scrollbar-thin"
              >
                {pinnedLibrary.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    title={item.title}
                    className="rounded-md overflow-hidden hover:ring-1 hover:ring-white/10 transition-all duration-220 ease-out-expo"
                  >
                    <img src={item.cover} alt={item.title} className="h-12 w-full rounded-md object-cover" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle — pinned to bottom */}
        <button
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`glass-panel rounded-lg flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5 px-3'} py-2.5 text-textMuted hover:text-white hover:bg-white/[0.04] transition-all duration-220 ease-out-expo shrink-0`}
        >
          {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                key="collapse-label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-medium whitespace-nowrap overflow-hidden"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
