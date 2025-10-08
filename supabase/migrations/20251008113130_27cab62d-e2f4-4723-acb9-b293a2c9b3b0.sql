-- Create storage bucket for uploaded images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for site images
CREATE POLICY "Anyone can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Only admins can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update site images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete site images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Create table for editable content
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image', 'rich_text')),
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  default_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

CREATE POLICY "Only admins can update site content"
ON public.site_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial content for Hero section
INSERT INTO public.site_content (content_key, content_type, section, label, value, default_value) VALUES
(
  'hero_title',
  'text',
  'Hero',
  'Título Principal',
  'Soluções Completas em Engenharia e Segurança',
  'Soluções Completas em Engenharia e Segurança'
),
(
  'hero_subtitle',
  'text',
  'Hero',
  'Subtítulo',
  'Consultoria, projetos e treinamentos especializados para empresas de médio e grande porte. Protegemos vidas e otimizamos processos industriais com qualidade técnica e segurança.',
  'Consultoria, projetos e treinamentos especializados para empresas de médio e grande porte. Protegemos vidas e otimizamos processos industriais com qualidade técnica e segurança.'
),
(
  'hero_cta_primary',
  'text',
  'Hero',
  'Botão Principal',
  'Solicite seu Orçamento',
  'Solicite seu Orçamento'
),
(
  'hero_cta_secondary',
  'text',
  'Hero',
  'Botão Secundário',
  'Nossos Serviços',
  'Nossos Serviços'
),
(
  'services_title',
  'text',
  'Serviços',
  'Título da Seção',
  'Nossos Serviços',
  'Nossos Serviços'
),
(
  'services_description',
  'text',
  'Serviços',
  'Descrição da Seção',
  'Oferecemos soluções completas em três áreas principais, com expertise técnica e conformidade regulatória total.',
  'Oferecemos soluções completas em três áreas principais, com expertise técnica e conformidade regulatória total.'
);

-- Enable realtime for site_content table
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;