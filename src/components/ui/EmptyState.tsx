import { SearchX } from 'lucide-react'
import { cn } from '../../utils/cn'

interface EmptyStateProps {
  title: string
  description: string
  className?: string
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-16 text-center',
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <SearchX className="h-6 w-6 text-slate-400" aria-hidden="true" />
      </div>
      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}
