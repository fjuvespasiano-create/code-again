-- Create services table for managing individual services visibility
CREATE TABLE IF NOT EXISTS public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_key TEXT NOT NULL UNIQUE,
  service_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view visible services"
ON public.services
FOR SELECT
USING (is_visible = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Only admins can update services"
ON public.services
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial services
INSERT INTO public.services (service_key, service_name, title, description, features, image_url, display_order) VALUES
(
  'consultoria_seguranca',
  'Consultoria em Segurança',
  'Consultoria em Segurança e Saúde Ocupacional',
  'Consultoria especializada em Engenharia de Segurança e Saúde Ocupacional, oferecendo soluções completas para conformidade regulatória e prevenção de acidentes de trabalho.',
  '["Consultoria especializada em Engenharia de Segurança e Saúde Ocupacional", "Avaliação e adequação às Normas Regulamentadoras", "Programas de prevenção de acidentes de trabalho"]'::jsonb,
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  1
),
(
  'pericia_trabalhista',
  'Perícia Trabalhista',
  'Perícia Trabalhista e Previdenciária',
  'Assistente Técnico em Perícia Trabalhista e Previdenciária, oferecendo suporte especializado em processos judiciais relacionados à segurança do trabalho e doenças ocupacionais.',
  '["Assistente Técnico em Perícia Trabalhista e Previdenciária", "Análise técnica de acidentes de trabalho e doenças ocupacionais", "Elaboração de pareceres técnicos fundamentados", "Vistoria técnica em locais de trabalho", "Análise de nexo causal entre trabalho e doença/acidente", "Avaliação de insalubridade e periculosidade", "Perícias em aposentadoria especial", "Contestação de laudos periciais"]'::jsonb,
  'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  2
),
(
  'apreciacao_risco_nr12',
  'Apreciação de Risco NR12',
  'Apreciação de Risco em Máquinas - NR 12 e NBR 12100',
  'Apreciação de risco de máquinas e equipamentos na metodologia HRN - NR12.',
  '["Apreciação de risco em máquinas e equipamentos", "Metodologia HRN (Hazard Rating Number)", "Projetos de adequação conforme NR 12"]'::jsonb,
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  3
),
(
  'projetos_estruturais',
  'Projetos Estruturais',
  'Projetos Estruturais',
  'Engenharia estrutural em aço e madeira com memorial de cálculo detalhado',
  '["Projetos estruturais em aço e madeira", "Memorial de cálculo detalhado", "Análise estrutural completa"]'::jsonb,
  'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  4
);

-- Enable realtime for services table
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;