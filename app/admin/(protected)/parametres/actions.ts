'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { SiteSettings } from '@/types'

export async function saveSettingsAction(formData: FormData) {
  const settings: SiteSettings = {
    about_content: formData.get('about_content') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    facebook: formData.get('facebook') as string || undefined,
    youtube: formData.get('youtube') as string || undefined,
    whatsapp: formData.get('whatsapp') as string || undefined,
  }
  const supabase = createClient()
  const { error } = await supabase
    .from('settings')
    .upsert({ key: 'site', value: settings as unknown as Record<string, unknown> })
  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/a-propos')
  revalidatePath('/contact')
  return { success: true }
}
