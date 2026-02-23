import { Search, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, research, topSuggestions } from '../../data/portfolioData';
import { useSearch } from '../../context/SearchContext';

const titles = {
  '/home': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/research': 'Research',
  '/contact': 'Contact',
  '/other-side': 'Something More',
};

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith('/projects/')) return 'Project Detail';
    if (location.pathname.startsWith('/research/')) return 'Research Detail';
    return titles[location.pathname] || 'Portfolio';
  }, [location.pathname]);

  const globalMatches = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();

    const projectMatches = projects
      .filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.subtitle.toLowerCase().includes(term) ||
          item.tech.some((t) => t.toLowerCase().includes(term)),
      )
      .map((item) => ({
        id: item.id,
        title: item.title,
        category: 'Project',
        to: `/projects/${item.slug}`,
      }));

    const researchMatches = research
      .filter(
        (item) =>
          item.title.toLowerCase().includes(term) || item.domain.some((d) => d.toLowerCase().includes(term)),
      )
      .map((item) => ({
        id: item.id,
        title: item.title,
        category: 'Research',
        to: `/research/${item.slug}`,
      }));

    return [...projectMatches, ...researchMatches].slice(0, 6);
  }, [query]);

  return (
    <header className="sticky top-0 z-20 px-3 md:px-6 pb-1.5 md:pb-2 pt-2 md:pt-3 bg-gradient-to-b from-base via-base/98 to-base/90 backdrop-blur-md">
      <div className="flex flex-col gap-1.5 md:gap-2.5">
        {/* Top row: nav buttons + search (single row on mobile) */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button
              onClick={() => {
                setIsMobileSearchOpen((prev) => !prev);
                setTimeout(() => mobileInputRef.current?.focus(), 0);
              }}
              className="md:hidden p-1.5 rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-150"
              aria-label="Toggle search"
            >
              <Search size={15} />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-150"
              aria-label="Go back"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => navigate(1)}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-150"
              aria-label="Go forward"
            >
              <ArrowRight size={15} />
            </button>
            <motion.h2
              key={pageTitle}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg font-bold tracking-tight hidden md:block ml-1.5"
            >
              {pageTitle}
            </motion.h2>
          </div>

          <div className="relative flex-1 md:max-w-sm md:ml-auto z-30 hidden md:block">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-150 ${
                isSearchFocused ? 'text-white' : 'text-textMuted'
              }`}
              size={15}
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search projects & research"
              className={`w-full rounded-full bg-[#1a1a1a] pl-9 pr-9 py-1.5 md:py-2 text-[13px] md:text-sm transition-all duration-220 ease-out-expo focus:outline-none ${
                isSearchFocused
                  ? 'bg-[#222] ring-1 ring-white/20 shadow-lg shadow-black/20'
                  : 'hover:bg-[#1f1f1f]'
              }`}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}

            <AnimatePresence>
              {query.trim() && isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute mt-2 w-full rounded-lg bg-[#1a1a1a] p-1.5 shadow-panel-lg"
                >
                  {globalMatches.length ? (
                    globalMatches.map((result) => (
                      <Link
                        key={result.id}
                        to={result.to}
                        onClick={() => setQuery('')}
                        className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 transition-colors duration-150 group"
                      >
                        <span className="font-medium text-sm group-hover:text-white transition-colors">{result.title}</span>
                        <span className="text-[11px] text-accent font-medium">{result.category}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-textMuted">No matches found</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden relative z-30"
            >
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-150 ${
                    isSearchFocused ? 'text-white' : 'text-textMuted'
                  }`}
                  size={15}
                />
                <input
                  ref={mobileInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search projects & research"
                  className={`w-full rounded-full bg-[#1a1a1a] pl-9 pr-14 py-1.5 text-[13px] transition-all duration-220 ease-out-expo focus:outline-none ${
                    isSearchFocused
                      ? 'bg-[#222] ring-1 ring-white/20 shadow-lg shadow-black/20'
                      : 'hover:bg-[#1f1f1f]'
                  }`}
                />
                <button
                  onClick={() => {
                    setQuery('');
                    setIsMobileSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <X size={14} />
                </button>
              </div>

              <AnimatePresence>
                {query.trim() && isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute mt-2 w-full rounded-lg bg-[#1a1a1a] p-1.5 shadow-panel-lg"
                  >
                    {globalMatches.length ? (
                      globalMatches.map((result) => (
                        <Link
                          key={result.id}
                          to={result.to}
                          onClick={() => {
                            setQuery('');
                            setIsMobileSearchOpen(false);
                          }}
                          className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/5 transition-colors duration-150 group"
                        >
                          <span className="font-medium text-sm group-hover:text-white transition-colors">{result.title}</span>
                          <span className="text-[11px] text-accent font-medium">{result.category}</span>
                        </Link>
                      ))
                    ) : (
                      <p className="px-3 py-2 text-sm text-textMuted">No matches found</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop chip navigation */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
          {topSuggestions.map((suggestion) => {
            const active = location.pathname === suggestion.to || location.pathname.startsWith(`${suggestion.to}/`);
            const isAccent = suggestion.accent;
            return (
              <Link
                key={suggestion.to}
                to={suggestion.to}
                className="relative whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] font-medium transition-all duration-180"
              >
                {active && (
                  <motion.span
                    layoutId="topbar-chip"
                    className={`absolute inset-0 rounded-full ${isAccent ? 'bg-accent' : 'bg-white'}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={`relative z-10 ${
                  active
                    ? 'text-black'
                    : isAccent
                      ? 'text-accent hover:text-accent'
                      : 'text-slate-200 hover:text-white'
                }`}>
                  {suggestion.label}
                </span>
                {!active && (
                  <span className={`absolute inset-0 rounded-full transition-colors ${
                    isAccent
                      ? 'bg-accent/[0.12] hover:bg-accent/[0.18]'
                      : 'bg-panelSoft hover:bg-panelHover'
                  }`} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
