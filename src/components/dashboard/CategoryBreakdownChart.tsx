import { useMemo, useState } from 'react'
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  type PieSectorShapeProps,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import { categoryData } from '../../mock/data'
import type { CategoryDataPoint } from '../../types'
import { formatCompactNumber } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import { Card, CardHeader } from '../ui/Card'
import { ChartSkeleton } from '../ui/Skeleton'

function renderPieSector(props: PieSectorShapeProps, hoveredIndex: number) {
  const {
    cx = 0,
    cy = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill = '#6366f1',
    index = 0,
    isActive = false,
  } = props

  const isHighlighted = isActive || index === hoveredIndex
  const activeOuterRadius = isHighlighted ? outerRadius + 8 : outerRadius

  return (
    <g className="transition-all duration-300">
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={activeOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {isHighlighted ? (
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 4}
          outerRadius={innerRadius - 1}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.25}
        />
      ) : null}
    </g>
  )
}

interface TooltipPayloadItem {
  name: string
  value: number
  payload: CategoryDataPoint
}

interface CategoryTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
}

function CategoryTooltip({ active, payload }: CategoryTooltipProps) {
  if (!active || !payload?.length) return null

  const item = payload[0]

  return (
    <div className="rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {formatCompactNumber(item.value)} units sold
      </p>
    </div>
  )
}

export function CategoryBreakdownChart() {
  const { isLoading } = useApp()
  const { isDark } = useTheme()
  const [hoveredIndex, setHoveredIndex] = useState(0)

  const chartData = useMemo(
    () =>
      categoryData.map((item) => ({
        ...item,
        fill: item.color,
      })),
    [],
  )

  const total = useMemo(
    () => categoryData.reduce((sum, item) => sum + item.value, 0),
    [],
  )

  if (isLoading) return <ChartSkeleton />

  return (
    <Card>
      <CardHeader
        title="Sales by Category"
        description="Product distribution across top categories"
      />

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="h-64 w-full max-w-xs">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={3}
                stroke={isDark ? '#0f172a' : '#fff'}
                strokeWidth={2}
                shape={(props) => renderPieSector(props, hoveredIndex)}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
              />
              <Tooltip content={<CategoryTooltip />} defaultIndex={0} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex-1 space-y-3">
          {categoryData.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1)

            return (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors',
                  hoveredIndex === index
                    ? 'border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900',
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.name}
                  </span>
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{percentage}%</span>
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
