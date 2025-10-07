import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSectionVisibility = (sectionKey: string) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisibility();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('site_sections_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_sections',
          filter: `section_key=eq.${sectionKey}`
        },
        (payload: any) => {
          setIsVisible(payload.new.is_visible);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionKey]);

  const loadVisibility = async () => {
    const { data, error } = await supabase
      .from('site_sections')
      .select('is_visible')
      .eq('section_key', sectionKey)
      .single();

    if (!error && data) {
      setIsVisible(data.is_visible);
    }
    setLoading(false);
  };

  return { isVisible, loading };
};
