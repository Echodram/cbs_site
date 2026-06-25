'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil',    href: '/' },
  { label: 'À propos',   href: '/#a-propos' },
  { label: 'Événements', href: '/#evenements' },
  { label: 'Articles',   href: '/#articles' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/images/logo_cbs.png"
            alt="Centre d'Études Bibliques"
            width={56}
            height={56}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-base md:text-xl text-brand-brown">
              Centre d&apos;Études Bibliques
            </span>
          </div>
        </Link>

        {/* Navigation centrale — desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 font-medium text-sm hover:text-brand-brown transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Sélecteur de langue — desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-brand-brown transition-colors">
          <Globe size={16} className="text-brand-brown" />
          <span className="font-medium">Français</span>
          <ChevronDown size={14} />
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden text-brand-brown p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-20 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-100 px-6 py-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-brand-brown font-medium text-lg border-b border-gray-100 pb-4"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 text-brand-brown-light pt-2">
              <Globe size={16} />
              <span className="text-sm font-medium">Français</span>
              <ChevronDown size={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
