import { motion } from 'framer-motion';

export default function Gallery({ images }) {
  return (
    <div
      className="grid gap-2.5 max-w-2xl"
      style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-square rounded-md overflow-hidden shadow-card max-h-48"
        >
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            loading="lazy"
            className="h-full w-full object-cover hover:scale-[1.04] transition-transform duration-500 ease-out-expo"
          />
        </motion.div>
      ))}
    </div>
  );
}
