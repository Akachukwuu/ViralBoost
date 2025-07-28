import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          subscription_tier: 'free' | 'pro';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_tier?: 'free' | 'pro';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subscription_tier?: 'free' | 'pro';
          created_at?: string;
          updated_at?: string;
        };
      };
      generations: {
        Row: {
          id: string;
          user_id: string;
          niche: string;
          goal: string;
          content_type: string;
          hook: string;
          caption: string;
          hashtags: string;
          cta: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          niche: string;
          goal: string;
          content_type: string;
          hook: string;
          caption: string;
          hashtags: string;
          cta?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          niche?: string;
          goal?: string;
          content_type?: string;
          hook?: string;
          caption?: string;
          hashtags?: string;
          cta?: string | null;
          created_at?: string;
        };
      };
    };
  };
};