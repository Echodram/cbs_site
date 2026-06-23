'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createArticleAction(formData: FormData) {
  const supabase = createClient()
  const status = formData.get('status') as 'published' | 'draft'
  const article = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    content: formData.get('content') as string,
    excerpt: formData.get('excerpt') as string,
    image_url: formData.get('image_url') as string,
    category: formData.get('category') as string,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }
  const { error } = await supabase.from('articles').insert(article)
  if (error) throw new Error(error.message)
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function updateArticleAction(id: string, formData: FormData) {
  const supabase = createClient()
  const status = formData.get('status') as 'published' | 'draft'

  const { data: existing } = await supabase
    .from('articles').select('published_at, status').eq('id', id).single()

  const article = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    content: formData.get('content') as string,
    excerpt: formData.get('excerpt') as string,
    image_url: formData.get('image_url') as string,
    category: formData.get('category') as string,
    status,
    published_at: status === 'published' && existing?.status !== 'published'
      ? new Date().toISOString()
      : existing?.published_at ?? null,
  }
  const { error } = await supabase.from('articles').update(article).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/blog')
  revalidatePath(`/blog/${article.slug}`)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function deleteArticleAction(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('articles').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}
