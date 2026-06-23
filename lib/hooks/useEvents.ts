'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/types'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
    } else {
      setEvents(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw error
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return { events, loading, error, refetch: fetchEvents, deleteEvent }
}
