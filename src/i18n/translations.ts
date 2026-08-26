import type { Locale } from '../types'

const en = {
  brand: {
    name: 'Mohsen',
    dashboard: 'Mohsen Dashboard',
    subtitle: 'Admin Panel',
    logoLetter: 'M',
    userName: 'Mohsen',
    userRole: 'Admin',
  },
  nav: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    analytics: 'Analytics',
    customers: 'Customers',
    settings: 'Settings',
    collapse: 'Collapse',
  },
  header: {
    welcome: "Welcome back. Here's what's happening today.",
    quickSearch: 'Quick search...',
    openSidebar: 'Open sidebar',
    closeSidebar: 'Close sidebar',
    expandSidebar: 'Expand sidebar',
    collapseSidebar: 'Collapse sidebar',
    notifications: 'Notifications',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    switchToEnglish: 'Switch to English',
    switchToPersian: 'Switch to Persian',
    back: 'Back',
  },
  stats: {
    totalRevenue: 'Total Revenue',
    activeUsers: 'Active Users',
    bounceRate: 'Bounce Rate',
    conversionRate: 'Conversion Rate',
  },
  charts: {
    revenueTrend: 'Revenue Trend',
    revenueTrendDesc: 'Monthly revenue performance against target goals',
    revenue: 'Revenue',
    target: 'Target',
    salesByCategory: 'Sales by Category',
    salesByCategoryDesc: 'Product distribution across top categories',
    unitsSold: 'units sold',
  },
  months: {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
  },
  categories: {
    electronics: 'Electronics',
    apparel: 'Apparel',
    homeGarden: 'Home & Garden',
    sports: 'Sports',
    books: 'Books',
  },
  orders: {
    title: 'Orders',
    description: 'Search, sort, and manage customer orders with batch actions',
    searchPlaceholder: 'Search by name, email, status, product, or order ID...',
    searchLabel: 'Search orders',
    noResultsTitle: 'No orders found',
    noResultsDesc: 'Try adjusting your search query or clearing filters to see more results.',
    selectAll: 'Select all orders on this page',
    selectOrder: 'Select order {id}',
    columns: {
      order: 'Order',
      customer: 'Customer',
      email: 'Email',
      status: 'Status',
      amount: 'Amount',
      date: 'Date',
    },
    batch: {
      selectedOne: '{count} order selected',
      selectedMany: '{count} orders selected',
      export: 'Export Selected',
      delete: 'Delete Selected',
      clear: 'Clear',
      clearLabel: 'Clear selection',
    },
    pagination: {
      showing: 'Showing',
      of: 'of',
      rowsPerPage: 'Rows per page',
      previous: 'Previous page',
      next: 'Next page',
    },
    csvFileName: 'selected-orders.csv',
  },
  status: {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  },
  placeholders: {
    customers: {
      title: 'Customers',
      description:
        'Customer profiles, segments, and lifecycle insights would live here in a full production build.',
    },
    settings: {
      title: 'Settings',
      description:
        'Workspace preferences, team permissions, and integrations would be configured here.',
    },
  },
} as const

const fa = {
  brand: {
    name: 'محسن',
    dashboard: 'داشبورد محسن',
    subtitle: 'پنل مدیریت',
    logoLetter: 'م',
    userName: 'محسن',
    userRole: 'مدیر',
  },
  nav: {
    dashboard: 'داشبورد',
    orders: 'سفارش‌ها',
    analytics: 'تحلیل‌ها',
    customers: 'مشتریان',
    settings: 'تنظیمات',
    collapse: 'جمع کردن',
  },
  header: {
    welcome: 'خوش آمدید. اینجا خلاصه وضعیت امروز را می‌بینید.',
    quickSearch: 'جستجوی سریع...',
    openSidebar: 'باز کردن منو',
    closeSidebar: 'بستن منو',
    expandSidebar: 'باز کردن نوار کناری',
    collapseSidebar: 'جمع کردن نوار کناری',
    notifications: 'اعلان‌ها',
    switchToLight: 'تغییر به حالت روشن',
    switchToDark: 'تغییر به حالت تاریک',
    switchToEnglish: 'تغییر به انگلیسی',
    switchToPersian: 'تغییر به فارسی',
    back: 'بازگشت',
  },
  stats: {
    totalRevenue: 'درآمد کل',
    activeUsers: 'کاربران فعال',
    bounceRate: 'نرخ پرش',
    conversionRate: 'نرخ تبدیل',
  },
  charts: {
    revenueTrend: 'روند درآمد',
    revenueTrendDesc: 'عملکرد درآمد ماهانه در مقایسه با اهداف',
    revenue: 'درآمد',
    target: 'هدف',
    salesByCategory: 'فروش بر اساس دسته',
    salesByCategoryDesc: 'توزیع فروش محصولات در دسته‌های اصلی',
    unitsSold: 'واحد فروخته‌شده',
  },
  months: {
    jan: 'فروردین',
    feb: 'اردیبهشت',
    mar: 'خرداد',
    apr: 'تیر',
    may: 'مرداد',
    jun: 'شهریور',
    jul: 'مهر',
    aug: 'آبان',
    sep: 'آذر',
    oct: 'دی',
    nov: 'بهمن',
    dec: 'اسفند',
  },
  categories: {
    electronics: 'الکترونیک',
    apparel: 'پوشاک',
    homeGarden: 'خانه و باغ',
    sports: 'ورزشی',
    books: 'کتاب',
  },
  orders: {
    title: 'سفارش‌ها',
    description: 'جستجو، مرتب‌سازی و مدیریت سفارش‌ها با عملیات گروهی',
    searchPlaceholder: 'جستجو بر اساس نام، ایمیل، وضعیت، محصول یا شماره سفارش...',
    searchLabel: 'جستجوی سفارش‌ها',
    noResultsTitle: 'سفارشی یافت نشد',
    noResultsDesc: 'عبارت جستجو را تغییر دهید یا فیلترها را پاک کنید.',
    selectAll: 'انتخاب همه سفارش‌های این صفحه',
    selectOrder: 'انتخاب سفارش {id}',
    columns: {
      order: 'سفارش',
      customer: 'مشتری',
      email: 'ایمیل',
      status: 'وضعیت',
      amount: 'مبلغ',
      date: 'تاریخ',
    },
    batch: {
      selectedOne: '{count} سفارش انتخاب شده',
      selectedMany: '{count} سفارش انتخاب شده',
      export: 'خروجی انتخاب‌شده‌ها',
      delete: 'حذف انتخاب‌شده‌ها',
      clear: 'پاک کردن',
      clearLabel: 'پاک کردن انتخاب',
    },
    pagination: {
      showing: 'نمایش',
      of: 'از',
      rowsPerPage: 'ردیف در صفحه',
      previous: 'صفحه قبل',
      next: 'صفحه بعد',
    },
    csvFileName: 'selected-orders.csv',
  },
  status: {
    pending: 'در انتظار',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل شده',
    cancelled: 'لغو شده',
  },
  placeholders: {
    customers: {
      title: 'مشتریان',
      description:
        'پروفایل مشتریان، بخش‌بندی و بینش چرخه عمر مشتری در نسخه کامل اینجا قرار می‌گیرد.',
    },
    settings: {
      title: 'تنظیمات',
      description: 'ترجیحات workspace، دسترسی تیم و یکپارچه‌سازی‌ها اینجا پیکربندی می‌شوند.',
    },
  },
} as const

export type TranslationTree = {
  brand: {
    name: string
    dashboard: string
    subtitle: string
    logoLetter: string
    userName: string
    userRole: string
  }
  nav: Record<string, string>
  header: Record<string, string>
  stats: Record<string, string>
  charts: Record<string, string>
  months: Record<string, string>
  categories: Record<string, string>
  orders: {
    title: string
    description: string
    searchPlaceholder: string
    searchLabel: string
    noResultsTitle: string
    noResultsDesc: string
    selectAll: string
    selectOrder: string
    columns: Record<string, string>
    batch: Record<string, string>
    pagination: Record<string, string>
    csvFileName: string
  }
  status: Record<string, string>
  placeholders: Record<string, { title: string; description: string }>
}

export const translations: Record<Locale, TranslationTree> = { en, fa }

export type TranslationParams = Record<string, string | number>

function getNestedValue(tree: TranslationTree, path: string): string | undefined {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, tree) as string | undefined
}

export function translate(
  locale: Locale,
  key: string,
  params?: TranslationParams,
): string {
  const template = getNestedValue(translations[locale], key) ?? getNestedValue(translations.en, key) ?? key

  if (!params) return template

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) => result.replace(`{${paramKey}}`, String(paramValue)),
    template,
  )
}
