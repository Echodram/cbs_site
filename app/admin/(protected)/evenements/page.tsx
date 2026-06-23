import Link from 'next/link'
import { Plus, Calendar } from 'lucide-react'
import { getAllEventsAdmin } from '@/lib/supabase/events'
import { EventsTable } from './EventsTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Événements — Admin' }

export default async function AdminEvenementsPage() {
  const events = await getAllEventsAdmin().catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">Événements</h1>
          <p className="text-brand-brown-dark/60 mt-1">{events.length} événement{events.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/evenements/nouveau"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-semibold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Nouvel événement
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="text-brand-gold/30 text-6xl mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <p className="text-brand-brown-dark/50 text-lg mb-4">Aucun événement pour l&apos;instant</p>
          <Link
            href="/admin/evenements/nouveau"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-semibold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Créer le premier événement
          </Link>
        </div>
      ) : (
        <EventsTable events={events} />
      )}
    </div>
  )
}
