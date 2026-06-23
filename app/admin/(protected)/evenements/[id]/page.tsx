import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { EventForm } from '../EventForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Modifier événement — Admin' }

interface Props { params: { id: string } }

export default async function EditEvenementPage({ params }: Props) {
  const supabase = createClient()
  const { data: event } = await supabase.from('events').select('*').eq('id', params.id).single()
  if (!event) notFound()

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/evenements" className="p-2 rounded-lg hover:bg-white border border-gray-200 transition-colors">
          <ArrowLeft className="h-4 w-4 text-brand-brown" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">Modifier l&apos;événement</h1>
          <p className="text-brand-brown-dark/60 mt-1 line-clamp-1">{event.title}</p>
        </div>
      </div>
      <EventForm event={event} />
    </div>
  )
}
