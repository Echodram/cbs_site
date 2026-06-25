import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { Badge } from '@/components/ui/Badge'
import { getArticleBySlug } from '@/lib/supabase/articles'
import { formatDate } from '@/lib/utils/formatDate'
import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Article introuvable' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? '',
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-brand-cream">
        {article.image_url && (
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-brand-brown/40" />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-brown/70 hover:text-brand-brown mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <article>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {article.category && (
                <Badge variant="gold">
                  <Tag className="h-3 w-3 mr-1" />
                  {article.category}
                </Badge>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {article.published_at
                    ? formatDate(article.published_at)
                    : formatDate(article.created_at)}
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-6 leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-lg text-brand-brown-dark/70 border-l-4 border-brand-gold pl-4 mb-8 italic leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
