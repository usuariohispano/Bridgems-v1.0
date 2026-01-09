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
      users: {
        Row: {
          id: string
          email: string | null
          role: 'player' | 'club' | 'admin'
          full_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          role?: 'player' | 'club' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          role?: 'player' | 'club' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      players: {
        Row: {
          id: string
          position: string | null
          birth_date: string | null
          height: number | null
          weight: number | null
          dominant_foot: 'left' | 'right' | 'both' | null
          bio: string | null
          pps_score: number
          location: string | null
          created_at: string
        }
        Insert: {
          id: string
          position?: string | null
          birth_date?: string | null
          height?: number | null
          weight?: number | null
          dominant_foot?: 'left' | 'right' | 'both' | null
          bio?: string | null
          pps_score?: number
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          position?: string | null
          birth_date?: string | null
          height?: number | null
          weight?: number | null
          dominant_foot?: 'left' | 'right' | 'both' | null
          bio?: string | null
          pps_score?: number
          location?: string | null
          created_at?: string
        }
      }
      clubs: {
        Row: {
          id: string
          name: string
          location: string | null
          description: string | null
          website: string | null
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id: string
          name: string
          location?: string | null
          description?: string | null
          website?: string | null
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          description?: string | null
          website?: string | null
          is_verified?: boolean
          created_at?: string
        }
      }
    }
  }
}
