import { useCallback, useMemo, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/portfolioData';

const queue = projects.map((p) => ({
  title: p.title,
  artist: `Aayush Chauhan · ${p.tech.slice(0, 2).join(' / ')}`,
  slug: p.slug,
  cover: p.cover,
}));

export default function PlaybackBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);
  const volumeRef = useRef(null);
  const progress = ((currentIndex + 1) / queue.length) * 100;

  const currentTrack = useMemo(() => queue[currentIndex], [currentIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % queue.length);
  }, []);

  const goPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + queue.length) % queue.length);
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(Math.round(x * 100));
  }, []);

  return (
    <footer className="bg-black fixed inset-x-0 bottom-0 z-40 md:static md:z-auto shrink-0">
      {/* ── Mobile Now Playing Bar (Spotify-style mini player) ── */}
      <div className="md:hidden min-h-[4.5rem] pb-[max(env(safe-area-inset-bottom),0.25rem)]">
        {/* Progress line at top */}
        <div className="h-[2px] bg-white/[0.08] relative">
          <motion.div
            className="h-full bg-white"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        {/* Mini player card */}
        <div className="flex items-center gap-3 px-3 py-2">
          {/* Album art */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.slug}
              src={currentTrack.cover}
              alt={currentTrack.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="h-10 w-10 shrink-0 rounded object-cover"
            />
          </AnimatePresence>
          {/* Track info */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/projects/${currentTrack.slug}`}
                  className="text-[13px] font-medium truncate block leading-tight"
                  style={{ minHeight: 'auto' }}
                >
                  {currentTrack.title}
                </Link>
                <p className="text-[11px] text-textMuted truncate leading-tight mt-0.5">{currentTrack.artist}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Controls: just skip-back, play/pause, skip-forward */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={goPrevious}
              className="text-white active:scale-90 transition-transform"
              aria-label="Previous"
              style={{ minHeight: 'auto', minWidth: 'auto' }}
            >
              <SkipBack size={18} fill="currentColor" />
            </button>
            <motion.button
              onClick={() => setIsPlaying((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-white text-black grid place-items-center"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              style={{ minHeight: 'auto', minWidth: 'auto' }}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </motion.button>
            <button
              onClick={goNext}
              className="text-white active:scale-90 transition-transform"
              aria-label="Next"
              style={{ minHeight: 'auto', minWidth: 'auto' }}
            >
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop Playback Bar ── */}
      <div className="hidden md:flex items-center justify-between gap-4 px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Album art + Track info */}
        <div className="flex items-center gap-3 min-w-0 w-56 shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.slug}
              src={currentTrack.cover}
              alt={currentTrack.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-14 w-14 shrink-0 rounded object-cover shadow-card"
            />
          </AnimatePresence>
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/projects/${currentTrack.slug}`} className="text-sm font-medium truncate hover:underline cursor-pointer block">{currentTrack.title}</Link>
                <p className="text-[11px] text-textMuted truncate">{currentTrack.artist}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Center controls */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-lg">
          <div className="flex items-center gap-4">
            <button
              className="p-1 text-textMuted hover:text-white transition-colors duration-150"
              aria-label="Shuffle"
            >
              <Shuffle size={14} />
            </button>
            <button
              onClick={goPrevious}
              className="p-1 text-textMuted hover:text-white hover:scale-110 active:scale-95 transition-all duration-150"
              aria-label="Previous"
            >
              <SkipBack size={15} fill="currentColor" />
            </button>
            <motion.button
              onClick={() => setIsPlaying((prev) => !prev)}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition-transform duration-150 shadow-lg"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isPlaying ? 'pause' : 'play'}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="block"
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <button
              onClick={goNext}
              className="p-1 text-textMuted hover:text-white hover:scale-110 active:scale-95 transition-all duration-150"
              aria-label="Next"
            >
              <SkipForward size={15} fill="currentColor" />
            </button>
            <button
              className="p-1 text-textMuted hover:text-white transition-colors duration-150"
              aria-label="Repeat"
            >
              <Repeat size={14} />
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="w-full flex items-center gap-2 group"
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
          >
            <span className="text-[11px] text-textMuted tabular-nums w-8 text-right">{currentIndex + 1}</span>
            <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden relative cursor-pointer">
              <motion.div
                className={`h-full rounded-full ${isHoveringProgress ? 'bg-accent' : 'bg-white/60'}`}
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              {isHoveringProgress && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md"
                  style={{ left: `${progress}%`, marginLeft: -6 }}
                />
              )}
            </div>
            <span className="text-[11px] text-textMuted tabular-nums w-8">{queue.length}</span>
          </div>
        </div>

        {/* Volume */}
        <div
          className="flex items-center gap-2 w-36 justify-end"
          onMouseEnter={() => setIsHoveringVolume(true)}
          onMouseLeave={() => setIsHoveringVolume(false)}
        >
          <Volume2 size={15} className="text-textMuted shrink-0" />
          <div
            ref={volumeRef}
            className="h-1 w-full rounded-full bg-white/10 overflow-hidden relative cursor-pointer"
            onClick={handleVolumeChange}
          >
            <div
              className={`h-full rounded-full transition-colors duration-150 ${isHoveringVolume ? 'bg-accent' : 'bg-white/60'}`}
              style={{ width: `${volume}%` }}
            />
            {isHoveringVolume && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md"
                style={{ left: `${volume}%`, marginLeft: -6 }}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
