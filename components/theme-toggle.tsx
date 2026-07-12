'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors',
        isDark ? 'bg-primary/20' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'pointer-events-none flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-transform',
          isDark ? 'translate-x-6' : 'translate-x-0.5',
        )}
      >
        {isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
      </span>
    </button>
  )
}
