'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: keyof typeof motion
}

export function AnimateIn({ children, className, delay = 0, y = 30, as = 'div' }: AnimateInProps) {
  const reduced = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (motion as any)[as] ?? motion.div

  return (
    <Tag
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
