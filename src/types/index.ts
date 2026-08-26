export type Theme = 'light' | 'dark'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'manager' | 'customer'
}

export interface Order {
  id: string
  customerName: string
  email: string
  status: OrderStatus
  amount: number
  date: string
  product: string
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  target: number
}

export interface CategoryDataPoint {
  name: string
  value: number
  color: string
}

export interface StatMetric {
  id: string
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: 'revenue' | 'users' | 'bounce' | 'conversion'
}

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: keyof Order
  direction: SortDirection
}

export interface PaginationState {
  page: number
  pageSize: number
}

export type NavItem = {
  id: string
  label: string
  icon: 'dashboard' | 'orders' | 'analytics' | 'customers' | 'settings'
}

export type AppView = 'dashboard' | 'orders' | 'analytics' | 'customers' | 'settings'
