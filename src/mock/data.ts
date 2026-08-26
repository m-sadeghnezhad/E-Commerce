import type { CategoryDataPoint, Order, RevenueDataPoint, StatMetric } from '../types'

export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 42000, target: 38000 },
  { month: 'Feb', revenue: 38500, target: 40000 },
  { month: 'Mar', revenue: 51200, target: 45000 },
  { month: 'Apr', revenue: 47800, target: 47000 },
  { month: 'May', revenue: 58900, target: 52000 },
  { month: 'Jun', revenue: 62100, target: 55000 },
  { month: 'Jul', revenue: 55400, target: 58000 },
  { month: 'Aug', revenue: 67200, target: 60000 },
  { month: 'Sep', revenue: 71800, target: 63000 },
  { month: 'Oct', revenue: 68400, target: 65000 },
  { month: 'Nov', revenue: 75600, target: 70000 },
  { month: 'Dec', revenue: 81200, target: 75000 },
]

export const categoryData: CategoryDataPoint[] = [
  { name: 'Electronics', value: 3420, color: '#6366f1' },
  { name: 'Apparel', value: 2180, color: '#8b5cf6' },
  { name: 'Home & Garden', value: 1640, color: '#06b6d4' },
  { name: 'Sports', value: 980, color: '#10b981' },
  { name: 'Books', value: 620, color: '#f59e0b' },
]

export const statMetrics: StatMetric[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$684,200',
    change: 12.5,
    trend: 'up',
    icon: 'revenue',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '24,847',
    change: 8.2,
    trend: 'up',
    icon: 'users',
  },
  {
    id: 'bounce',
    label: 'Bounce Rate',
    value: '32.4%',
    change: 3.1,
    trend: 'down',
    icon: 'bounce',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '4.8%',
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
