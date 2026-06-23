'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/types'

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
    } else {
      setArticles(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) throw error
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return { articles, loading, error, refetch: fetchArticles, deleteArticle }
}
