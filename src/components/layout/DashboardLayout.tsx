import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Header } from './Header'
import { Sidebar, useSidebarOffsetClass } from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarOffset = useSidebarOffsetClass()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div
        className={cn(
          'flex min-h-screen min-w-0 flex-col transition-[margin] duration-300',
          sidebarOffset,
        )}
      >
        <Header />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
