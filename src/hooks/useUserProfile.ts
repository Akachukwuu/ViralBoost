import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface UserProfile {
  id: string;
  user_id: string;
  subscription_tier: 'free' | 'pro';
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            subscription_tier: 'free',
          })
          .select()
          .single();

        if (!createError) {
          setProfile(newProfile);
        }
      } else if (!error) {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}