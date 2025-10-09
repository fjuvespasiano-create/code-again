import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSiteContent = (contentKey: string): string => {
  const [content, setContent] = useState('');

  useEffect(() => {
    loadContent();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('site_content_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_content',
          filter: `content_key=eq.${contentKey}`
        },
        (payload: any) => {
          setContent(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [contentKey]);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('value')
      .eq('content_key', contentKey)
      .maybeSingle();

    if (!error && data) {
      setContent(data.value);
    }
  };

  return content;
};
