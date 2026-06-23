'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { saveSettingsAction } from './actions'
import type { SiteSettings } from '@/types'

const schema = z.object({
  about_content: z.string().min(10, 'Le contenu À propos est requis'),
  phone: z.string().optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  address: z.string().optional(),
  facebook: z.string().url('URL invalide').optional().or(z.literal('')),
  youtube: z.string().url('URL invalide').optional().or(z.literal('')),
  whatsapp: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function ParametresForm({ settings }: { settings: SiteSettings | null }) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      about_content: settings?.about_content ?? '',
      phone: settings?.phone ?? '',
      email: settings?.email ?? '',
      address: settings?.address ?? '',
      facebook: settings?.facebook ?? '',
      youtube: settings?.youtube ?? '',
      whatsapp: settings?.whatsapp ?? '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => fd.append(k, v ?? ''))
      await saveSettingsAction(fd)
      toast.success('Paramètres enregistrés.')
    } catch {
      toast.error('Une erreur est survenue.')
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, name, type = 'text', placeholder, rows }: {
    label: string; name: keyof FormValues; type?: string; placeholder?: string; rows?: number
  }) => (
    <div>
      <label className="block text-sm font-medium text-brand-brown mb-1.5">{label}</label>
      {rows ? (
        <textarea
          {...register(name)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark resize-none"
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-brand-brown-dark"
        />
      )}
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-brand-brown border-b border-gray-100 pb-3">À propos</h2>
            <Field label="Texte « À propos »" name="about_content" rows={6}
              placeholder="Décrivez votre institution..." />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-brand-brown border-b border-gray-100 pb-3">Coordonnées</h2>
            <Field label="Téléphone" name="phone" placeholder="+00 000 000 0000" />
            <Field label="Email de contact" name="email" type="email" placeholder="contact@cbs.org" />
            <Field label="Adresse" name="address" rows={2} placeholder="123 Rue de la Lumière..." />
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-brand-brown border-b border-gray-100 pb-3">Réseaux sociaux</h2>
            <Field label="Facebook" name="facebook" type="url" placeholder="https://facebook.com/..." />
            <Field label="YouTube" name="youtube" type="url" placeholder="https://youtube.com/..." />
            <Field label="WhatsApp" name="whatsapp" placeholder="+00 000 000 0000" />
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={saving} size="lg">
              Enregistrer les paramètres
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
