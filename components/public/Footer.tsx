import Link from 'next/link'
import { BookOpen, MapPin, Phone, Mail, Share2, Play } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-gold rounded-lg p-2">
                <BookOpen className="h-5 w-5 text-brand-brown" />
              </div>
              <div>
                <p className="font-serif font-bold text-lg leading-tight">Center for Biblical</p>
                <p className="text-brand-gold text-xs">Studies</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Former des serviteurs de Dieu pour les nations — une mission ancrée dans la Parole.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/blog', label: 'Blog' },
                { href: '/evenements', label: 'Événements' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-brand-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Contact</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-gold mt-0.5 flex-shrink-0" />
                <span>123 Rue de la Lumière, Ville, Pays</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-gold flex-shrink-0" />
                <span>+00 000 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-gold flex-shrink-0" />
                <span>contact@cbs.org</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors">
                <Play className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Center for Biblical Studies. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
