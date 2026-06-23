'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { sendContactMessage } from './actions'

const schema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [sending, setSending] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSending(true)
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v))

    const result = await sendContactMessage(fd)
    setSending(false)

    if (result.success) {
      toast.success('Message envoyé avec succès !')
      reset()
    } else {
      toast.error(result.error || 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-brand-brown mb-1.5">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold bg-white text-brand-brown-dark"
            placeholder="Votre nom"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-brown mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold bg-white text-brand-brown-dark"
            placeholder="votre@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-brown mb-1.5">Sujet</label>
        <input
          {...register('subject')}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold bg-white text-brand-brown-dark"
          placeholder="Objet de votre message"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-brown mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold bg-white text-brand-brown-dark resize-none"
          placeholder="Écrivez votre message..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" loading={sending} className="w-full">
        <Send className="h-4 w-4" />
        Envoyer le message
      </Button>
    </form>
  )
}
