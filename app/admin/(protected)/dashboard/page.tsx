import { FileText, Calendar, CheckCircle } from 'lucide-react'
import { StatsCard } from '@/components/admin/StatsCard'
import { getArticlesCount } from '@/lib/supabase/articles'
import { getEventsCount } from '@/lib/supabase/events'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard — Admin' }

export default async function DashboardPage() {
  const [{ total: totalArticles, published }, totalEvents] = await Promise.all([
    getArticlesCount().catch(() => ({ total: 0, published: 0 })),
    getEventsCount().catch(() => 0),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-brown">Tableau de bord</h1>
        <p className="text-brand-brown-dark/60 mt-1">Vue d&apos;ensemble de votre site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total articles"
          value={totalArticles}
          icon={FileText}
          description="Tous statuts confondus"
        />
        <StatsCard
          title="Articles publiés"
          value={published}
          icon={CheckCircle}
          variant="gold"
          description="Visibles sur le site"
        />
        <StatsCard
          title="Événements"
          value={totalEvents}
          icon={Calendar}
          description="Programmés"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-serif font-bold text-brand-brown mb-4">Accès rapides</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/blog/nouveau', label: 'Rédiger un nouvel article', icon: FileText },
              { href: '/admin/evenements/nouveau', label: 'Ajouter un événement', icon: Calendar },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-cream transition-colors text-brand-brown group"
              >
                <item.icon className="h-4 w-4 text-brand-gold" />
                <span className="text-sm font-medium group-hover:text-brand-gold transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-brand-brown rounded-xl p-6 text-white">
          <h2 className="font-serif font-bold text-brand-gold mb-3">Citation du jour</h2>
          <blockquote className="font-serif text-lg text-white/90 leading-relaxed italic">
            &ldquo;Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.&rdquo;
          </blockquote>
          <p className="text-brand-gold/80 text-sm mt-3">— Psaumes 119:105</p>
        </div>
      </div>
    </div>
  )
}
