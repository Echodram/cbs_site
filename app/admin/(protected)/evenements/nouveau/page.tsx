import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { EventForm } from '../EventForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nouvel événement — Admin' }

export default function NouvelEvenementPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/evenements" className="p-2 rounded-lg hover:bg-white border border-gray-200 transition-colors">
          <ArrowLeft className="h-4 w-4 text-brand-brown" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">Nouvel événement</h1>
        </div>
      </div>
      <EventForm />
    </div>
  )
}
