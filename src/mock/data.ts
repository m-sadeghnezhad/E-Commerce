import type { CategoryDataPoint, Order, RevenueDataPoint, StatMetric } from '../types'

export const revenueData: RevenueDataPoint[] = [
  { monthKey: 'jan', revenue: 42000, target: 38000 },
  { monthKey: 'feb', revenue: 38500, target: 40000 },
  { monthKey: 'mar', revenue: 51200, target: 45000 },
  { monthKey: 'apr', revenue: 47800, target: 47000 },
  { monthKey: 'may', revenue: 58900, target: 52000 },
  { monthKey: 'jun', revenue: 62100, target: 55000 },
  { monthKey: 'jul', revenue: 55400, target: 58000 },
  { monthKey: 'aug', revenue: 67200, target: 60000 },
  { monthKey: 'sep', revenue: 71800, target: 63000 },
  { monthKey: 'oct', revenue: 68400, target: 65000 },
  { monthKey: 'nov', revenue: 75600, target: 70000 },
  { monthKey: 'dec', revenue: 81200, target: 75000 },
]

export const categoryData: CategoryDataPoint[] = [
  { categoryKey: 'electronics', value: 3420, color: '#6366f1' },
  { categoryKey: 'apparel', value: 2180, color: '#8b5cf6' },
  { categoryKey: 'homeGarden', value: 1640, color: '#06b6d4' },
  { categoryKey: 'sports', value: 980, color: '#10b981' },
  { categoryKey: 'books', value: 620, color: '#f59e0b' },
]

export const statMetrics: StatMetric[] = [
  {
    id: 'revenue',
    rawValue: 684200,
    valueType: 'currency',
    change: 12.5,
    trend: 'up',
    icon: 'revenue',
  },
  {
    id: 'users',
    rawValue: 24847,
    valueType: 'number',
    change: 8.2,
    trend: 'up',
    icon: 'users',
  },
  {
    id: 'bounce',
    rawValue: 32.4,
    valueType: 'percent',
    change: 3.1,
    trend: 'down',
    icon: 'bounce',
  },
  {
    id: 'conversion',
    rawValue: 4.8,
    valueType: 'percent',
    change: 1.4,
    trend: 'up',
    icon: 'conversion',
  },
]

const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
  'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
]

const lastNames = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson',
  'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark',
]

const products = [
  'Wireless Headphones', 'Smart Watch', 'Running Shoes', 'Coffee Maker',
  'Yoga Mat', 'Desk Lamp', 'Bluetooth Speaker', 'Backpack', 'Water Bottle',
  'Phone Case', 'Laptop Stand', 'Mechanical Keyboard',
]

const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

function createOrder(index: number): Order {
  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[(index * 3) % lastNames.length]
  const name = `${firstName} ${lastName}`
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@email.com`

  return {
    id: `ORD-${String(1000 + index).padStart(4, '0')}`,
    customerName: name,
    email,
    status: statuses[index % statuses.length],
    amount: Math.round(29 + ((index * 47) % 970)),
    date: new Date(2025, index % 12, (index % 28) + 1).toISOString(),
    product: products[index % products.length],
  }
}

export const orders: Order[] = Array.from({ length: 87 }, (_, index) => createOrder(index))
