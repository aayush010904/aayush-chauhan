import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock3, FileText, BookOpen } from 'lucide-react';
import ScrollReveal from '../components/animation/ScrollReveal';
import { research, profile } from '../data/portfolioData';
import { useSearch } from '../context/SearchContext';

function ResearchRow({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/research/${item.slug}`}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Mobile: Spotify-style compact row (cover + title + subtitle) ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex md:hidden items-center gap-3 px-3 py-2.5 rounded-md active:bg-white/[0.06] transition-colors duration-150"
      >
        {/* Mini cover art */}
        {item.cover ? (
          <img src={item.cover} alt={item.title} className="w-10 h-10 shrink-0 rounded object-cover" />
        ) : (
          <div className="w-10 h-10 shrink-0 rounded bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-accent/70" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[14px] text-white truncate">
            {item.title}
          </p>
          <p className="text-[12px] text-textMuted truncate mt-0.5">
            {item.domain.join(', ')} · {item.publication}
          </p>
        </div>
      </motion.div>

      {/* ── Desktop: full table row ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:grid grid-cols-[32px_40px_1fr_minmax(100px,180px)_100px_80px] gap-3 items-center px-4 py-2.5 rounded-md hover:bg-white/[0.06] transition-colors duration-150"
      >
        {/* # / Play */}
        <div className="flex items-center justify-center w-8">
          {hovered ? (
            <Play className="w-3.5 h-3.5 text-white fill-white" />
          ) : (
            <span className="text-sm text-textMuted tabular-nums">{index + 1}</span>
          )}
        </div>

        {/* Cover thumbnail */}
        {item.cover ? (
          <img src={item.cover} alt={item.title} className="w-10 h-10 rounded object-cover" />
        ) : (
          <div className="w-10 h-10 rounded bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-accent/70" />
          </div>
        )}

        {/* Title + Abstract */}
        <div className="min-w-0">
          <p className="font-medium text-[15px] text-white truncate group-hover:text-accent transition-colors duration-150">
            {item.title}
          </p>
          <p className="text-xs text-textMuted truncate mt-0.5">
            {item.abstract}
          </p>
        </div>

        {/* Domain */}
        <div className="flex flex-wrap gap-1">
          {item.domain.map((d) => (
            <span
              key={d}
              className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-slate-300"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Publication */}
        <span className="text-xs text-textMuted truncate">
          {item.publication}
        </span>

        {/* Year */}
        <span className="text-xs text-textMuted text-right tabular-nums">
          {item.year}
        </span>
      </motion.div>
    </Link>
  );
}

export default function ResearchPage() {
  const navigate = useNavigate();
  const { query } = useSearch();

  const filteredResearch = useMemo(() => {
    const term = query.toLowerCase().trim();
    return research.filter(
      (item) =>
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.domain.some((d) => d.toLowerCase().includes(term)),
    );
  }, [query]);

  return (
    <div className="pb-6">
      {/* ── Playlist Header ── */}
      <ScrollReveal>
        <section className="relative rounded-t-lg overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a] via-[#14261d] to-base" />

          <div className="relative flex flex-col items-center text-center md:flex-row md:items-end md:text-left gap-4 md:gap-5 p-5 md:p-8 pb-5 md:pb-8">
            {/* Cover art */}
            <div className="w-36 h-36 md:w-48 md:h-48 shrink-0 rounded shadow-2xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center">
              <BookOpen className="w-14 h-14 md:w-20 md:h-20 text-accent/80" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 md:gap-2 min-w-0">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/70">
                Playlist
              </span>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
                Research Papers
              </h1>
              <p className="text-xs md:text-sm text-white/60 mt-0.5 md:mt-1 line-clamp-2">
                Playlist of all my published and research works.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs md:text-sm text-white/70 mt-0.5 md:mt-1">
                <span className="font-semibold text-white">{profile.name}</span>
                <span className="text-white/40">•</span>
                <span>{research.length} papers</span>
                <span className="text-white/40">•</span>
                <span>{research.filter((r) => r.publication !== 'Under Review').length} published</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Action Row ── */}
      <ScrollReveal delay={0.05}>
        <div className="flex items-center justify-center gap-4 px-5 md:px-8 py-4 md:py-5 bg-gradient-to-b from-[#14261d]/60 to-transparent">
          <button
            onClick={() => {
              if (research.length > 0) {
                navigate(`/research/${research[0].slug}`);
              }
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150"
            aria-label="Open first research"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 text-black fill-black ml-0.5" />
          </button>
        </div>
      </ScrollReveal>

      {/* ── Column Header (hidden on mobile for clean Spotify look) ── */}
      <div className="hidden md:grid grid-cols-[32px_1fr_minmax(100px,180px)_100px_80px] gap-3 items-center px-4 py-2 border-b border-white/[0.06] mx-4 mb-1">
        <span className="text-xs text-textMuted text-center">#</span>
        <span className="text-xs text-textMuted uppercase tracking-wide">Title</span>
        <span className="text-xs text-textMuted uppercase tracking-wide">Domain</span>
        <span className="text-xs text-textMuted uppercase tracking-wide">Status</span>
        <span className="text-xs text-textMuted flex justify-end">
          <Clock3 className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* ── Track List ── */}
      <div className="px-2 md:px-4">
        {filteredResearch.length > 0 ? (
          filteredResearch.map((item, index) => (
            <ResearchRow key={item.id} item={item} index={index} />
          ))
        ) : (
          <div className="text-center py-16 text-textMuted text-sm">
            No research papers match your search.
          </div>
        )}
      </div>
    </div>
  );
}
