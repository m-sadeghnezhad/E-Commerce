import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { revenueData } from '../../mock/data'
import { formatCompactNumber, formatCurrency } from '../../utils/formatters'
import { Card, CardHeader } from '../ui/Card'
import { ChartSkeleton } from '../ui/Skeleton'

interface TooltipPayloadItem {
  color: string
  dataKey: string
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
  formatValue: (value: number) => string
  revenueLabel: string
  targetLabel: string
}

function CustomTooltip({
  active,
  payload,
  label,
  formatValue,
  revenueLabel,
  targetLabel,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  const labelMap: Record<string, string> = {
    revenue: revenueLabel,
    target: targetLabel,
  }

  return (
    <div className="rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6 text-sm">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {labelMap[entry.dataKey] ?? entry.name}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {formatValue(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RevenueTrendChart() {
  const { isLoading } = useApp()
  const { isDark } = useTheme()
  const { locale, isRtl, t } = useLanguage()

  const chartData = useMemo(
    () =>
      revenueData.map((point) => ({
        ...point,
        monthLabel: t(`months.${point.monthKey}`),
      })),
    [t],
  )

  const chartColors = useMemo(
    () => ({
      grid: isDark ? '#334155' : '#e2e8f0',
      axis: isDark ? '#94a3b8' : '#64748b',
      revenue: '#6366f1',
      target: '#06b6d4',
    }),
    [isDark],
  )

  const formatTooltipValue = (value: number) => formatCurrency(value, locale)
  const formatAxisValue = (value: number) => formatCompactNumber(value, locale)

  if (isLoading) return <ChartSkeleton />

  return (
    <Card>
      <CardHeader
        title={t('charts.revenueTrend')}
        description={t('charts.revenueTrendDesc')}
      />
      <div className="chart-ltr h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 8,
              right: isRtl ? 16 : 8,
              left: isRtl ? 8 : -12,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.revenue} stopOpacity={0.35} />
                <stop offset="100%" stopColor={chartColors.revenue} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="monthLabel"
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              orientation={isRtl ? 'right' : 'left'}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatAxisValue}
              width={isRtl ? 56 : 48}
            />
            <Tooltip
              content={
                <CustomTooltip
                  formatValue={formatTooltipValue}
                  revenueLabel={t('charts.revenue')}
                  targetLabel={t('charts.target')}
                />
              }
              cursor={{ stroke: chartColors.revenue, strokeWidth: 1 }}
              wrapperStyle={{ zIndex: 50 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="revenue"
              stroke={chartColors.revenue}
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="target"
              stroke={chartColors.target}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
