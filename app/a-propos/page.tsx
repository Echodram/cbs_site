import Image from 'next/image'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { BookOpen, Users, Award, Heart } from 'lucide-react'
import { getSiteSettings } from '@/lib/supabase/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez l'histoire et la mission du Center for Biblical Studies.",
}

export default async function AProposPage() {
  const settings = await getSiteSettings().catch(() => null)

  const aboutContent = settings?.about_content ||
    "Le Center for Biblical Studies a été fondé avec la vision de former des hommes et des femmes ancrés dans la Parole de Dieu, capables de servir efficacement dans l'Église et dans la société. Nous croyons que la formation biblique rigoureuse est la fondation de tout ministère fructueux."

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-brand-brown py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">À propos</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Notre histoire, notre vision, notre mission
            </p>
          </div>
        </section>

        <section className="bg-brand-cream py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Histoire</h2>
                <div className="w-12 h-1 bg-brand-gold rounded-full mb-6" />
                <p className="text-brand-brown-dark/70 leading-relaxed text-lg">{aboutContent}</p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: BookOpen, title: 'Fondé sur la Parole', desc: "Tout notre enseignement est ancré dans les Saintes Écritures, notre seule autorité absolue." },
                  { icon: Users, title: 'Communauté de foi', desc: "Nous sommes une famille qui grandit ensemble dans la connaissance et l'amour de Dieu." },
                  { icon: Award, title: 'Excellence académique', desc: "Nous offrons une formation rigoureuse qui allie profondeur intellectuelle et maturité spirituelle." },
                  { icon: Heart, title: 'Service aux nations', desc: "Notre vocation est de former des serviteurs prêts à porter l'Évangile aux quatre coins du monde." },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-brand-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-brown mb-1">{item.title}</h3>
                      <p className="text-sm text-brand-brown-dark/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Vision</h2>
            <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
            <p className="text-brand-brown-dark/70 leading-relaxed text-lg">
              Devenir une institution de référence en matière de formation biblique et théologique,
              produisant des diplômés qui transforment positivement leurs communautés et nations
              par la puissance de la Parole de Dieu et du Saint-Esprit.
            </p>
          </div>
        </section>

        {/* Nos Campus & Modules */}
        <section className="bg-brand-cream py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Formation</h2>
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
                <Image src="/img/student.jpg" alt="Nos campus" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">Nos Campus</h3>
                <p className="text-brand-brown-dark/70 leading-relaxed mb-4">
                  Une formation biblique à portée de main. Le Centre d&apos;Études Bibliques étend
                  sa présence pour être plus proche de vous. Nos programmes sont accessibles à
                  <strong className="text-brand-brown"> Yaoundé</strong>,
                  <strong className="text-brand-brown"> Bafoussam</strong> et
                  <strong className="text-brand-brown"> Mbouda</strong>.
                </p>
                <p className="text-brand-brown-dark/70 leading-relaxed">
                  Rejoignez le CEB et inscrivez-vous dès maintenant dans l&apos;une de nos
                  directions dans ces villes. Le chemin vers une connaissance approfondie de la
                  Bible n&apos;a jamais été aussi accessible.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-brown mb-6 text-center">Nos Modules</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Méthodes d'étude de la Bible et règles d'interprétation",
                  "Étude de l'Ancien Testament : vue d'ensemble, structure, thématiques, acteurs et message",
                  "Étude du Nouveau Testament : thème, objectif, structure et contenu de chaque livre",
                  "Prédication de messages bibliques, ministère pastoral et éthique chrétienne",
                ].map((module, i) => (
                  <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-brand-gold/20 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-gold/20 rounded-lg flex items-center justify-center text-brand-brown font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-brand-brown-dark/70 text-sm leading-relaxed">{module}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notre Équipe Pédagogique */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-brand-brown mb-4">Notre Équipe Pédagogique</h2>
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-4" />
              <p className="text-brand-brown-dark/70 max-w-2xl mx-auto">
                Notre équipe distinguée cumule des décennies d&apos;expérience en ministère, recherche
                et enseignement, engagée à accompagner la prochaine génération de leaders chrétiens.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Pasteur Godwe Lourna',
                  role: 'Pasteur de Maison Globale de Prière',
                  bio: "Godwe Lourna, ancien étudiant égaré, est devenu pasteur et enseignant passionné de théologie grâce à une rencontre avec Christ et une dévotion à l'étude.",
                  image: '/img/prof1.png',
                },
                {
                  name: 'Pasteur Theophile Bilog Gaspard',
                  role: "Professeur d'Ancien Testament",
                  bio: "Théophile Bilog, d'origine modeste, a vu sa vie changer en 1995 grâce à sa foi et à l'engagement de son épouse, le menant à diriger une école biblique.",
                  image: '/img/prof2.png',
                },
                {
                  name: 'Pasteur Donaldson Assontia',
                  role: 'Pasteur de Maison Globale de Prière',
                  bio: "Le Pasteur Donaldson croit que la sincérité d'un cœur peut transformer et équiper pour le service, avec une foi née dans son adolescence.",
                  image: '/img/prof3.png',
                },
              ].map(teacher => (
                <div key={teacher.name} className="bg-brand-cream rounded-xl shadow-md p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-cover rounded-full border-4 border-brand-gold"
                    />
                  </div>
                  <h3 className="font-bold text-brand-brown text-lg mb-1">{teacher.name}</h3>
                  <p className="text-brand-gold text-sm font-medium mb-3">{teacher.role}</p>
                  <p className="text-brand-brown-dark/70 text-sm leading-relaxed">{teacher.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-brown py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-brand-gold text-5xl font-serif leading-none mb-4">&ldquo;</p>
              <blockquote className="font-serif text-2xl text-white leading-relaxed font-medium">
                Ta parole est une lampe à mes pieds,<br />et une lumière sur mon sentier.
              </blockquote>
              <p className="text-brand-gold mt-4 font-semibold">— Psaumes 119:105</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
