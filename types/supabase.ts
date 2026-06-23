export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          image_url: string | null
          category: string | null
          status: 'published' | 'draft'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          category?: string | null
          status?: 'published' | 'draft'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          category?: string | null
          status?: 'published' | 'draft'
          published_at?: string | null
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          time: string | null
          location: string | null
          image_url: string | null
          registration_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          time?: string | null
          location?: string | null
          image_url?: string | null
          registration_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          time?: string | null
          location?: string | null
          image_url?: string | null
          registration_url?: string | null
        }
      }
      settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
  }
}
