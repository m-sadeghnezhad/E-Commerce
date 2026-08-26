import type { Locale, OrderStatus } from '../types'

const localeMap: Record<Locale, string> = {
  en: 'en-US',
  fa: 'fa-IR',
}

export function formatCurrency(value: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactNumber(value: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(localeMap[locale], {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatNumber(value: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(localeMap[locale]).format(value)
}

export function formatPercent(value: number, locale: Locale = 'en', decimals = 1): string {
  const formatted = new Intl.NumberFormat(localeMap[locale], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

  return locale === 'fa' ? `%${formatted}` : `${formatted}%`
}

export function formatDate(dateString: string, locale: Locale = 'en'): string {
  return new Intl.DateTimeFormat(localeMap[locale], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function formatStatValue(
  value: number,
  type: 'currency' | 'number' | 'percent',
  locale: Locale = 'en',
): string {
  switch (type) {
    case 'currency':
      return formatCurrency(value, locale)
    case 'percent':
      return formatPercent(value, locale)
    default:
      return formatNumber(value, locale)
  }
}

export function getStatusLabel(status: OrderStatus, t: (key: string) => string): string {
  return t(`status.${status}`)
}
