import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  variant?: 'default' | 'gold' | 'alert'
}

export function StatsCard({
  title, value, icon: Icon, description, variant = 'default'
}: StatsCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl p-6 border shadow-sm',
      variant === 'gold' && 'border-brand-gold/30 bg-brand-gold/5',
      variant === 'alert' && 'border-red-200 bg-red-50',
      variant === 'default' && 'border-gray-100',
    )}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={cn(
          'p-2 rounded-lg',
          variant === 'gold' && 'bg-brand-gold/20',
          variant === 'alert' && 'bg-red-100',
          variant === 'default' && 'bg-brand-cream',
        )}>
          <Icon className={cn(
            'h-5 w-5',
            variant === 'gold' && 'text-brand-brown',
            variant === 'alert' && 'text-red-600',
            variant === 'default' && 'text-brand-brown',
          )} />
        </div>
      </div>
      <p className="text-3xl font-bold text-brand-brown">{value}</p>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  )
}
