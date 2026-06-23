export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image_url: string
  category: string
  status: 'published' | 'draft'
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image_url: string
  registration_url?: string
  created_at: string
}

export interface SiteSettings {
  about_content: string
  phone: string
  email: string
  address: string
  facebook?: string
  youtube?: string
  whatsapp?: string
}
