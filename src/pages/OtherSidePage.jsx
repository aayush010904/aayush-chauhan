import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Headphones, Radio } from 'lucide-react';
import MusicEmbed from '../components/shared/MusicEmbed';
import { tracks } from '../data/portfolioData';

/* ── Loading Screen ────────────────────────── */
function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0); // 0 → bars, 1 → text, 2 → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const bars = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9];

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-base rounded-lg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Equalizer bars */}
      <div className="flex items-end gap-1 h-10 mb-6">
        {bars.map((maxScale, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-accent"
            initial={{ height: 4 }}
            animate={{
              height: phase < 2 ? [4, maxScale * 40, 4] : 0,
            }}
            transition={{
              repeat: phase < 2 ? Infinity : 0,
              duration: 0.6 + i * 0.08,
              ease: 'easeInOut',
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {phase >= 1 && phase < 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <p className="text-accent text-sm font-medium tracking-wide">Discovering</p>
            <p className="text-white text-lg font-bold mt-1">the other side of Aayush</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Page ──────────────────────────────── */
export default function OtherSidePage() {
  const [showLoading, setShowLoading] = useState(true);

  return (
      <div className="relative min-h-[60vh]">
      <AnimatePresence>
        {showLoading && <LoadingScreen onDone={() => setShowLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="pb-8"
          >
            {/* Hero header — gradient banner like Spotify artist page */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/25 via-accent/8 to-transparent" />
              <div className="relative px-6 md:px-10 pt-12 pb-10">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="h-6 w-6 rounded-full bg-accent grid place-items-center">
                    <Music size={12} className="text-black" />
                  </div>
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">Something More</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
                >
                  Beyond the<br />
                  <span className="text-accent">Code</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-slate-300 mt-4 max-w-2xl text-[15px] leading-relaxed"
                >
                  Outside engineering and research, I find creative expression through music.
                  Rhythm, structure, and emotional tone aren't just artistic tools—they shape
                  how I think about product design and user experience.
                </motion.p>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-6 mt-6"
                >
                  <div className="flex items-center gap-2 text-textMuted">
                    <Headphones size={14} className="text-accent" />
                    <span className="text-[13px]">{tracks.length} tracks</span>
                  </div>
                  <div className="flex items-center gap-2 text-textMuted">
                    <Radio size={14} className="text-accent" />
                    <span className="text-[13px]">Ambient · Lo-Fi · Synth</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Tracks section */}
            <div className="px-1">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-4"
              >
                <h2 className="text-xl font-bold tracking-tight">Featured Tracks</h2>
                <p className="text-textMuted text-sm mt-0.5">Press play and vibe</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-3">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div className="mb-2">
                      <h3 className="text-sm font-semibold text-white">{track.title}</h3>
                      <p className="text-xs text-textMuted leading-relaxed">{track.description}</p>
                    </div>
                    <MusicEmbed track={track} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 text-center"
            >
              <p className="text-textMuted text-xs">
                <span className="text-accent">♪</span> These tracks reflect my creative side — replace with your own Spotify embeds
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  );
}
