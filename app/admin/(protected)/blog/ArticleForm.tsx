'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/utils/slugify'
import { createArticleAction, updateArticleAction } from './actions'
import type { Article } from '@/types'

const schema = z.object({
  title: z.string().min(3, 'Titre requis'),
  slug: z.string().min(3, 'Slug requis'),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['published', 'draft']),
})
type FormValues = z.infer<typeof schema>

const categories = ['Théologie', 'Vie Chrétienne', 'Actualités', 'Témoignages']

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const [content, setContent] = useState(article?.content ?? '')
  const [imageUrl, setImageUrl] = useState(article?.image_url ?? '')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title ?? '',
      slug: article?.slug ?? '',
      excerpt: article?.excerpt ?? '',
      category: article?.category ?? '',
      status: article?.status ?? 'draft',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v ?? ''))
      fd.append('content', content)
      fd.append('image_url', imageUrl)

      if (article) {
        await updateArticleAction(article.id, fd)
      } else {
        await createArticleAction(fd)
      }
      toast.success(article ? 'Article mis à jour.' : 'Article créé.')
    } catch (err) {
      toast.error('Une erreur est survenue.')
      console.error(err)
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Titre *</label>
              <input
                {...register('title', {
                  onChange: (e) => {
                    if (!article) setValue('slug', slugify(e.target.value))
                  },
                })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-brand-brown-dark"
                placeholder="Titre de l'article"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Slug *</label>
              <input
                {...register('slug')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-brand-brown-dark font-mono text-sm"
                placeholder="mon-article"
              />
              {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Extrait</label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-brand-brown-dark resize-none"
                placeholder="Bref résumé de l'article..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Contenu</label>
              <RichTextEditor value={content} onChange={setContent} placeholder="Rédigez votre article..." />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Statut</label>
              <select
                {...register('status')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark bg-white"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Catégorie</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark bg-white"
              >
                <option value="">— Choisir —</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Image</label>
              <ImageUpload value={imageUrl} onChange={setImageUrl} bucket="articles" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/admin/blog')}
            >
              Annuler
            </Button>
            <Button type="submit" loading={saving} className="flex-1">
              {article ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
