import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Users, Award, ArrowRight, Heart } from 'lucide-react'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
import { ArticleCard } from '@/components/public/ArticleCard'
import { EventCard } from '@/components/public/EventCard'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { FormationSection } from '@/components/public/FormationSection'
import { getPublishedArticles } from '@/lib/supabase/articles'
import { getUpcomingEvents } from '@/lib/supabase/events'
import { getSiteSettings } from '@/lib/supabase/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Former des serviteurs de Dieu pour les nations — une mission ancrée dans la Parole.',
}

const formations = [
  {
    title: 'Licence en Théologie',
    description: 'Un parcours académique rigoureux de 3 ans pour approfondir les fondements de la foi chrétienne.',
    icon: BookOpen,
  },
  {
    title: "Diplôme d'Études Bibliques",
    description: "Une formation intensive d'un an centrée sur l'étude approfondie des Saintes Écritures.",
    icon: Award,
  },
  {
    title: 'Formation en Leadership',
    description: "Développez vos compétences de leader chrétien pour servir efficacement dans l'Église.",
    icon: Users,
  },
  {
    title: 'École du Dimanche',
    description: "Formation pratique pour les serviteurs du culte du dimanche et de l'enseignement biblique.",
    icon: BookOpen,
  },
]

const piliers = [
  { icon: BookOpen, label: 'Fondé sur la Parole',    desc: "Tout notre enseignement est ancré dans les Saintes Écritures, notre seule autorité absolue." },
  { icon: Users,    label: 'Communauté de foi',       desc: "Nous sommes une famille qui grandit ensemble dans la connaissance et l'amour de Dieu." },
  { icon: Award,    label: 'Excellence académique',   desc: "Nous offrons une formation rigoureuse qui allie profondeur intellectuelle et maturité spirituelle." },
  { icon: Heart,    label: 'Service aux nations',     desc: "Notre vocation est de former des serviteurs prêts à porter l'Évangile aux quatre coins du monde." },
]

const valeurs = [
  { title: 'Discipline', src: '/img/discipline.jpeg', desc: "Cultiver la rigueur intellectuelle et spirituelle, essentielle à une étude approfondie de la Parole et à une vie chrétienne structurée." },
  { title: 'Prière',     src: '/img/cheminement.jpeg', desc: "Placer la communion avec Dieu au cœur de toute démarche, reconnaissant qu'elle est la source de toute sagesse et de toute force." },
  { title: 'Fidélité',   src: '/img/croissance.jpeg', desc: "Demeurer constant dans l'engagement envers Dieu, sa Parole et l'appel reçu, quelles que soient les circonstances." },
  { title: 'Excellence', src: '/img/excellence.jpeg', desc: "Aspirer à l'excellence en toute chose, dans l'étude, le service et le témoignage, pour glorifier pleinement le nom de Christ." },
]

export default async function HomePage() {
  const [articles, events, settings] = await Promise.all([
    getPublishedArticles().catch(() => []),
    getUpcomingEvents(3).catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  const aboutContent = settings?.about_content ||
    "Le Center for Biblical Studies est une école de formation chrétienne dédiée à l'excellence académique et à la croissance spirituelle. Nous formons des serviteurs de Dieu pour les nations, ancrés dans la Parole et équipés pour servir dans l'Église locale et au-delà."

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero — animations gérées dans HeroSection */}
        <HeroSection />

        {/* ── Notre Formation ── */}
        <FormationSection />

        {/* ── Notre Histoire ── */}
        <section id="a-propos" className="bg-brand-cream py-20 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-5xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
              <AnimateIn>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">
                  Notre Histoire
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full" />
                <p className="text-brand-brown-dark/70 text-lg leading-relaxed">{aboutContent}</p>
              </AnimateIn>

              <div className="space-y-4">
                {piliers.map((item, i) => (
                  <AnimateIn key={item.label} delay={i * 0.1}>
                    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-brand-brown" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-brown mb-1">{item.label}</h3>
                        <p className="text-sm text-brand-brown-dark/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>

            {/* Notre Vision */}
            <AnimateIn className="bg-white rounded-2xl p-8 border border-brand-gold/20 shadow-sm text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Vision</h2>
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
              <p className="text-brand-brown-dark/70 leading-relaxed text-lg">
                Devenir une institution de référence en matière de formation biblique et théologique,
                produisant des diplômés qui transforment positivement leurs communautés et nations
                par la puissance de la Parole de Dieu et du Saint-Esprit.
              </p>
            </AnimateIn>

          </div>
        </section>

        {/* ── Nos Formations ── */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">
                Nos Formations
              </h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {formations.map((f, i) => (
                <AnimateIn key={f.title} delay={i * 0.1} y={40}>
                  <div className="bg-brand-cream rounded-xl p-6 border border-brand-gold/20 hover:shadow-md transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-brown rounded-xl mb-4">
                      <f.icon className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h3 className="font-serif font-bold text-brand-brown mb-2">{f.title}</h3>
                    <p className="text-sm text-brand-brown-dark/70 leading-relaxed">{f.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Événements ── */}
        <section id="evenements" className="bg-brand-cream py-20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <AnimateIn className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-2">
                  Événements à venir
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full" />
              </div>
              <Link href="/evenements" className="hidden md:flex items-center gap-2 text-brand-brown font-medium hover:text-brand-gold transition-colors">
                Voir tous <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateIn>

            {events.length === 0 ? (
              <AnimateIn>
                <p className="text-center py-16 text-brand-brown-dark/50 text-lg">Aucun événement à venir pour le moment.</p>
              </AnimateIn>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event, i) => (
                  <AnimateIn key={event.id} delay={i * 0.12} y={40}>
                    <EventCard event={event} />
                  </AnimateIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Articles ── */}
        <section id="articles" className="bg-white py-20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <AnimateIn className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-2">
                  Derniers Articles
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded-full" />
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-brand-brown font-medium hover:text-brand-gold transition-colors">
                Voir tous <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateIn>

            {articles.length === 0 ? (
              <AnimateIn>
                <p className="text-center py-16 text-brand-brown-dark/50 text-lg">Aucun article publié pour le moment.</p>
              </AnimateIn>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article, i) => (
                  <AnimateIn key={article.id} delay={i * 0.12} y={40}>
                    <ArticleCard article={article} />
                  </AnimateIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Nos Valeurs ── */}
        <section className="bg-brand-cream py-20">
          <div className="container mx-auto px-4">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">
                Nos Valeurs
              </h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full mb-4" />
              <p className="text-brand-brown-dark/70 max-w-2xl mx-auto">
                Notre formation repose sur des valeurs fondamentales qui forgent le caractère
                et équipent pour un service authentique.
              </p>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valeurs.map((v, i) => (
                <AnimateIn key={v.title} delay={i * 0.1} y={50}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={v.src} alt={v.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-brown mb-3 text-center">{v.title}</h3>
                      <p className="text-brand-brown-dark/70 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Citation biblique ── */}
        <section className="bg-brand-brown py-20">
          <div className="container mx-auto px-4 text-center">
            <AnimateIn y={20} className="max-w-2xl mx-auto">
              <p className="text-brand-gold text-6xl font-serif leading-none mb-4">&ldquo;</p>
              <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed font-medium">
                Ta parole est une lampe à mes pieds,<br />et une lumière sur mon sentier.
              </blockquote>
              <p className="text-brand-gold mt-6 font-semibold">— Psaumes 119:105</p>
            </AnimateIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
