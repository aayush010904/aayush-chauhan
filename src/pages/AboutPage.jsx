import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Timeline from '../components/shared/Timeline';
import ScrollReveal from '../components/animation/ScrollReveal';
import { profile } from '../data/portfolioData';

const categoryKeys = Object.keys(profile.skillCategories);

function SkillRow({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-[12px] text-textMuted tabular-nums font-medium">{skill.value}%</span>
      </div>
      <div className="h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.value}%` }}
          transition={{ duration: 0.7, delay: index * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent/70 via-accent to-accent"
        />
      </div>
    </motion.div>
  );
}

const VISIT_STORAGE_KEY = 'portfolio_visit_count';
const VISIT_SESSION_KEY = 'portfolio_session_counted';
const BASE_VISITS = 0;

/** Persistent visit counter — increments once per browser session, persists in localStorage. */
function useVisitCounter() {
  const [visits, setVisits] = useState(() => {
    const stored = localStorage.getItem(VISIT_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : BASE_VISITS;
  });

  useEffect(() => {
    if (!sessionStorage.getItem(VISIT_SESSION_KEY)) {
      const stored = localStorage.getItem(VISIT_STORAGE_KEY);
      const current = stored ? parseInt(stored, 10) : BASE_VISITS;
      const next = current + 1;
      localStorage.setItem(VISIT_STORAGE_KEY, String(next));
      sessionStorage.setItem(VISIT_SESSION_KEY, '1');
      setVisits(next);
    }
  }, []);

  return visits;
}

/* Animated counter that rolls up to target */
function AnimatedCount({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{count.toLocaleString()}</>;
}

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const visitCount = useVisitCounter();

  return (
    <div className="space-y-5 pb-6">
      {/* ── Spotify-style Artist Hero ── */}
      <ScrollReveal>
        <div className="relative rounded-lg overflow-hidden">
          {/* Banner background — gradient + subtle noise */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a] via-[#0f1f17] to-base" />

          {/* Hero content */}
          <div className="relative flex flex-col items-start gap-5 p-5 md:p-8 pb-6 md:pb-10">
            {/* Top row: avatar + meta (mobile vertical, desktop horizontal) */}
            <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-7 w-full">
              {/* Profile picture — large, circular with shadow */}
              <motion.img
                src="/img/pfp.png"
                alt={profile.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-36 w-36 md:h-56 md:w-56 rounded-full object-cover shrink-0 shadow-2xl ring-2 ring-white/5"
              />

              <div className="flex flex-col gap-2.5 min-w-0">
                {/* Verified badge */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="flex items-center gap-1.5"
                >
                  <BadgeCheck size={20} className="text-[#4CB3FF] fill-[#4CB3FF] stroke-base shrink-0" />
                  <span className="text-[13px] font-medium text-white">Open to Collaborate</span>
                </motion.div>

                {/* Name — oversized like Spotify */}
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
                >
                  {profile.name}
                </motion.h1>

                {/* "Monthly listeners" → Website visits */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className="text-sm text-slate-300 font-medium"
                >
                  <span className="text-white tabular-nums"><AnimatedCount target={visitCount} /></span>{' '}
                  website visits
                </motion.p>
              </div>
            </div>

            {/* Role + Location row */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-textMuted"
            >
              <span className="text-accent font-semibold">{profile.role}</span>
              <span className="hidden md:inline opacity-40">•</span>
              <span>{profile.location}</span>
            </motion.div>
          </div>

          {/* Bottom gradient fade into base */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-base to-transparent pointer-events-none" />
        </div>
      </ScrollReveal>

      {/* Bio section — sits right below hero, like Spotify's "About" blurb */}
      <ScrollReveal delay={0.03}>
        <GlassCard className="p-5 md:p-6">
          <p className="text-slate-300 leading-7 text-[15px]">{profile.bio}</p>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <GlassCard className="p-5 md:p-6">
          <h2 className="text-xl font-bold mb-4">Technical Skills</h2>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
            {categoryKeys.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-180 ${
                  activeCategory === cat ? 'text-black' : 'text-textMuted hover:text-white'
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {activeCategory !== cat && (
                  <span className="absolute inset-0 rounded-full bg-white/[0.06]" />
                )}
                <span className="relative z-10 whitespace-nowrap">{cat}</span>
              </button>
            ))}
          </div>

          {/* Skill bars for active category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {profile.skillCategories[activeCategory].map((skill, index) => (
                <SkillRow key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <GlassCard className="p-5 h-full">
          <h2 className="font-semibold mb-4 text-[15px]">Journey Timeline</h2>
          <Timeline items={profile.timeline} />
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
