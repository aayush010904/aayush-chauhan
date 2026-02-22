import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import MusicEmbed from '../components/shared/MusicEmbed';
import { tracks, artistProfile } from '../data/portfolioData';

const ease = [0.25, 0.1, 0.25, 1];
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
});

/* ── Loading Screen ────────────────────────── */
const BARS = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9];

function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-base rounded-lg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="flex items-end gap-1 h-10 mb-6">
        {BARS.map((maxScale, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-accent"
            initial={{ height: 4 }}
            animate={{ height: phase < 2 ? [4, maxScale * 40, 4] : 0 }}
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
            transition={{ duration: 0.4, ease }}
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
  const handleDone = useCallback(() => setShowLoading(false), []);

  const artistEmbed = useMemo(
    () => ({ ...artistProfile, title: artistProfile.name, type: 'artist' }),
    [],
  );

  return (
    <div className="relative min-h-[60vh]">
      <AnimatePresence>
        {showLoading && <LoadingScreen onDone={handleDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="pb-8"
          >
            {/* Hero header */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/25 via-accent/8 to-transparent" />
              <div className="relative px-6 md:px-10 pt-12 pb-10">
                <motion.div {...fade(0.1)} className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-accent grid place-items-center">
                    <Music size={12} className="text-black" />
                  </div>
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">Something More</span>
                </motion.div>

                <motion.h1
                  {...fade(0.2)}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
                >
                  Beyond the<br />
                  <span className="text-accent">Code</span>
                </motion.h1>

                <motion.p
                  {...fade(0.3)}
                  className="text-slate-300 mt-4 max-w-2xl text-[15px] leading-relaxed"
                >
                  Outside engineering and research, I find creative expression through music.
                  Rhythm, structure, and emotional tone aren't just artistic tools they shape
                  how I think about product design and user experience.
                </motion.p>
              </div>
            </div>

            {/* Artist Profile */}
            <div className="px-1 mb-8">
              <motion.div {...fade(0.4)} className="mb-4">
                <h2 className="text-xl font-bold tracking-tight">Artist Profile</h2>
                <p className="text-textMuted text-sm mt-0.5">Follow me on Spotify</p>
              </motion.div>

              <motion.div {...fade(0.5)}>
                <MusicEmbed track={artistEmbed} />
                <a
                  href={artistProfile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-accent text-sm font-medium hover:underline"
                >
                  Open in Spotify <ExternalLink size={13} />
                </a>
              </motion.div>
            </div>

            {/* Tracks */}
            <div className="px-1 grid lg:grid-cols-2 gap-3">
              {tracks.map((track, i) => (
                <motion.div key={track.id} {...fade(0.6 + i * 0.1)}>
                  <div className="mb-2">
                    <h3 className="text-sm font-semibold text-white">{track.title}</h3>
                    <p className="text-xs text-textMuted leading-relaxed">{track.description}</p>
                  </div>
                  <MusicEmbed track={track} />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 text-center text-textMuted text-xs"
            >
              <span className="text-accent">♪</span> Music is my creative outlet beyond code
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
