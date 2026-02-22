import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function AlbumCard({ project }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-md bg-panel/60 hover:bg-panelSoft/80 transition-all duration-280 ease-out-expo cursor-pointer h-full"
    >
      <Link to={`/projects/${project.slug}`} className="flex flex-col h-full p-3">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-md shadow-card group-hover:shadow-card-hover transition-shadow duration-280">
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out-expo gpu"
            />
          </div>

          {/* Play button — floats on hover, clickable */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/projects/${project.slug}`);
            }}
            aria-label={`View ${project.title}`}
            className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-accent text-black grid place-items-center shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out hover:bg-[#1ed760] hover:scale-110 active:scale-95 active:bg-[#1aa34a] focus:outline-none cursor-pointer z-10 drop-shadow-xl"
          >
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </button>
        </div>

        <div className="mt-2.5 md:mt-3 flex-1 flex flex-col min-w-0">
          <p className="font-semibold leading-tight text-xs md:text-sm line-clamp-1 group-hover:text-white transition-colors duration-150">
            {project.title}
          </p>
          <p className="text-[11px] md:text-[13px] text-textMuted leading-snug line-clamp-1 md:line-clamp-2 mt-0.5">
            {project.subtitle}
          </p>

          <div className="flex items-center gap-1 md:gap-1.5 pt-1 mt-auto">
            <div className="hidden md:flex items-center gap-1.5 min-w-0 flex-1">
              {project.tech.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-textSubtle font-medium truncate"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[10px] md:text-[10px] text-textMuted md:ml-auto shrink-0">{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
