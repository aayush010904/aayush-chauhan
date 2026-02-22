import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Play } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AlbumCard from '../components/cards/AlbumCard';
import ScrollReveal from '../components/animation/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import { profile, projects } from '../data/portfolioData';

export default function HomePage() {
  const featured = useMemo(() => projects.filter((project) => project.featured), []);
  const quickMix = useMemo(() => projects.slice(0, 4), []);
  const railRef = useRef(null);

  return (
    <div className="space-y-6 pb-6">
      {/* Hero */}
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
          <div className="relative p-6 md:p-8 md:pr-56 lg:pr-64">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-textMuted text-sm mb-1.5"
            >{profile.greeting}</motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
            >{profile.name}</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-accent mt-2 font-semibold"
            >{profile.role}</motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-slate-300 mt-3 max-w-2xl leading-relaxed text-[15px]"
            >{profile.summary}</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-5 items-center"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent text-black font-semibold px-5 py-2.5 text-sm hover:bg-accent-hover transition-colors duration-150 shadow-lg shadow-accent/20"
              >
                View Projects <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] text-white font-medium px-5 py-2.5 text-sm hover:bg-white/[0.12] transition-colors duration-150"
              >
                Get in Touch
              </Link>
              {/* Resume Play Button */}
              <motion.a
                href={profile.contact.resumeUrl}
                download
                className="group relative inline-flex items-center gap-0 rounded-full bg-white/[0.07] hover:bg-white/[0.12] text-white font-medium h-10 overflow-hidden transition-all duration-300 ease-out"
                whileHover={{ width: 'auto' }}
                whileTap={{ scale: 0.95 }}
                style={{ width: 40 }}
              >
                <span className="h-10 w-10 shrink-0 grid place-items-center">
                  <Download size={16} className="group-hover:text-accent transition-colors duration-200" />
                </span>
                <span className="text-sm font-medium pr-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Resume
                </span>
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="hidden md:flex absolute inset-y-0 right-0 w-52 lg:w-64 items-end justify-end z-10 pointer-events-none select-none"
          >
            <img
              src="/img/avatar.png"
              alt={profile.name}
              className="h-full w-auto max-h-full object-contain object-right"
            />
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Quick Mix */}
      <ScrollReveal delay={0.05}>
        <StaggerContainer className="grid grid-cols-2 gap-2 md:gap-2.5">
          {quickMix.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                to={`/projects/${project.slug}`}
                className="flex items-center gap-2 md:gap-3 rounded-md bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-220 ease-out-expo overflow-hidden group"
              >
                <img
                  src={project.cover}
                  alt={project.title}
                  loading="lazy"
                  className="h-12 w-12 md:h-16 md:w-16 object-cover group-hover:brightness-110 transition-all duration-300 shrink-0"
                />
                <p className="font-semibold text-xs md:text-sm pr-2 md:pr-3 line-clamp-2 group-hover:text-white transition-colors">{project.title}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* About + Stats */}
      <div className="grid gap-3 lg:grid-cols-3">
        <ScrollReveal delay={0.05}>
          <Link to="/about" className="block h-full">
            <GlassCard className="p-4 md:p-5 lg:col-span-1 h-full hover:bg-white/[0.03] transition-colors duration-220 group">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h2 className="font-semibold text-sm md:text-[15px]">About Me</h2>
                <ArrowRight size={14} className="text-textMuted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150" />
              </div>
              <p className="text-xs md:text-sm text-textMuted leading-5 md:leading-6">{profile.bio}</p>
            </GlassCard>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-2">
          <GlassCard className="p-4 md:p-5 h-full">
            <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-[15px]">Quick Stats</h2>
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-2.5">
              {profile.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="rounded-lg bg-white/[0.04] p-3 md:p-4 transition-colors duration-220">
                    <p className="text-xl md:text-2xl font-bold text-accent">{stat.value}</p>
                    <p className="text-xs md:text-sm text-textMuted mt-0.5">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Education + Experience */}
      <div className="grid gap-3 md:grid-cols-2">
        <ScrollReveal delay={0.05}>
          <GlassCard className="p-4 md:p-5 h-full">
            <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-[15px]">Education</h2>
            <div className="space-y-2.5">
              {profile.education.map((item) => (
                <div key={item.institution} className="rounded-lg bg-white/[0.04] p-3 md:p-4">
                  <p className="font-medium text-xs md:text-sm">{item.degree}</p>
                  <p className="text-[12px] md:text-[13px] text-textMuted mt-0.5">{item.institution} · {item.duration}</p>
                  <p className="text-[12px] md:text-[13px] text-slate-300 mt-1.5 md:mt-2 leading-relaxed">{item.highlights}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard className="p-4 md:p-5 h-full">
            <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-[15px]">Experience</h2>
            <div className="space-y-2.5">
              {profile.experience.map((item) => (
                <div key={item.company} className="rounded-lg bg-white/[0.04] p-3 md:p-4">
                  <p className="font-medium text-xs md:text-sm">{item.role}</p>
                  <p className="text-[12px] md:text-[13px] text-textMuted mt-0.5">{item.company} · {item.duration}</p>
                  <p className="text-[12px] md:text-[13px] text-slate-300 mt-1.5 md:mt-2 leading-relaxed">{item.impact}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Featured Rail */}
      <ScrollReveal delay={0.05}>
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Made for You</h2>
            <Link to="/projects" className="text-sm text-textMuted hover:text-white transition-colors duration-150 font-medium">
              Show all
            </Link>
          </div>
          <div
            ref={railRef}
            className="flex gap-2.5 md:gap-3 overflow-x-auto scroll-container scrollbar-thin pb-2"
          >
            {featured.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-[150px] md:min-w-[180px] max-w-[180px] md:max-w-[210px] shrink-0 flex"
              >
                <div className="w-full flex flex-col">
                  <AlbumCard project={project} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
