import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'gold' | 'brown' | 'green' | 'gray' | 'red'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  gold:  'bg-brand-gold/20 text-brand-brown border border-brand-gold/40',
  brown: 'bg-brand-brown text-white',
  green: 'bg-green-100 text-green-800 border border-green-200',
  gray:  'bg-gray-100 text-gray-700 border border-gray-200',
  red:   'bg-red-100 text-red-800 border border-red-200',
}

export function Badge({ variant = 'gray', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
