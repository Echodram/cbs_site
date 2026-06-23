'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/hooks/useAuth'

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      router.push('/admin/dashboard')
    } catch {
      toast.error('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown rounded-2xl mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-brand-gold" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-brown">Administration</h1>
          <p className="text-brand-brown-dark/60 mt-1 text-sm">Center for Biblical Studies</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="font-semibold text-brand-brown mb-6 text-center">Connexion</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Email</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-brand-brown-dark"
                placeholder="admin@cbs.org"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Mot de passe</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-brand-brown-dark"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
