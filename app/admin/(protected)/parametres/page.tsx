import { getSiteSettings } from '@/lib/supabase/settings'
import { ParametresForm } from './ParametresForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Paramètres — Admin' }

export default async function ParametresPage() {
  const settings = await getSiteSettings().catch(() => null)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-brown">Paramètres du site</h1>
        <p className="text-brand-brown-dark/60 mt-1">Informations générales et coordonnées</p>
      </div>
      <ParametresForm settings={settings} />
    </div>
  )
}
