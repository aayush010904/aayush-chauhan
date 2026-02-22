export default function TagBadge({ children, active = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-180 ease-out-expo ${
        active
          ? 'bg-accent text-black shadow-sm'
          : 'bg-white/[0.06] text-slate-200 hover:bg-white/10'
      }`}
    >
      {children}
    </span>
  );
}
