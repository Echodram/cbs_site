import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils/formatDate'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48 bg-brand-cream overflow-hidden">
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-cream">
              <div className="text-brand-gold/30 text-6xl font-serif">✝</div>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            {article.category && (
              <Badge variant="gold">
                <Tag className="h-3 w-3 mr-1" />
                {article.category}
              </Badge>
            )}
          </div>

          <h3 className="font-serif font-bold text-brand-brown text-lg leading-snug mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-brand-brown-dark/70 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
            <Calendar className="h-3 w-3" />
            <span>{article.published_at ? formatDate(article.published_at) : formatDate(article.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
