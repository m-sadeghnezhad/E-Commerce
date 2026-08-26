import { useApp } from './context/AppContext'
import { AppProvider } from './context/AppContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardLayout } from './components/layout/DashboardLayout'
import {
  AnalyticsView,
  DashboardView,
  OrdersView,
  PlaceholderView,
} from './components/views/AppViews'

function AppContent() {
  const { activeView } = useApp()

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />
      case 'orders':
        return <OrdersView />
      case 'analytics':
        return <AnalyticsView />
      case 'customers':
        return <PlaceholderView view="customers" />
      case 'settings':
        return <PlaceholderView view="settings" />
      default:
        return <DashboardView />
    }
  }

  return <DashboardLayout>{renderView()}</DashboardLayout>
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
