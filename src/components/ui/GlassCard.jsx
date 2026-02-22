import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.005, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } : {}}
      className={`glass-panel rounded-lg shadow-card card-lift ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
