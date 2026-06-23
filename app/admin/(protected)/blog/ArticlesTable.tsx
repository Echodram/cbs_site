'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/formatDate'
import { deleteArticleAction } from './actions'
import type { Article } from '@/types'

export function ArticlesTable({ articles: initial }: { articles: Article[] }) {
  const [articles, setArticles] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await deleteArticleAction(id)
      setArticles(prev => prev.filter(a => a.id !== id))
      toast.success('Article supprimé.')
    } catch {
      toast.error('Erreur lors de la suppression.')
    } finally {
      setDeleting(null)
      setConfirmId(null)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-brand-cream/50">
                <th className="text-left px-6 py-3 font-semibold text-brand-brown">Titre</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown hidden md:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown hidden md:table-cell">Statut</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 font-semibold text-brand-brown">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-brand-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-brand-brown line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">/{article.slug}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {article.category && <Badge variant="gold">{article.category}</Badge>}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <Badge variant={article.status === 'published' ? 'green' : 'gray'}>
                      {article.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-gray-400">
                    {formatDate(article.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {article.status === 'published' && (
                        <a
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-brown transition-colors"
                          title="Voir sur le site"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                      )}
                      <Link
                        href={`/admin/blog/${article.id}`}
                        className="p-2 rounded-lg hover:bg-brand-gold/10 text-gray-400 hover:text-brand-brown transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setConfirmId(article.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        title="Supprimer l'article ?"
        size="sm"
      >
        <p className="text-brand-brown-dark/70 mb-6">
          Cette action est irréversible. L&apos;article sera définitivement supprimé.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setConfirmId(null)}>Annuler</Button>
          <Button
            variant="danger"
            loading={!!deleting}
            onClick={() => confirmId && handleDelete(confirmId)}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </>
  )
}
