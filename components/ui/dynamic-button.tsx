import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check, Loader2, X } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-success text-success-foreground hover:bg-success/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface DynamicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  successText?: string
  successDuration?: number
  showSuccessIcon?: boolean
  showErrorIcon?: boolean
  errorText?: string
  onSuccess?: () => void
  onError?: () => void
}

const DynamicButton = React.forwardRef<HTMLButtonElement, DynamicButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText = 'Loading...',
      successText = 'Done!',
      successDuration = 2000,
      showSuccessIcon = true,
      showErrorIcon = true,
      errorText,
      onSuccess,
      onError,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    React.useEffect(() => {
      if (isLoading) {
        setState('loading')
      }
    }, [isLoading])

    React.useEffect(() => {
      if (state === 'success') {
        const timer = setTimeout(() => {
          setState('idle')
          onSuccess?.()
        }, successDuration)
        return () => clearTimeout(timer)
      }
    }, [state, successDuration, onSuccess])

    React.useEffect(() => {
      if (state === 'error') {
        const timer = setTimeout(() => {
          setState('idle')
          onError?.()
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [state, onError])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
    }

    const isDisabled = disabled || isLoading || state === 'loading' || state === 'success'

    const getButtonContent = () => {
      switch (state) {
        case 'loading':
          return (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingText}
            </>
          )
        case 'success':
          return (
            <>
              {showSuccessIcon && <Check className="mr-2 h-4 w-4" />}
              {successText}
            </>
          )
        case 'error':
          return (
            <>
              {showErrorIcon && <X className="mr-2 h-4 w-4" />}
              {errorText || 'Error'}
            </>
          )
        default:
          return children
      }
    }

    const getVariantForState = () => {
      if (state === 'success') return 'success'
      if (state === 'error') return 'destructive'
      return variant
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant: getVariantForState(), size, className }))}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {getButtonContent()}
      </Comp>
    )
  }
)

DynamicButton.displayName = 'DynamicButton'

export { DynamicButton, buttonVariants }
