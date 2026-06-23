import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArticleForm } from '../ArticleForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nouvel article — Admin' }

export default function NouvelArticlePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blog"
          className="p-2 rounded-lg hover:bg-white border border-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-brand-brown" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">Nouvel article</h1>
          <p className="text-brand-brown-dark/60 mt-1">Créer un article</p>
        </div>
      </div>
      <ArticleForm />
    </div>
  )
}
