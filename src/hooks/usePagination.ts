import { useCallback, useMemo, useState } from 'react'
import type { PaginationState } from '../types'

interface UsePaginationOptions {
  totalItems: number
  initialPage?: number
  initialPageSize?: number
  pageSizeOptions?: number[]
}

interface UsePaginationResult extends PaginationState {
  totalPages: number
  startIndex: number
  endIndex: number
  pageSizeOptions: number[]
  pageNumbers: number[]
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  canGoNext: boolean
  canGoPrevious: boolean
}

export function usePagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
}: UsePaginationOptions): UsePaginationResult {
  const [page, setPageState] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(Math.max(1, Math.min(nextPage, totalPages)))
    },
    [totalPages],
  )

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size)
    setPageState(1)
  }, [])

  const goToNextPage = useCallback(() => {
    setPageState((current) => Math.min(current + 1, totalPages))
  }, [totalPages])

  const goToPreviousPage = useCallback(() => {
    setPageState((current) => Math.max(current - 1, 1))
  }, [])

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  )

  return {
    page: safePage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    pageSizeOptions,
    pageNumbers,
    setPage,
    setPageSize,
    goToNextPage,
    goToPreviousPage,
    canGoNext: safePage < totalPages,
    canGoPrevious: safePage > 1,
  }
}
