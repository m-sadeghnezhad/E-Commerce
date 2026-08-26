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
import { useTheme } from '../../context/ThemeContext'
import { revenueData } from '../../mock/data'
import type { RevenueDataPoint } from '../../types'
import { formatCompactNumber, formatCurrency } from '../../utils/formatters'
import { Card, CardHeader } from '../ui/Card'
import { ChartSkeleton } from '../ui/Skeleton'

interface TooltipPayloadItem {
  color: string
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-6 text-sm">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {formatCurrency(entry.value)}
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

  const chartColors = useMemo(
    () => ({
      grid: isDark ? '#334155' : '#e2e8f0',
      axis: isDark ? '#94a3b8' : '#64748b',
      revenue: '#6366f1',
      target: '#06b6d4',
    }),
    [isDark],
  )

  if (isLoading) return <ChartSkeleton />

  return (
    <Card>
      <CardHeader
        title="Revenue Trend"
        description="Monthly revenue performance against target goals"
      />
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={revenueData as RevenueDataPoint[]} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.revenue} stopOpacity={0.35} />
                <stop offset="100%" stopColor={chartColors.revenue} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => formatCompactNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartColors.revenue, strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={chartColors.revenue}
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Target"
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
