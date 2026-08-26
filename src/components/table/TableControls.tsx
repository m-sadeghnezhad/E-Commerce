import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { formatNumber } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface TablePaginationProps {
  totalItems: number
  page: number
  pageSize: number
  pageSizeOptions: number[]
  totalPages: number
  startIndex: number
  endIndex: number
  canGoNext: boolean
  canGoPrevious: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onNext: () => void
  onPrevious: () => void
}

function getVisiblePages(current: number, total: number): number[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)
}

export function TablePagination({
  totalItems,
  page,
  pageSize,
  pageSizeOptions,
  totalPages,
  startIndex,
  endIndex,
  canGoNext,
  canGoPrevious,
  onPageChange,
  onPageSizeChange,
  onNext,
  onPrevious,
}: TablePaginationProps) {
  const { locale, isRtl, t } = useLanguage()
  const visiblePages = getVisiblePages(page, totalPages)
  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft
  const NextIcon = isRtl ? ChevronLeft : ChevronRight

  const formatCount = (value: number) => formatNumber(value, locale)
  const rangeStart = totalItems === 0 ? 0 : startIndex + 1

  return (
    <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('orders.pagination.showing')}{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {formatCount(rangeStart)}-{formatCount(endIndex)}
          </span>{' '}
          {t('orders.pagination.of')}{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {formatCount(totalItems)}
          </span>
        </p>

        <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          {t('orders.pagination.rowsPerPage')}
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-9 rounded-lg border bg-white px-2 text-sm text-slate-900 outline-none ring-brand-500 focus:ring-2 dark:bg-slate-900 dark:text-slate-100"
            aria-label={t('orders.pagination.rowsPerPage')}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {formatCount(option)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="icon"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label={t('orders.pagination.previous')}
        >
          <PreviousIcon className="h-4 w-4" />
        </Button>

        <div className="hidden items-center gap-1 sm:flex">
          {visiblePages.map((pageNumber, index, array) => {
            const previous = array[index - 1]
            const showEllipsis = previous !== undefined && pageNumber - previous > 1

            return (
              <span key={pageNumber} className="flex items-center gap-1">
                {showEllipsis ? (
                  <span className="px-1 text-sm text-slate-400">...</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  className={cn(
                    'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors',
                    page === pageNumber
                      ? 'bg-brand-600 text-white dark:bg-brand-500'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  )}
                  aria-current={page === pageNumber ? 'page' : undefined}
                >
                  {formatCount(pageNumber)}
                </button>
              </span>
            )
          })}
        </div>

        <span className="px-2 text-sm text-slate-500 sm:hidden dark:text-slate-400">
          {formatCount(page)} / {formatCount(totalPages)}
        </span>

        <Button
          variant="secondary"
          size="icon"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label={t('orders.pagination.next')}
        >
          <NextIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface SortableHeaderProps {
  label: string
  sortKey: string
  activeKey: string | null
  direction: 'asc' | 'desc'
  onSort: (key: string) => void
  className?: string
}

export function SortableHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  className,
}: SortableHeaderProps) {
  const isActive = activeKey === sortKey

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={cn(
        'group inline-flex items-center gap-1 text-start text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
        className,
      )}
    >
      {label}
      <ChevronsUpDown
        className={cn(
          'h-3.5 w-3.5 transition-transform',
          isActive && direction === 'asc' && 'rotate-180 text-brand-600 dark:text-brand-400',
          isActive && direction === 'desc' && 'text-brand-600 dark:text-brand-400',
          !isActive && 'opacity-40 group-hover:opacity-100',
        )}
        aria-hidden="true"
      />
    </button>
  )
}
