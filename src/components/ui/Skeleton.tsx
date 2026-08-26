import { cn } from '../../utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-slate-900">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-8 w-32" />
      <Skeleton className="mt-3 h-4 w-16" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-slate-900">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-6 h-64 w-full" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-slate-900">
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  )
}
