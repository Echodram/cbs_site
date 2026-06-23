import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { ArticleCard } from '@/components/public/ArticleCard'
import { Badge } from '@/components/ui/Badge'
import { getPublishedArticles } from '@/lib/supabase/articles'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, réflexions et enseignements du Center for Biblical Studies.',
}

const categories = ['Tous', 'Théologie', 'Vie Chrétienne', 'Actualités', 'Témoignages']

export default async function BlogPage() {
  const articles = await getPublishedArticles().catch(() => [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-brand-brown py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Articles, réflexions et enseignements bibliques
            </p>
          </div>
        </section>

        <section className="bg-brand-cream py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(cat => (
                <Badge key={cat} variant={cat === 'Tous' ? 'brown' : 'gold'} className="cursor-pointer px-4 py-1.5 text-sm">
                  {cat}
                </Badge>
              ))}
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-brand-gold/30 text-7xl font-serif mb-4">✝</div>
                <p className="text-brand-brown-dark/50 text-xl">Aucun article publié pour le moment.</p>
                <p className="text-brand-brown-dark/40 mt-2">Revenez bientôt !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
