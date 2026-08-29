# 📊 Mohsen Admin Dashboard | داشبورد مدیریتی محسن

[English](#english) | [فارسی](#persian)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3-8884d8)

---

## <a name="english"></a>📌 English Overview

A modern, responsive, and feature-rich **Admin Dashboard** built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Designed with a strict **Mobile-First** approach, custom Teal/Cyan UI aesthetic, and seamless **Bilingual (English/Persian RTL)** support.

**Mohsen Dashboard** is a portfolio showcase demonstrating modern front-end architecture: strict TypeScript, hook-driven state management, accessible UI patterns, and internationalization without heavy third-party table or i18n libraries.

### ✨ Key Features

* 🌓 **Dark & Light Mode:** Theme switcher with persistent state in `localStorage`.
* 🌍 **Bilingual & RTL Support:** Dynamic language switcher (Persian RTL & English LTR) via header **FA / EN** toggle.
* 📱 **Mobile-First Responsive Design:** Collapsible sidebar with custom animations for mobile screens.
* 📈 **Interactive Data Visualization:** Custom area/line charts and donut charts built with `Recharts`.
* 📋 **Advanced Custom Data Table:**
  * Native React state management (`useState`, `useMemo`, `useCallback`).
  * Real-time search & debounced filtering across multiple fields.
  * Column sorting (asc/desc) and custom frontend pagination.
  * Row selection with batch delete and CSV export.
* 🎨 **Custom Teal/Blue Aesthetic:** Modern UI styling featuring gradient accents, soft cards, and custom status badges.
* ⏳ **Loading & Empty States:** Skeleton loaders and zero-result placeholders.

### 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + Vite 8 |
| **Language** | TypeScript (strict, zero `any`) |
| **Styling** | Tailwind CSS v4 (class-based dark mode) |
| **Icons** | Lucide React |
| **Charts** | Recharts 3 |
| **i18n** | Custom React Context + translation files |

### 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Badge, Card, Skeleton, EmptyState
│   ├── layout/       # Sidebar, Header, DashboardLayout
│   ├── dashboard/    # StatCards, RevenueTrendChart, CategoryBreakdownChart
│   ├── table/        # OrdersTable, BatchActionsBar, TableControls
│   └── views/        # Route-like view components
├── context/          # ThemeContext, AppContext, LanguageContext
├── hooks/            # useDebounce, usePagination
├── i18n/             # translations (en, fa)
├── types/            # TypeScript interfaces
├── mock/             # Mock chart and table data
└── utils/            # cn helper, formatters
```

### 🚀 Getting Started

#### Prerequisites

- Node.js 18+
- npm 9+

#### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:4317](http://localhost:4317) in your browser.

Use the **FA / EN** toggle in the header to switch between Persian (RTL) and English (LTR).

#### 4. Production build

```bash
npm run build
npm run preview
```

#### 5. Lint

```bash
npm run lint
```

### 🏗️ Architecture Highlights

- **LanguageContext** — manages locale, `dir`/`lang` on `<html>`, and the `t()` translation helper
- **ThemeContext** — manages dark/light mode with flash-free initialization via inline script in `index.html`
- **AppContext** — centralizes sidebar state, active navigation view, and loading simulation
- **useDebounce** — 300ms debounce for search input to avoid excessive re-filtering
- **usePagination** — memoized slice calculations with safe page bounds
- **OrdersTable** — composes `useMemo` for filter → sort → paginate pipeline and `useCallback` for action handlers
- **Charts** — isolated with `chart-ltr` to preserve axis orientation while the page layout mirrors in RTL
- **Sidebar** — logical `start-0` positioning with mobile-only slide transforms and `lg:ms-*` content offset for RTL/LTR

---

## <a name="persian"></a>📌 نمای کلی (فارسی)

یک **داشبورد مدیریتی** مدرن، واکنش‌گرا و غنی از امکانات که با **React**، **TypeScript**، **Tailwind CSS** و **Recharts** ساخته شده است. با رویکرد **Mobile-First**، ظاهر Teal/Cyan سفارشی و پشتیبانی روان **دو زبانه (انگلیسی / فارسی RTL)** طراحی شده است.

**داشبورد محسن** نمونه‌ای از معماری فرانت‌اند مدرن است: TypeScript سخت‌گیرانه، مدیریت state با React Hooks، الگوهای UI در دسترس، و چندزبانگی بدون کتابخانه‌های سنگین.

### ✨ ویژگی‌های کلیدی

* 🌓 **حالت تاریک و روشن:** تغییر تم با ذخیره‌سازی در `localStorage`.
* 🌍 **پشتیبانی دو زبانه و RTL:** سوئیچ زبان فارسی (راست‌به‌چپ) و انگلیسی (چپ‌به‌راست) با دکمه **FA / EN**.
* 📱 **طراحی واکنش‌گرا Mobile-First:** نوار کناری جمع‌شونده با انیمیشن سفارشی برای موبایل.
* 📈 **نمودارهای تعاملی:** نمودار خط/ناحیه و دونات سفارشی با `Recharts`.
* 📋 **جدول داده پیشرفته:**
  * مدیریت state بومی React (`useState`, `useMemo`, `useCallback`).
  * جستجوی بلادرنگ و فیلتر debounce شده روی چند فیلد.
  * مرتب‌سازی ستون‌ها (صعودی/نزولی) و صفحه‌بندی سفارشی.
  * انتخاب سطرها با حذف گروهی و خروجی CSV.
* 🎨 **ظاهر Teal/Blue سفارشی:** دکمه‌ها، کارت‌ها و badge وضعیت مدرن.
* ⏳ **حالت بارگذاری و خالی:** Skeleton loader و placeholder برای نتایج خالی.

### 🛠️ تکنولوژی‌ها

| بخش | تکنولوژی |
|-----|----------|
| **فریم‌ورک** | React 19 + Vite 8 |
| **زبان** | TypeScript |
| **استایل** | Tailwind CSS v4 |
| **آیکون‌ها** | Lucide React |
| **نمودارها** | Recharts 3 |
| **چندزبانگی** | React Context + فایل ترجمه |

### 🚀 راه‌اندازی

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
npm run dev
```

سپس [http://localhost:4317](http://localhost:4317) را در مرورگر باز کنید.

---

## Author | نویسنده

**Mohsen | محسن** — Admin dashboard portfolio project.

## License | مجوز

MIT
