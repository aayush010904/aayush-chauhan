import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import TagBadge from '../ui/TagBadge';

export default function PlaylistCard({ item }) {
  return (
    <Link to={`/research/${item.slug}`} className="block group">
      <GlassCard className="p-4 h-full hover:bg-white/[0.03] transition-colors duration-220 ease-out-expo">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-textMuted font-medium">{item.year}</p>
          {item.featured && <TagBadge active>Featured</TagBadge>}
        </div>
        <h3 className="font-semibold text-lg leading-snug mb-3 group-hover:text-white transition-colors">{item.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {item.domain.map((domain) => (
            <TagBadge key={domain}>{domain}</TagBadge>
          ))}
        </div>
      </GlassCard>
    </Link>
  );
}
