'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createEventAction(formData: FormData) {
  const supabase = createClient()
  const event = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string || null,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    registration_url: formData.get('registration_url') as string || null,
  }
  const { error } = await supabase.from('events').insert(event)
  if (error) throw new Error(error.message)
  revalidatePath('/evenements')
  revalidatePath('/admin/evenements')
  redirect('/admin/evenements')
}

export async function updateEventAction(id: string, formData: FormData) {
  const supabase = createClient()
  const event = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string || null,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    registration_url: formData.get('registration_url') as string || null,
  }
  const { error } = await supabase.from('events').update(event).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/evenements')
  revalidatePath(`/evenements/${id}`)
  revalidatePath('/admin/evenements')
  redirect('/admin/evenements')
}

export async function deleteEventAction(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/evenements')
  revalidatePath('/admin/evenements')
}
