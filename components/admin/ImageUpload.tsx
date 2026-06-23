'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/Spinner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  bucket: 'articles' | 'events'
}

export function ImageUpload({ value, onChange, bucket }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image trop volumineuse (max 5 Mo).')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
      onChange(data.publicUrl)
    } catch (err) {
      setError('Erreur lors de l\'upload.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
          <Image
            src={value}
            alt="Image uploadée"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-brand-gold hover:bg-brand-cream transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Spinner size="md" />
              <span className="text-sm text-gray-500">Upload en cours...</span>
            </>
          ) : (
            <>
              <div className="p-3 bg-brand-cream rounded-full">
                <ImageIcon className="h-6 w-6 text-brand-gold" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-brand-brown">
                  <Upload className="h-3.5 w-3.5 inline mr-1" />
                  Cliquer pour uploader
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP — max 5 Mo</p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleUpload(file)
        }}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
