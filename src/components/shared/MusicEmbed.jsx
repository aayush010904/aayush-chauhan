import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MusicEmbed({ track }) {
  const [loaded, setLoaded] = useState(false);
  const isPlaylist = track.type === 'playlist';
  const isAlbum = track.type === 'album';
  const isArtist = track.type === 'artist';
  const height = isPlaylist || isAlbum ? 380 : isArtist ? 352 : 152;

  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-[#121212]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative" style={{ height }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}
        <iframe
          src={track.spotifyUri}
          title={track.title}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: 12, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </motion.div>
  );
}
