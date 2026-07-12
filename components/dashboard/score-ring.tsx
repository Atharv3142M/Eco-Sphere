'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from './animated-number'

interface ScoreRingProps {
  value: number
  size?: number
  strokeWidth?: number
  /** css color for the progress arc, e.g. var(--env) */
  color?: string
  decimals?: number
  label?: string
  className?: string
  children?: React.ReactNode
}

export function ScoreRing({
  value,
  size = 120,
  strokeWidth = 10,
  color = 'var(--primary)',
  decimals = 0,
  label,
  className,
  children,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const pct = Math.max(0, Math.min(100, value)) / 100
  const offset = circumference * (1 - (mounted ? pct : 0))

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ?? (
          <>
            <AnimatedNumber
              value={value}
              decimals={decimals}
              className="font-numeric text-2xl font-bold tabular-nums"
            />
            {label && (
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}
