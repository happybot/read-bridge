'use client'

import { Button } from 'antd'
import { useThemeStore } from '../../store/useThemeStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      type="text"
      onClick={toggleTheme}
      className="fixed right-4 top-4"
    >
      123
    </Button>
  )
} 