'use server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function sendContactMessage(formData: FormData) {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  return { success: true }
}
