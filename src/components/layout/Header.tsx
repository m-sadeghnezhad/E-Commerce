import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'

export function Header() {
  const { activeView, openSidebar } = useApp()
  const { isDark, toggleTheme } = useTheme()
  const { locale, toggleLocale, t } = useLanguage()

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={openSidebar}
            aria-label={t('header.openSidebar')}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
              {t(`nav.${activeView}`)}
            </h1>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              {t('header.welcome')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder={t('header.quickSearch')}
              className="h-10 w-56 rounded-xl border bg-slate-50 ps-10 pe-4 text-sm outline-none ring-brand-500 transition focus:bg-white focus:ring-2 dark:bg-slate-900 dark:focus:bg-slate-950"
              aria-label={t('header.quickSearch')}
            />
          </div>

          <Button variant="ghost" size="icon" aria-label={t('header.notifications')}>
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={toggleLocale}
            aria-label={locale === 'en' ? t('header.switchToPersian') : t('header.switchToEnglish')}
            className="min-w-[3.25rem] font-semibold tracking-wide"
          >
            {locale === 'en' ? 'FA' : 'EN'}
          </Button>

          <Button
            variant="secondary"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? t('header.switchToLight') : t('header.switchToDark')}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="hidden items-center gap-3 rounded-xl border px-3 py-1.5 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {t('brand.logoLetter')}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {t('brand.userName')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('brand.userRole')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
