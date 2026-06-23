import { createClient } from './server'
import type { Event } from '@/types'

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function getAllEvents(): Promise<Event[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getAllEventsAdmin(): Promise<Event[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function createEvent(
  event: Omit<Event, 'id' | 'created_at'>
): Promise<Event> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateEvent(
  id: string,
  event: Partial<Event>
): Promise<Event> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteEvent(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function getEventsCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}
