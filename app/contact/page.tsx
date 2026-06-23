import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { ContactForm } from './ContactForm'
import { getSiteSettings } from '@/lib/supabase/settings'
import { MapPin, Phone, Mail, Share2, Play } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez l'Center for Biblical Studies.",
}

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-brand-brown py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Contact</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Nous sommes à votre écoute — n&apos;hésitez pas à nous écrire
            </p>
          </div>
        </section>

        <section className="bg-brand-cream py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-brown mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-brown mb-6">
                  Nos coordonnées
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: 'Adresse', value: settings?.address || '123 Rue de la Lumière, Ville, Pays' },
                    { icon: Phone, label: 'Téléphone', value: settings?.phone || '+00 000 000 0000' },
                    { icon: Mail, label: 'Email', value: settings?.email || 'contact@cbs.org' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-brand-brown" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                        <p className="font-medium text-brand-brown">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-400 mb-3">Réseaux sociaux</p>
                  <div className="flex gap-3">
                    {settings?.facebook && (
                      <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-brown hover:text-brand-gold transition-colors text-sm font-medium">
                        <Share2 className="h-4 w-4" /> Facebook
                      </a>
                    )}
                    {settings?.youtube && (
                      <a href={settings.youtube} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-brown hover:text-brand-gold transition-colors text-sm font-medium">
                        <Play className="h-4 w-4" /> YouTube
                      </a>
                    )}
                    {!settings?.facebook && !settings?.youtube && (
                      <p className="text-sm text-gray-400">Bientôt disponible</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
