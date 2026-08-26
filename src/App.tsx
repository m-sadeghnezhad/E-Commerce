import { useApp } from './context/AppContext'
import { AppProvider } from './context/AppContext'
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
        return (
          <PlaceholderView
            title="Customers"
            description="Customer profiles, segments, and lifecycle insights would live here in a full production build."
          />
        )
      case 'settings':
        return (
          <PlaceholderView
            title="Settings"
            description="Workspace preferences, team permissions, and integrations would be configured here."
          />
        )
      default:
        return <DashboardView />
    }
  }

  return <DashboardLayout>{renderView()}</DashboardLayout>
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
