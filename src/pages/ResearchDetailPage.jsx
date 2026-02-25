import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import TagBadge from '../components/ui/TagBadge';
import ScrollReveal from '../components/animation/ScrollReveal';
import { research } from '../data/portfolioData';

export default function ResearchDetailPage() {
  const { slug } = useParams();
  const item = research.find((entry) => entry.slug === slug);

  if (!item) {
    return (
      <GlassCard className="p-6">
        <p className="text-lg font-semibold">Research entry not found</p>
        <Link to="/research" className="text-accent mt-2 inline-block hover:underline">Back to research</Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      <ScrollReveal>
        <GlassCard className="overflow-hidden">
          {item.cover && (
            <div className="h-52 relative">
              <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
            </div>
          )}
          <div className={`p-6 ${item.cover ? '-mt-12 relative z-10' : ''}`}>
            <p className="text-sm text-textMuted mb-2 font-medium">{item.year}</p>
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.domain.map((domain) => (
                <TagBadge key={domain}>{domain}</TagBadge>
              ))}
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-3">
        <ScrollReveal delay={0.05}>
          <GlassCard className="p-5 h-full">
            <h2 className="font-semibold mb-2 text-[15px]">Abstract</h2>
            <p className="text-sm text-slate-300 leading-6">{item.abstract}</p>
          </GlassCard>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <GlassCard className="p-5 h-full">
            <h2 className="font-semibold mb-2 text-[15px]">Methodology</h2>
            <p className="text-sm text-slate-300 leading-6">{item.methodology}</p>
          </GlassCard>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <GlassCard className="p-5">
          <h2 className="font-semibold mb-2 text-[15px]">Results</h2>
          <p className="text-sm text-slate-300 leading-6">{item.results}</p>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <GlassCard className="p-5">
          <h2 className="font-semibold mb-2 text-[15px]">Publication</h2>
          <p className="text-sm text-textMuted">{item.publication}</p>
          <div className="flex flex-wrap gap-2.5 mt-4">
            <motion.a
              href={item.links.paper}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-4 py-2 bg-white/[0.06] hover:bg-white/10 transition-colors duration-220 inline-flex items-center gap-2 text-sm"
            >Paper <ArrowUpRight size={14} />
            </motion.a>
            <motion.a
              href={item.links.code}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-4 py-2 bg-accent text-black font-medium hover:bg-accent-hover transition-colors duration-150 inline-flex items-center gap-2 text-sm shadow-lg shadow-accent/20"
            >
              Code <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
