import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

const viewTitles = {
  dashboard: 'Dashboard',
  orders: 'Orders',
  analytics: 'Analytics',
  customers: 'Customers',
  settings: 'Settings',
} as const

export function Header() {
  const { activeView, openSidebar } = useApp()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={openSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
              {viewTitles[activeView]}
            </h1>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              Welcome back. Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Quick search..."
              className="h-10 w-56 rounded-xl border bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-500 transition focus:bg-white focus:ring-2 dark:bg-slate-900 dark:focus:bg-slate-950"
              aria-label="Quick search"
            />
          </div>

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="hidden items-center gap-3 rounded-xl border px-3 py-1.5 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              CT
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Cursor Team</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
