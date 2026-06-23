import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAllArticlesAdmin } from '@/lib/supabase/articles'
import { ArticlesTable } from './ArticlesTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Articles — Admin' }

export default async function AdminBlogPage() {
  const articles = await getAllArticlesAdmin().catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-brown">Articles</h1>
          <p className="text-brand-brown-dark/60 mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/blog/nouveau"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-semibold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Nouvel article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="text-brand-gold/30 text-6xl font-serif mb-4">✝</div>
          <p className="text-brand-brown-dark/50 text-lg mb-4">Aucun article pour l&apos;instant</p>
          <Link
            href="/admin/blog/nouveau"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-semibold px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Rédiger le premier article
          </Link>
        </div>
      ) : (
        <ArticlesTable articles={articles} />
      )}
    </div>
  )
}
