import { createClient } from './server'
import type { Article } from '@/types'

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) return null
  return data
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function createArticle(
  article: Omit<Article, 'id' | 'created_at' | 'updated_at'>
): Promise<Article> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateArticle(
  id: string,
  article: Partial<Article>
): Promise<Article> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .update(article)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function getArticlesCount(): Promise<{ total: number; published: number }> {
  const supabase = createClient()
  const [{ count: total }, { count: published }] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
  ])
  return { total: total ?? 0, published: published ?? 0 }
}
