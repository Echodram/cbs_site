'use client'
import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'

const modules = [
  "Méthodes d'étude de la Bible et règles d'interprétation",
  "Étude de l'Ancien Testament : vue d'ensemble, structure, thématiques, acteurs et message",
  "Étude du Nouveau Testament : thème, objectif, structure et contenu de chaque livre",
  "Prédication de messages bibliques, ministère pastoral et éthique chrétienne",
]

const teachers = [
  {
    name: "Pasteur Godwe Lourna",
    role: "Pasteur de Maison Globale de Prière",
    bio: "Godwe Lourna, ancien étudiant égaré, est devenu pasteur et enseignant passionné de théologie grâce à une rencontre avec Christ et une dévotion à l'étude de la Parole.",
    image: "/images/prof1.png",
  },
  {
    name: "Pasteur Theophile Bilog Gaspard",
    role: "Professeur d'Ancien Testament",
    bio: "Théophile Bilog, d'origine modeste, a vu sa vie changer en 1995 grâce à sa foi et à l'engagement de son épouse, le menant à diriger une école biblique.",
    image: "/images/prof2.png",
  },
  {
    name: "Pasteur Donaldson Assontia",
    role: "Pasteur de Maison Globale de Prière",
    bio: "Le Pasteur Donaldson croit que la sincérité d'un cœur peut transformer et équiper pour le service, avec une foi née dans son adolescence et un appel pastoral révélé par un rêve.",
    image: "/images/prof3.png",
  },
]

export function FormationSection() {
  return (
    <section className="bg-brand-cream py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* ── En-tête ── */}
        <AnimateIn className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-brand-brown mb-3">
            Notre formation
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-4" />
          <p className="text-brand-brown-light max-w-md mx-auto text-sm leading-relaxed">
            Découvrez nos programmes de formation complets conçus pour vous équiper pour un ministère efficace.
          </p>
        </AnimateIn>

        {/* ── Bloc 1 — Nos campus ── */}
        <AnimateIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

            <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/2] relative">
              <Image
                src="/images/student.jpg"
                alt="Campus du Center for Biblical Studies"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">
                Nos campus
              </h3>
              <p className="text-brand-brown-light text-sm leading-relaxed mb-4">
                Une formation biblique à portée de main. Le Center for Biblical Studies étend
                désormais sa présence pour être plus proche de vous. Que vous soyez à Yaoundé,
                à Bafoussam ou à Mbouda, vous avez la possibilité de devenir étudiant du CEB.
                Fini les contraintes géographiques ! Nos programmes sont accessibles dans ces
                trois villes, vous permettant d&apos;étudier la Parole de Dieu sans avoir à vous
                déplacer loin de chez vous.
              </p>
              <p className="text-brand-brown-light text-sm leading-relaxed">
                Rejoignez le CEB et inscrivez-vous dès maintenant dans l&apos;une de nos directions.
                Le chemin vers une connaissance approfondie de la Bible et un ministère fructueux
                n&apos;a jamais été aussi accessible.
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="border-t border-brand-gold/20 mb-16" />

        {/* ── Bloc 2 — Nos modules ── */}
        <AnimateIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

            {/* Texte en premier sur mobile, à gauche sur desktop */}
            <div className="order-2 md:order-1">
              <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">
                Nos modules
              </h3>
              <p className="text-brand-brown-light text-sm leading-relaxed mb-6">
                Notre programme d&apos;études est conçu pour équiper les étudiants avec des
                connaissances et des compétences pratiques pour le ministère. Les cours
                sont organisés selon le format suivant :
              </p>
              <ul className="space-y-3">
                {modules.map((mod, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-brown-light">
                    <span className="mt-1.5 w-2 h-2 rounded-sm bg-brand-gold flex-shrink-0" />
                    {mod}
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative">
              <Image
                src="/images/sortie.jpeg"
                alt="Salle d'étude"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimateIn>

        <div className="border-t border-brand-gold/20 mb-16" />

        {/* ── Bloc 3 — Équipe pédagogique ── */}
        <AnimateIn className="text-center mb-12">
          <h3 className="font-serif text-3xl font-bold text-brand-brown mb-3">
            Rencontrez notre équipe pédagogique
          </h3>
          <p className="text-brand-brown-light text-sm max-w-lg mx-auto leading-relaxed">
            Notre équipe distinguée cumule des décennies d&apos;expérience en ministère, recherche
            et enseignement. Elle s&apos;engage à accompagner la prochaine génération de leaders chrétiens.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teachers.map((teacher, i) => (
            <AnimateIn key={teacher.name} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center px-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-gold mb-4 flex-shrink-0 relative">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-brand-brown text-lg mb-1">
                  {teacher.name}
                </h4>
                <p className="text-brand-gold text-sm font-medium mb-3">
                  {teacher.role}
                </p>
                <p className="text-brand-brown-light text-sm leading-relaxed line-clamp-4">
                  {teacher.bio}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
