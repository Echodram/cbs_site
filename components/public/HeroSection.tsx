'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, MessageCircle, ChevronDown } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Image de fond */}
      <Image
        src="/images/acceuil.png"
        alt="Centre pour Études Bibliques"
        fill
        priority
        className="object-cover object-center"
        quality={90}
      />

      {/* Overlay brun semi-transparent */}
      <div className="absolute inset-0 bg-brand-brown/90" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Approfondissez votre foi par<br />
          l&apos;éducation biblique
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="text-white text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Rejoignez notre communauté d&apos;étudiants engagés à étudier
          la Parole de Dieu et à grandir en maturité spirituelle.
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/#a-propos"
            className="flex items-center gap-2 bg-brand-gold text-brand-brown font-bold text-base px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-gold/30"
          >
            <Info size={18} />
            En savoir plus
          </Link>

          <a
            href="https://wa.me/237677083077"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-white text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white hover:text-brand-brown transition-all duration-300 hover:scale-105"
          >
            <MessageCircle size={18} />
            Nous contacter
          </a>
        </motion.div>
      </div>

      {/* Flèche scroll animée */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} className="text-white/70" />
        </motion.div>
      </motion.div>

    </section>
  )
}
