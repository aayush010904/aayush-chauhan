import { motion } from 'framer-motion';

export default function ProficiencyBar({ skill, delay = 0 }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-200 text-[13px] font-medium">{skill.name}</span>
        <span className="text-textMuted text-[13px] tabular-nums">{skill.value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
        />
      </div>
    </div>
  );
}
