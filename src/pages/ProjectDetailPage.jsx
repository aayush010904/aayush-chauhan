import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Gallery from '../components/shared/Gallery';
import GlassCard from '../components/ui/GlassCard';
import TagBadge from '../components/ui/TagBadge';
import ScrollReveal from '../components/animation/ScrollReveal';
import { projects } from '../data/portfolioData';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <GlassCard className="p-6">
        <p className="text-lg font-semibold">Project not found</p>
        <Link to="/projects" className="text-accent mt-2 inline-block hover:underline">Back to projects</Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-5 pb-6">
      <ScrollReveal>
        <GlassCard className="overflow-hidden">
          <div className="h-64 relative">
            <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
          </div>
          <div className="p-6 -mt-12 relative z-10">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-textMuted mt-2 text-[15px] leading-relaxed">{project.overview}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tech.map((tech) => (
                <TagBadge key={tech}>{tech}</TagBadge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5 mt-5">
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-4 py-2 bg-white/[0.06] hover:bg-white/10 transition-colors duration-220 inline-flex items-center gap-2 text-sm"
              >
                GitHub <ArrowUpRight size={14} />
              </motion.a>
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-4 py-2 bg-accent text-black font-medium hover:bg-accent-hover transition-colors duration-150 inline-flex items-center gap-2 text-sm shadow-lg shadow-accent/20"
              >
                Live Demo <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-3">
        <ScrollReveal delay={0.05} className="lg:col-span-2">
          <GlassCard className="p-5 h-full">
            <h2 className="font-semibold mb-3 text-[15px]">Problem → Solution → Impact</h2>
            <div className="space-y-4 text-sm text-slate-300 leading-6">
              <div>
                <p className="text-accent font-medium text-xs uppercase tracking-wide mb-1">Problem</p>
                <p>{project.problem}</p>
              </div>
              <div>
                <p className="text-accent font-medium text-xs uppercase tracking-wide mb-1">Solution</p>
                <p>{project.solution}</p>
              </div>
              <div>
                <p className="text-accent font-medium text-xs uppercase tracking-wide mb-1">Impact</p>
                <p>{project.impact}</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard className="p-5 h-full">
            <h2 className="font-semibold mb-3 text-[15px]">Key Achievements</h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {project.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <GlassCard className="p-5">
          <h2 className="font-semibold mb-3 text-[15px]">Image / Video Gallery</h2>
          <Gallery images={project.gallery} />
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
