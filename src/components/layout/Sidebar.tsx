import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingBag,
  Users,
  X,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useLanguage } from '../../context/LanguageContext'
import type { AppView, NavItem } from '../../types'
import { cn } from '../../utils/cn'

const navItems: NavItem[] = [
  { id: 'dashboard', icon: 'dashboard' },
  { id: 'orders', icon: 'orders' },
  { id: 'analytics', icon: 'analytics' },
  { id: 'customers', icon: 'customers' },
  { id: 'settings', icon: 'settings' },
]

const iconMap = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  analytics: BarChart3,
  customers: Users,
  settings: Settings,
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const {
    activeView,
    setActiveView,
    isSidebarOpen,
    isSidebarCollapsed,
    closeSidebar,
    toggleSidebarCollapse,
  } = useApp()
  const { t, isRtl } = useLanguage()

  const handleNavigate = (view: AppView) => {
    setActiveView(view)
    closeSidebar()
  }

  const sidebarWidth = isSidebarCollapsed ? 'w-[72px]' : 'w-64'

  // Slide animation is mobile-only; desktop sidebar stays pinned at inline-start.
  const mobileTranslate = isSidebarOpen
    ? 'translate-x-0'
    : isRtl
      ? 'max-lg:translate-x-full'
      : 'max-lg:-translate-x-full'

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 flex flex-col border-e bg-white transition-all duration-300 ease-in-out dark:bg-slate-950',
          'lg:translate-x-0',
          mobileTranslate,
          sidebarWidth,
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className={cn('flex items-center gap-3 overflow-hidden', isSidebarCollapsed && 'justify-center')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
              {t('brand.logoLetter')}
            </div>
            {!isSidebarCollapsed ? (
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t('brand.dashboard')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('brand.subtitle')}</p>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            onClick={closeSidebar}
            aria-label={t('header.closeSidebar')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = activeView === item.id
            const label = t(`nav.${item.id}`)

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900',
                  isSidebarCollapsed && 'justify-center px-2',
                )}
                title={isSidebarCollapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed ? <span>{label}</span> : null}
              </button>
            )
          })}
        </nav>

        <div className="hidden border-t p-3 lg:block">
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900',
              isSidebarCollapsed && 'justify-center px-2',
            )}
            aria-label={
              isSidebarCollapsed ? t('header.expandSidebar') : t('header.collapseSidebar')
            }
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-5 w-5 rtl:scale-x-[-1]" />
            ) : (
              <>
                <PanelLeftClose className="h-5 w-5 rtl:scale-x-[-1]" />
                <span>{t('nav.collapse')}</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export function MobileBackButton() {
  const { activeView, setActiveView } = useApp()
  const { t, isRtl } = useLanguage()

  if (activeView === 'dashboard') return null

  const BackIcon = isRtl ? ChevronRight : ChevronLeft

  return (
    <button
      type="button"
      onClick={() => setActiveView('dashboard')}
      className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 lg:hidden dark:hover:text-slate-300"
    >
      <BackIcon className="h-4 w-4" />
      {t('header.back')}
    </button>
  )
}

export function useSidebarOffsetClass(): string {
  const { isSidebarCollapsed } = useApp()
  return isSidebarCollapsed ? 'lg:ms-[72px]' : 'lg:ms-64'
}
