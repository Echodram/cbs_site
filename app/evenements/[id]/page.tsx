import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { getEventById, getAllEvents } from '@/lib/supabase/events'
import { formatDate, formatTime } from '@/lib/utils/formatDate'
import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventById(params.id)
  if (!event) return { title: 'Événement introuvable' }
  return {
    title: event.title,
    description: event.description ?? '',
    openGraph: {
      title: event.title,
      description: event.description ?? '',
      images: event.image_url ? [event.image_url] : [],
    },
  }
}

export default async function EvenementPage({ params }: Props) {
  const event = await getEventById(params.id)
  if (!event) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-brand-cream">
        {event.image_url && (
          <div className="relative h-64 md:h-80 w-full">
            <Image src={event.image_url} alt={event.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-brand-brown/40" />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 text-brand-brown/70 hover:text-brand-brown mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux événements
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-brand-cream rounded-xl">
                <div className="bg-brand-gold/20 rounded-lg p-2">
                  <Calendar className="h-5 w-5 text-brand-brown" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-semibold text-brand-brown">{formatDate(event.date)}</p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-3 p-4 bg-brand-cream rounded-xl">
                  <div className="bg-brand-gold/20 rounded-lg p-2">
                    <Clock className="h-5 w-5 text-brand-brown" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Heure</p>
                    <p className="font-semibold text-brand-brown">{formatTime(event.time)}</p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-3 p-4 bg-brand-cream rounded-xl sm:col-span-2">
                  <div className="bg-brand-gold/20 rounded-lg p-2">
                    <MapPin className="h-5 w-5 text-brand-brown" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Lieu</p>
                    <p className="font-semibold text-brand-brown">{event.location}</p>
                  </div>
                </div>
              )}
            </div>

            {event.description && (
              <div className="prose max-w-none text-brand-brown-dark/80 mb-8">
                <p className="leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>
            )}

            {event.registration_url && (
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                S&apos;inscrire à cet événement
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
