'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Calendar,
  Settings, BookOpen, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Articles', icon: FileText },
  { href: '/admin/evenements', label: 'Événements', icon: Calendar },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  return (
    <aside className={cn(
      'bg-brand-brown text-white flex flex-col transition-all duration-300 h-screen sticky top-0',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-brand-gold rounded-lg p-1.5">
              <BookOpen className="h-4 w-4 text-brand-brown" />
            </div>
            <span className="font-serif font-bold text-sm">Admin CBS</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm',
                active
                  ? 'bg-brand-gold text-brand-brown font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm w-full"
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
