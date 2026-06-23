import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils/formatDate'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()

  return (
    <Link href={`/evenements/${event.id}`} className="group block">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
        <div className="relative h-44 bg-brand-cream overflow-hidden">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-cream">
              <div className="text-brand-gold/30 text-6xl font-serif">✝</div>
            </div>
          )}
          <div className="absolute top-3 left-3 bg-brand-gold text-brand-brown rounded-lg px-3 py-1.5 text-center min-w-[52px] shadow-sm">
            <p className="text-xl font-bold leading-none">{day}</p>
            <p className="text-xs font-semibold">{month}</p>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-serif font-bold text-brand-brown text-lg leading-snug mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-sm text-gray-500 flex-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" />
                <span>{formatTime(event.time)}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {event.registration_url && (
            <div className="mt-4 flex items-center gap-1 text-brand-gold text-sm font-medium">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>S&apos;inscrire</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
