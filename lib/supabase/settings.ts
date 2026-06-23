import { createClient } from './server'
import type { SiteSettings } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'site')
    .single()
  if (error) return null
  return data?.value as SiteSettings
}

export async function upsertSiteSettings(settings: SiteSettings): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('settings')
    .upsert({ key: 'site', value: settings as unknown as Record<string, unknown> })
  if (error) throw error
}
