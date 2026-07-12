'use client'

import * as React from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * easeOutCubic(progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

export function AnimatedNumber({
  value,
  decimals = 0,
  className,
  suffix,
}: {
  value: number
  decimals?: number
  className?: string
  suffix?: string
}) {
  const animated = useCountUp(value)
  return (
    <span className={className}>
      {animated.toFixed(decimals)}
      {suffix}
    </span>
  )
}
