'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/Button'
import { createEventAction, updateEventAction } from './actions'
import type { Event } from '@/types'

const schema = z.object({
  title: z.string().min(3, 'Titre requis'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date requise'),
  time: z.string().optional(),
  location: z.string().optional(),
  registration_url: z.string().url('URL invalide').optional().or(z.literal('')),
})
type FormValues = z.infer<typeof schema>

export function EventForm({ event }: { event?: Event }) {
  const [imageUrl, setImageUrl] = useState(event?.image_url ?? '')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: event?.title ?? '',
      description: event?.description ?? '',
      date: event?.date ?? '',
      time: event?.time ?? '',
      location: event?.location ?? '',
      registration_url: event?.registration_url ?? '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v ?? ''))
      fd.append('image_url', imageUrl)
      if (event) {
        await updateEventAction(event.id, fd)
      } else {
        await createEventAction(fd)
      }
      toast.success(event ? 'Événement mis à jour.' : 'Événement créé.')
    } catch {
      toast.error('Une erreur est survenue.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Titre *</label>
              <input {...register('title')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark"
                placeholder="Titre de l'événement" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Description</label>
              <textarea {...register('description')} rows={5}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark resize-none"
                placeholder="Description de l'événement..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Date *</label>
                <input {...register('date')} type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark" />
                {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Heure</label>
                <input {...register('time')} type="time"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Lieu</label>
              <input {...register('location')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark"
                placeholder="Adresse ou lieu" />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Lien d&apos;inscription</label>
              <input {...register('registration_url')} type="url"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark"
                placeholder="https://..." />
              {errors.registration_url && <p className="mt-1 text-xs text-red-500">{errors.registration_url.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <label className="block text-sm font-medium text-brand-brown mb-3">Image</label>
            <ImageUpload value={imageUrl} onChange={setImageUrl} bucket="events" />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1"
              onClick={() => router.push('/admin/evenements')}>
              Annuler
            </Button>
            <Button type="submit" loading={saving} className="flex-1">
              {event ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
