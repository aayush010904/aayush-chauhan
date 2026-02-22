export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-lg bg-panel p-4 ${className}`}>
      <div className="h-4 w-2/3 rounded-md skeleton-shimmer mb-3" />
      <div className="h-3 w-full rounded-md skeleton-shimmer mb-2" />
      <div className="h-3 w-5/6 rounded-md skeleton-shimmer" />
    </div>
  );
}
