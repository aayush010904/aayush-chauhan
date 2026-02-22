import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AlbumCard from '../components/cards/AlbumCard';
import TagBadge from '../components/ui/TagBadge';
import SkeletonCard from '../components/ui/SkeletonCard';
import ScrollReveal from '../components/animation/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import { projects } from '../data/portfolioData';
import { useSearch } from '../context/SearchContext';

export default function ProjectsPage() {
  const { query, setQuery } = useSearch();
  const [activeTech, setActiveTech] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const technologies = useMemo(
    () => ['All', ...new Set(projects.flatMap((project) => project.tech))],
    [],
  );

  const filteredProjects = useMemo(() => {
    const term = query.toLowerCase().trim();
    return projects.filter((project) => {
      const matchTech = activeTech === 'All' || project.tech.includes(activeTech);
      const matchSearch =
        !term ||
        project.title.toLowerCase().includes(term) ||
        project.subtitle.toLowerCase().includes(term) ||
        project.tech.some((tech) => tech.toLowerCase().includes(term));
      return matchTech && matchSearch;
    });
  }, [activeTech, query]);

  return (
    <div className="space-y-5 pb-6">
      <ScrollReveal>
        <section>
          <h1 className="text-3xl font-bold mb-1.5">Project Albums</h1>
          <p className="text-textMuted text-[15px]">Explore flagship builds with outcomes, architecture details, and delivery impact.</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects"
            className="mt-3 w-full md:max-w-md rounded-full bg-[#1a1a1a] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/15 hover:bg-[#1f1f1f] transition-all duration-220 ease-out-expo"
          />
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <section>
          <div className="flex gap-1.5 mb-4 overflow-x-auto md:flex-wrap md:overflow-x-visible pb-2 md:pb-0 no-scrollbar">
            {technologies.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => setActiveTech(tech)}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="shrink-0"
              >
                <TagBadge active={activeTech === tech}>{tech}</TagBadge>
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} className="h-72" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
              {filteredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <AlbumCard project={project} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </section>
      </ScrollReveal>
    </div>
  );
}
