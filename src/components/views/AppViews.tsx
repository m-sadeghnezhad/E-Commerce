import { CategoryBreakdownChart } from '../dashboard/CategoryBreakdownChart'
import { RevenueTrendChart } from '../dashboard/RevenueTrendChart'
import { StatCards } from '../dashboard/StatCards'
import { OrdersTable } from '../table/OrdersTable'

export function DashboardView() {
  return (
    <div className="space-y-6">
      <StatCards />

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RevenueTrendChart />
        </div>
        <div className="xl:col-span-2">
          <CategoryBreakdownChart />
        </div>
      </div>

      <OrdersTable />
    </div>
  )
}

export function OrdersView() {
  return <OrdersTable />
}

export function AnalyticsView() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <RevenueTrendChart />
      <CategoryBreakdownChart />
    </div>
  )
}

export function PlaceholderView({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-dashed bg-white p-10 text-center dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}
