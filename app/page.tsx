import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Users, Award, ArrowRight, Heart, Globe, Moon, UserCheck, HeartHandshake } from 'lucide-react'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
import { ArticleCard } from '@/components/public/ArticleCard'
import { EventCard } from '@/components/public/EventCard'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { getPublishedArticles } from '@/lib/supabase/articles'
import { getUpcomingEvents } from '@/lib/supabase/events'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Former des serviteurs de Dieu pour les nations — une mission ancrée dans la Parole.',
}

const piliers = [
  { icon: BookOpen, label: 'Fondé sur la Parole',  desc: "Tout notre enseignement est ancré dans les Saintes Écritures, notre seule autorité absolue." },
  { icon: Users,    label: 'Communauté de foi',     desc: "Nous sommes une famille qui grandit ensemble dans la connaissance et l'amour de Dieu." },
  { icon: Award,    label: 'Excellence académique', desc: "Nous offrons une formation rigoureuse qui allie profondeur intellectuelle et maturité spirituelle." },
  { icon: Heart,    label: 'Service aux nations',   desc: "Notre vocation est de former des serviteurs prêts à porter l'Évangile aux quatre coins du monde." },
]

const valeurs = [
  { title: 'Discipline', src: '/images/discipline.jpg',   desc: "Cultiver la rigueur intellectuelle et spirituelle, essentielle à une étude approfondie de la Parole et à une vie chrétienne structurée." },
  { title: 'Prière',     src: '/images/priere.jpg',        desc: "Placer la communion avec Dieu au cœur de toute démarche, reconnaissant qu'elle est la source de toute sagesse et de toute force." },
  { title: 'Fidélité',   src: '/images/fidelite.jpg',      desc: "Demeurer constant dans l'engagement envers Dieu, sa Parole et l'appel reçu, quelles que soient les circonstances." },
  { title: 'Excellence', src: '/images/excellence.jpeg',   desc: "Aspirer à l'excellence en toute chose, dans l'étude, le service et le témoignage, pour glorifier pleinement le nom de Christ." },
]

export default async function HomePage() {
  const [articles, events] = await Promise.all([
    getPublishedArticles().catch(() => []),
    getUpcomingEvents(3).catch(() => []),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* 1 ── Hero */}
        <HeroSection />

        {/* 3 ── Notre Histoire */}
        <section id="a-propos" className="bg-brand-cream py-20 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <AnimateIn>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">
                  Notre Histoire
                </h2>
                <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full" />
                <p className="text-brand-brown-dark/70 text-base leading-relaxed text-justify mb-8">
                  Née d&apos;une vision missionnaire, le Centre pour Études Bibliques s&apos;est
                  développé depuis 1999 pour former des serviteurs de Dieu ancrés dans les
                  Écritures. Retracez les grandes étapes qui ont façonné notre institution.
                </p>
                <ol className="space-y-6">
                  {[
                    {
                      location: 'BAMENDA', year: '1999',
                      text: "Fondation par des missionnaires américains venus de Guinée Équatoriale, conduits par le Révérend Craig. Affiliation immédiate au Seattle Bible College (Washington, USA).",
                    },
                    {
                      location: 'BAFOUSSAM', year: '2003',
                      text: "Extension à la région de l'Ouest sous la supervision du Révérend Richard Collingridge. Plus de 400 étudiants formés depuis cette date.",
                    },
                    {
                      location: 'YAOUNDÉ, MBOUDA', year: "AUJOURD'HUI",
                      text: "CBS s'étend davantage avec de nouveaux campus pour former la prochaine génération de serviteurs de Dieu.",
                    },
                  ].map((item) => (
                    <li key={item.year}>
                      <p className="text-[0.65rem] font-extrabold tracking-[0.18em] text-brand-gold uppercase mb-1">
                        {item.location} &middot; {item.year}
                      </p>
                      <p className="text-brand-brown-dark/70 text-sm leading-relaxed text-justify">{item.text}</p>
                    </li>
                  ))}
                </ol>
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
                        <p className="text-sm text-brand-brown-dark/60 leading-relaxed text-justify">{item.desc}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3b ── Chiffres d'impact */}
        <section className="bg-brand-cream py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '+400', label: 'Diplômés formés' },
                { value: '25',   label: "Ans d'existence" },
                { value: '3',    label: 'Campus actifs' },
              ].map((stat, i) => (
                <AnimateIn key={stat.label} delay={i * 0.1}>
                  <div className="bg-brand-brown rounded-2xl p-6 text-center shadow-md">
                    <p className="font-serif text-4xl md:text-5xl font-bold text-brand-gold mb-2">{stat.value}</p>
                    <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase">{stat.label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4 ── Mot du Directeur */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Photo + identité */}
              <AnimateIn className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                  <Image
                    src="/images/bilog.png"
                    alt="Pasteur Bilog Theophile"
                    fill
                    className="object-cover rounded-full border-4 border-brand-gold shadow-lg"
                  />
                </div>
                <h3 className="font-bold text-brand-brown text-xl mb-1">Pasteur Bilog Theophile</h3>
                <p className="text-brand-gold text-sm font-medium mb-6">Directeur de CBS</p>

                {/* Citation encadrée */}
                <blockquote className="bg-brand-cream rounded-2xl p-6 border-l-4 border-brand-gold text-left shadow-sm">
                  <p className="text-brand-gold text-3xl font-serif leading-none mb-2">&ldquo;</p>
                  <p className="text-brand-brown-dark/80 text-sm leading-relaxed text-justify italic">
                    Notre ambition n&apos;est pas de former des théologiens en chambre, mais des
                    hommes et des femmes ancrés dans la Parole, prêts à servir là où Dieu les
                    envoie — dans leur famille, leur église, leur nation.
                  </p>
                  <p className="text-brand-gold text-3xl font-serif leading-none text-right mt-2">&rdquo;</p>
                </blockquote>
              </AnimateIn>

              {/* Qui peut nous rejoindre */}
              <AnimateIn>
                <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">Qui peut nous rejoindre ?</h3>
                <div className="w-10 h-1 bg-brand-gold rounded-full mb-6" />
                <p className="text-brand-brown-dark/70 text-sm leading-relaxed text-justify mb-4">
                  Le CBS est ouvert à toute personne désireuse de grandir dans la connaissance
                  de la Parole de Dieu, quel que soit son niveau d&apos;études ou son parcours
                  ecclésiastique. Que vous soyez pasteur, évangéliste, enseignant, parent ou
                  simplement un croyant en quête de croissance spirituelle, vous avez votre
                  place ici.
                </p>
                <p className="text-brand-brown-dark/70 text-sm leading-relaxed text-justify mb-6">
                  Nos programmes sont conçus pour s&apos;adapter à votre rythme de vie tout en
                  vous offrant une formation sérieuse, reconnue et transformatrice.
                </p>
                <ul className="space-y-3">
                  {[
                    "Membres d'Église souhaitant approfondir leur foi",
                    "Serviteurs en activité cherchant une formation solide",
                    "Jeunes répondant à un appel au ministère",
                    "Leaders désireux d'être mieux équipés pour leur communauté",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-brown-dark/70">
                      <span className="mt-1.5 w-2 h-2 rounded-sm bg-brand-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* 5 ── Notre Formation */}
        <section id="formation" className="bg-brand-cream py-20 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">Notre Formation</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
              <p className="text-brand-brown-dark/70 max-w-2xl mx-auto text-justify">
                Un programme de <strong className="text-brand-brown">3 ans</strong> sanctionné
                par une <strong className="text-brand-brown">Licence reconnue par le Seattle Bible College</strong> (Washington, USA),
                alliant rigueur académique et croissance spirituelle pour équiper des serviteurs
                prêts à impacter leurs nations.
              </p>
            </AnimateIn>

            {/* Nos Campus */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <AnimateIn className="relative h-72 rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/campus.png" alt="Nos campus" fill className="object-cover" />
                <div className="absolute inset-0 bg-brand-brown/55" />
              </AnimateIn>
              <AnimateIn>
                <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">Nos Campus</h3>
                <p className="text-brand-brown-dark/70 leading-relaxed mb-4 text-justify">
                  Une formation biblique à portée de main. Le Centre d&apos;Études Bibliques étend
                  sa présence pour être plus proche de vous. Nos programmes sont accessibles à
                  <strong className="text-brand-brown"> Yaoundé</strong>,
                  <strong className="text-brand-brown"> Bafoussam</strong> et
                  <strong className="text-brand-brown"> Mbouda</strong>.
                </p>
                <p className="text-brand-brown-dark/70 leading-relaxed text-justify">
                  Rejoignez le CBS et inscrivez-vous dès maintenant dans l&apos;une de nos
                  directions. Le chemin vers une connaissance approfondie de la Bible n&apos;a
                  jamais été aussi accessible.
                </p>
              </AnimateIn>
            </div>

            {/* Nos Modules */}
            <AnimateIn>
              <h3 className="font-serif text-2xl font-bold text-brand-brown mb-6 text-center">Nos Modules</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Méthodes d'étude de la Bible et règles d'interprétation",
                    desc: "Former les étudiants à manier correctement la Parole de Dieu.",
                  },
                  {
                    title: "Étude de l'Ancien Testament",
                    desc: "Vue d'ensemble de l'Ancien Testament, mettant l'accent sur la structure, les thématiques, les acteurs et le message.",
                  },
                  {
                    title: "Étude du Nouveau Testament",
                    desc: "Vue d'ensemble du Nouveau Testament, se concentrant sur le thème, l'objectif, la structure et le contenu de chaque livre.",
                  },
                  {
                    title: "Prédication de messages bibliques, ministère pastoral et éthique chrétienne",
                    desc: "Former les pasteurs avec les connaissances et les compétences nécessaires pour communiquer des messages expositifs.",
                  },
                ].map((module, i) => (
                  <div key={i} className="flex gap-4 bg-white rounded-xl p-5 border border-brand-gold/20 shadow-sm">
                    <div className="flex-shrink-0 w-9 h-9 bg-brand-gold/20 rounded-lg flex items-center justify-center text-brand-brown font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-brown text-sm mb-2">{module.title}</h4>
                      <p className="text-brand-brown-dark/70 text-xs leading-relaxed text-justify">{module.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Pourquoi choisir le CBS ? ── */}
        <section className="bg-brand-cream py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">Pourquoi choisir le CBS ?</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: Globe,
                  title: 'Inter-dénominationnel',
                  desc: "Nos portes sont ouvertes à tout chrétien, quelle que soit son Église ou sa confession.",
                },
                {
                  icon: Moon,
                  title: 'Cours du soir',
                  desc: "Nos sessions sont organisées en soirée, permettant à chaque étudiant de poursuivre ses activités professionnelles ou familiales en journée.",
                },
                {
                  icon: UserCheck,
                  title: 'Accompagnement personnalisé',
                  desc: "Chaque étudiant en difficulté bénéficie d'un suivi individuel attentif pour ne laisser personne derrière.",
                },
                {
                  icon: HeartHandshake,
                  title: 'Enseignants disponibles',
                  desc: "Notre corps enseignant reste accessible et à l'écoute, au-delà des heures de cours.",
                },
              ].map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.1}>
                  <div className="flex gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-brand-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-brown text-base mb-1">{item.title}</h3>
                      <p className="text-sm text-brand-brown-dark/60 leading-relaxed text-justify">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6 ── Notre Équipe Pédagogique */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">Notre Équipe Pédagogique</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full mb-4" />
              <p className="text-brand-brown-dark/70 max-w-2xl mx-auto text-justify">
                Notre équipe distinguée cumule des décennies d&apos;expérience en ministère, recherche
                et enseignement, engagée à accompagner la prochaine génération de leaders chrétiens.
              </p>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Pasteur Godwe Lourna',
                  role: "Enseignant de CBS",
                  bio: "Godwe Lourna, ancien étudiant, devenu pasteur et enseignant passionné de théologie grâce à une rencontre avec Christ et une dévotion à l'étude.",
                  image: '/images/godwe.png',
                },
                {
                  name: 'Pasteur Bilog Theophile',
                  role: "Directeur de CBS",
                  bio: "Théophile Bilog a vu sa vie changer en 1995 grâce à sa foi et à l'engagement de son épouse, le menant à diriger une école biblique.",
                  image: '/images/bilog.png',
                },
                {
                  name: 'Pasteur Donaldson Assontia',
                  role: 'Enseignant de CBS',
                  bio: "Le Pasteur Donaldson croit que la sincérité d'un cœur peut transformer et équiper pour le service, avec une foi née dans son adolescence.",
                  image: '/images/donaldson.png',
                },
              ].map((teacher, i) => (
                <AnimateIn key={teacher.name} delay={i * 0.1} y={40}>
                  <div className="bg-brand-cream rounded-xl shadow-md p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image src={teacher.image} alt={teacher.name} fill className="object-cover rounded-full border-4 border-brand-gold" />
                    </div>
                    <h3 className="font-bold text-brand-brown text-lg mb-1">{teacher.name}</h3>
                    <p className="text-brand-gold text-sm font-medium mb-3 text-center">{teacher.role}</p>
                    <p className="text-brand-brown-dark/70 text-sm leading-relaxed text-justify">{teacher.bio}</p>
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
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-2">Événements à venir</h2>
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
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-2">Derniers Articles</h2>
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

        {/* 7 ── Nos Valeurs */}
        <section className="bg-brand-cream py-20">
          <div className="container mx-auto px-4">
            <AnimateIn className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-4">Nos Valeurs</h2>
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
                      <div className="absolute inset-0 bg-brand-brown/40" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-brown mb-3 text-center">{v.title}</h3>
                      <p className="text-brand-brown-dark/70 text-sm leading-relaxed text-justify">{v.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* 8 ── Notre Vision */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimateIn className="bg-brand-cream rounded-2xl p-10 border border-brand-gold/20 shadow-sm text-center">
              <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Vision</h2>
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
              <p className="text-brand-brown-dark/70 leading-relaxed text-lg text-justify">
                Devenir une institution de référence en matière de formation biblique et théologique,
                produisant des diplômés qui transforment positivement leurs communautés et nations
                par la puissance de la Parole de Dieu et du Saint-Esprit.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* 9 ── CTA Final */}
        <section className="bg-brand-brown py-20">
          <div className="container mx-auto px-4 text-center">
            <AnimateIn y={20} className="max-w-2xl mx-auto">
              <p className="text-brand-gold text-4xl md:text-6xl font-serif leading-none mb-4">&ldquo;</p>
              <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed font-medium mb-8">
                Ta parole est une lampe à mes pieds,<br />et une lumière sur mon sentier.
              </blockquote>
              <p className="text-brand-gold font-semibold">— Psaumes 119:105</p>
            </AnimateIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
