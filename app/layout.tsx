import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const playfair = localFont({
  src: [
    { path: '../public/fonts/playfair-latin-ext.woff2', weight: '400 900', style: 'normal' },
    { path: '../public/fonts/playfair-latin.woff2', weight: '400 900', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-latin-ext.woff2', weight: '100 900', style: 'normal' },
    { path: '../public/fonts/inter-latin.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Center for Biblical Studies',
    template: '%s | Center for Biblical Studies',
  },
  description: 'Former des serviteurs de Dieu pour les nations — une mission ancrée dans la Parole.',
  keywords: ['école biblique', 'théologie', 'formation chrétienne', 'bible'],
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Center for Biblical Studies',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-brand-cream text-brand-brown-dark antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#4A2C0A',
              color: '#FAF5EE',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: { primary: '#F0C040', secondary: '#4A2C0A' },
            },
          }}
        />
      </body>
    </html>
  )
}
