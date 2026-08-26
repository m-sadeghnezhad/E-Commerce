import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppView } from '../types'

interface AppContextValue {
  activeView: AppView
  setActiveView: (view: AppView) => void
  isSidebarOpen: boolean
  isSidebarCollapsed: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  toggleSidebarCollapse: () => void
  isLoading: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<AppView>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial data fetch for skeleton loaders
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setIsSidebarOpen((open) => !open), [])
  const toggleSidebarCollapse = useCallback(
    () => setIsSidebarCollapsed((collapsed) => !collapsed),
    [],
  )

  const value = useMemo(
    () => ({
      activeView,
      setActiveView,
      isSidebarOpen,
      isSidebarCollapsed,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      toggleSidebarCollapse,
      isLoading,
    }),
    [
      activeView,
      isSidebarOpen,
      isSidebarCollapsed,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      toggleSidebarCollapse,
      isLoading,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
