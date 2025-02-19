import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  systemTheme: Theme | undefined
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setSystemTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      systemTheme: undefined,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setSystemTheme: (theme) => set({ systemTheme: theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
) 