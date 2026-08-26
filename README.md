# Nexus Admin Dashboard

A production-ready admin dashboard showcase built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Designed mobile-first with responsive layout, dark mode, interactive analytics, and a custom data table powered entirely by React hooks.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3-8884d8)

## Features

### Layout & UX
- **Mobile-first responsive design** with collapsible sidebar and backdrop overlay
- **Desktop sidebar collapse** for compact navigation
- **Dark / light mode** with React Context and `localStorage` persistence
- **Skeleton loaders** simulating initial data fetch
- **Empty states** for zero-result search queries

### Analytics Dashboard
- **KPI stat cards** with trend badges (revenue, users, bounce rate, conversion)
- **Revenue trend chart** — area + line combo with custom tooltips
- **Category breakdown chart** — interactive donut chart with legend sync

### Custom Data Table
Built with native HTML table elements and Tailwind — no heavy table libraries:
- Debounced global search across multiple fields
- Multi-column sorting (asc/desc toggle)
- Custom pagination with page numbers and rows-per-page selector
- Row selection with batch delete and CSV export

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 8 |
| Language | TypeScript (strict, zero `any`) |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| Charts | Recharts 3 |
| Icons | lucide-react |

## Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Badge, Card, Skeleton, EmptyState
│   ├── layout/       # Sidebar, Header, DashboardLayout
│   ├── dashboard/    # StatCards, RevenueTrendChart, CategoryBreakdownChart
│   ├── table/        # OrdersTable, BatchActionsBar, TableControls
│   └── views/        # Route-like view components
├── context/          # ThemeContext, AppContext
├── hooks/            # useDebounce, usePagination
├── types/            # TypeScript interfaces
├── mock/             # Mock chart and table data
└── utils/            # cn helper, formatters
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4317](http://localhost:4317) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Architecture Highlights

- **ThemeContext** — manages dark/light mode with flash-free initialization via inline script in `index.html`
- **AppContext** — centralizes sidebar state, active navigation view, and loading simulation
- **useDebounce** — 300ms debounce for search input to avoid excessive re-filtering
- **usePagination** — memoized slice calculations with safe page bounds
- **OrdersTable** — composes `useMemo` for filter → sort → paginate pipeline and `useCallback` for action handlers

## License

MIT
