export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`shimmer-bg animate-shimmer bg-ink-100 dark:bg-ink-800 rounded-lg ${className}`}
      style={{
        background:
          'linear-gradient(90deg, rgba(99,110,163,0.08) 0%, rgba(99,110,163,0.15) 50%, rgba(99,110,163,0.08) 100%)',
        backgroundSize: '1000px 100%',
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card-base p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
