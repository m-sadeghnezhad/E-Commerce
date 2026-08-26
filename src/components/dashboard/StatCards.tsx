import { Activity, DollarSign, MousePointerClick, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useLanguage } from '../../context/LanguageContext'
import { statMetrics } from '../../mock/data'
import type { StatMetric } from '../../types'
import { formatStatValue } from '../../utils/formatters'
import { TrendBadge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { CardSkeleton } from '../ui/Skeleton'
import { cn } from '../../utils/cn'

const iconMap = {
  revenue: DollarSign,
  users: Users,
  bounce: Activity,
  conversion: MousePointerClick,
}

const iconStyles = {
  revenue: 'bg-brand-100 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400',
  users: 'bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400',
  bounce: 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
  conversion: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
}

const statLabelKeys: Record<StatMetric['id'], string> = {
  revenue: 'stats.totalRevenue',
  users: 'stats.activeUsers',
  bounce: 'stats.bounceRate',
  conversion: 'stats.conversionRate',
}

function StatCard({ metric }: { metric: StatMetric }) {
  const { locale, t } = useLanguage()
  const Icon = iconMap[metric.icon]

  return (
    <Card className="transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            iconStyles[metric.icon],
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <TrendBadge value={metric.change} trend={metric.trend} />
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t(statLabelKeys[metric.id])}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {formatStatValue(metric.rawValue, metric.valueType, locale)}
        </p>
      </div>
    </Card>
  )
}

export function StatCards() {
  const { isLoading } = useApp()

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statMetrics.map((metric) => (
        <StatCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
