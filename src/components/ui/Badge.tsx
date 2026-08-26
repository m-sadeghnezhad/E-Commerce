import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { formatPercent } from '../../utils/formatters'
import { cn } from '../../utils/cn'

interface BadgeProps {
  value: number
  trend: 'up' | 'down'
  className?: string
}

export function TrendBadge({ value, trend, className }: BadgeProps) {
  const { locale } = useLanguage()
  const isPositive = trend === 'up'
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        isPositive
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {formatPercent(value, locale)}
    </span>
  )
}

interface StatusBadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
}

const toneStyles: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
  info: 'bg-brand-100 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300',
}

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneStyles[tone],
      )}
    >
      {children}
    </span>
  )
}
