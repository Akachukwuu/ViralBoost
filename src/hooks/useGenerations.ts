import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Generation {
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
}

export function useGenerations() {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setGenerations([]);
      setTodayCount(0);
      setLoading(false);
      return;
    }

    const fetchGenerations = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (!error) {
        setGenerations(data);
        setTodayCount(data.length);
      }

      setLoading(false);
    };

    fetchGenerations();
  }, [user]);

  const addGeneration = async (generation: Omit<Generation, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('generations')
      .insert({
        ...generation,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error) {
      setGenerations(prev => [data, ...prev]);
      setTodayCount(prev => prev + 1);
      return data;
    }

    return null;
  };

  return {
    generations,
    todayCount,
    loading,
    addGeneration,
  };
}