import { Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { orders as initialOrders } from '../../mock/data'
import type { Order, OrderStatus, SortConfig, SortDirection } from '../../types'
import { formatCurrency, formatDate, getStatusLabel } from '../../utils/formatters'
import { StatusBadge } from '../ui/Badge'
import { Card, CardHeader } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { TableSkeleton } from '../ui/Skeleton'
import { BatchActionsBar } from './BatchActionsBar'
import { SortableHeader, TablePagination } from './TableControls'

const statusToneMap: Record<OrderStatus, 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'danger',
}

function compareValues(a: Order[keyof Order], b: Order[keyof Order], direction: SortDirection): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return direction === 'asc' ? a - b : b - a
  }

  return direction === 'asc'
    ? String(a).localeCompare(String(b))
    : String(b).localeCompare(String(a))
}

export function OrdersTable() {
  const { isLoading } = useApp()
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'date', direction: 'desc' })
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const debouncedSearch = useDebounce(searchQuery, 300)

  const filteredOrders = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    if (!query) return orders

    return orders.filter((order) => {
      const haystack = [
        order.customerName,
        order.email,
        order.status,
        order.product,
        order.id,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [orders, debouncedSearch])

  const sortedOrders = useMemo(() => {
    if (!sortConfig) return filteredOrders

    return [...filteredOrders].sort((a, b) =>
      compareValues(a[sortConfig.key], b[sortConfig.key], sortConfig.direction),
    )
  }, [filteredOrders, sortConfig])

  const pagination = usePagination({
    totalItems: sortedOrders.length,
    initialPageSize: 10,
  })

  const paginatedOrders = useMemo(
    () => sortedOrders.slice(pagination.startIndex, pagination.endIndex),
    [sortedOrders, pagination.startIndex, pagination.endIndex],
  )

  const allVisibleSelected =
    paginatedOrders.length > 0 && paginatedOrders.every((order) => selectedIds.has(order.id))

  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      const typedKey = key as keyof Order

      if (current?.key === typedKey) {
        return {
          key: typedKey,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return { key: typedKey, direction: 'asc' }
    })
  }, [])

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (allVisibleSelected) {
        paginatedOrders.forEach((order) => next.delete(order.id))
      } else {
        paginatedOrders.forEach((order) => next.add(order.id))
      }

      return next
    })
  }, [allVisibleSelected, paginatedOrders])

  const toggleSelectRow = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleDeleteSelected = useCallback(() => {
    setOrders((current) => current.filter((order) => !selectedIds.has(order.id)))
    setSelectedIds(new Set())
  }, [selectedIds])

  const handleExportSelected = useCallback(() => {
    const selectedOrders = orders.filter((order) => selectedIds.has(order.id))
    const csvHeader = 'ID,Customer,Email,Status,Amount,Date,Product'
    const csvRows = selectedOrders.map((order) =>
      [
        order.id,
        order.customerName,
        order.email,
        order.status,
        order.amount,
        order.date,
        order.product,
      ].join(','),
    )
    const blob = new Blob([[csvHeader, ...csvRows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'selected-orders.csv'
    link.click()
    URL.revokeObjectURL(url)
  }, [orders, selectedIds])

  if (isLoading) return <TableSkeleton />

  return (
    <Card padding="none">
      <div className="p-5">
        <CardHeader
          title="Orders"
          description="Search, sort, and manage customer orders with batch actions"
        />

        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                pagination.setPage(1)
              }}
              placeholder="Search by name, email, status, product, or order ID..."
              className="h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-500 transition focus:bg-white focus:ring-2 dark:bg-slate-900 dark:focus:bg-slate-950"
              aria-label="Search orders"
            />
          </div>

          <BatchActionsBar
            selectedCount={selectedIds.size}
            onDelete={handleDeleteSelected}
            onExport={handleExportSelected}
            onClear={() => setSelectedIds(new Set())}
          />
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="Try adjusting your search query or clearing filters to see more results."
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-y bg-slate-50 dark:bg-slate-900/60">
                <tr>
                  <th className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-900"
                      aria-label="Select all visible orders"
                    />
                  </th>
                  <th className="px-5 py-3">
                    <SortableHeader
                      label="Order"
                      sortKey="id"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="px-5 py-3">
                    <SortableHeader
                      label="Customer"
                      sortKey="customerName"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="hidden px-5 py-3 md:table-cell">
                    <SortableHeader
                      label="Email"
                      sortKey="email"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="px-5 py-3">
                    <SortableHeader
                      label="Status"
                      sortKey="status"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="px-5 py-3">
                    <SortableHeader
                      label="Amount"
                      sortKey="amount"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="hidden px-5 py-3 lg:table-cell">
                    <SortableHeader
                      label="Date"
                      sortKey="date"
                      activeKey={sortConfig?.key ?? null}
                      direction={sortConfig?.direction ?? 'asc'}
                      onSort={handleSort}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => {
                  const isSelected = selectedIds.has(order.id)

                  return (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(order.id)}
                          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-900"
                          aria-label={`Select order ${order.id}`}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{order.id}</p>
                          <p className="mt-0.5 text-xs text-slate-500 md:hidden dark:text-slate-400">
                            {order.product}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {order.customerName}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 md:hidden dark:text-slate-400">
                          {order.email}
                        </p>
                      </td>
                      <td className="hidden px-5 py-4 text-slate-600 md:table-cell dark:text-slate-300">
                        {order.email}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge tone={statusToneMap[order.status]}>
                          {getStatusLabel(order.status)}
                        </StatusBadge>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="hidden px-5 py-4 text-slate-600 lg:table-cell dark:text-slate-300">
                        {formatDate(order.date)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="p-5 pt-0">
            <TablePagination
              totalItems={sortedOrders.length}
              page={pagination.page}
              pageSize={pagination.pageSize}
              pageSizeOptions={pagination.pageSizeOptions}
              totalPages={pagination.totalPages}
              pageNumbers={pagination.pageNumbers}
              startIndex={pagination.startIndex}
              endIndex={pagination.endIndex}
              canGoNext={pagination.canGoNext}
              canGoPrevious={pagination.canGoPrevious}
              onPageChange={pagination.setPage}
              onPageSizeChange={pagination.setPageSize}
              onNext={pagination.goToNextPage}
              onPrevious={pagination.goToPreviousPage}
            />
          </div>
        </>
      )}
    </Card>
  )
}
