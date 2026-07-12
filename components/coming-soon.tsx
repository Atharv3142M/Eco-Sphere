import { Hammer } from 'lucide-react'

export function ComingSoon({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Hammer className="size-7" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {description ??
            'This module is part of a later phase of the EcoSphere build. The navigation and layout are ready — the full experience is coming soon.'}
        </p>
      </div>
    </div>
  )
}
