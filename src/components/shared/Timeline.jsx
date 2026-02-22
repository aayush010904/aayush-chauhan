import { motion } from 'framer-motion';

export default function Timeline({ items }) {
  return (
    <div className="relative border-l border-white/10 pl-6 space-y-5">
      {items.map((item, index) => (
        <motion.div
          key={`${item.year}-${item.title}`}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 + 0.1, type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-glow"
          />
          <p className="text-[11px] text-accent font-medium uppercase tracking-wide mb-0.5">{item.year}</p>
          <h4 className="font-semibold text-sm">{item.title}</h4>
          <p className="text-[13px] text-textMuted mt-0.5 leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
