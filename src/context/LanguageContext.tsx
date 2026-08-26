import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translate, type TranslationParams } from '../i18n/translations'
import type { Locale } from '../types'

const STORAGE_KEY = 'mohsen-locale'

interface LanguageContextValue {
  locale: Locale
  isRtl: boolean
  direction: 'ltr' | 'rtl'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string, params?: TranslationParams) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'fa') return stored

  return 'en'
}

function applyDocumentLocale(locale: Locale): void {
  const direction = locale === 'fa' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
  document.documentElement.dir = direction
  document.body.classList.toggle('font-persian', locale === 'fa')
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    applyDocumentLocale(locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'en' ? 'fa' : 'en'))
  }, [])

  const t = useCallback(
    (key: string, params?: TranslationParams) => translate(locale, key, params),
    [locale],
  )

  const value = useMemo(
    (): LanguageContextValue => ({
      locale,
      isRtl: locale === 'fa',
      direction: locale === 'fa' ? 'rtl' : 'ltr',
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, toggleLocale, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
