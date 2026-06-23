import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { EventCard } from '@/components/public/EventCard'
import { getAllEvents } from '@/lib/supabase/events'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Événements',
  description: 'Découvrez les événements et activités du Center for Biblical Studies.',
}

export default async function EvenementsPage() {
  const events = await getAllEvents().catch(() => [])
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events.filter(e => e.date >= today)
  const past = events.filter(e => e.date < today)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-brand-brown py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Événements</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Rejoignez-nous lors de nos prochaines rencontres et activités
            </p>
          </div>
        </section>

        <section className="bg-brand-cream py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-brand-brown mb-6">
              Événements à venir
            </h2>
            {upcoming.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-brand-gold/30 text-7xl font-serif mb-4">✝</div>
                <p className="text-brand-brown-dark/50 text-xl">Aucun événement à venir pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {upcoming.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            )}

            {past.length > 0 && (
              <>
                <h2 className="font-serif text-2xl font-bold text-brand-brown mb-6 mt-12 border-t border-brand-gold/20 pt-12">
                  Événements passés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
                  {past.map(event => <EventCard key={event.id} event={event} />)}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
