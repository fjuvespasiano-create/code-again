-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create site_sections table to control visibility
CREATE TABLE public.site_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    section_name TEXT NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_sections
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_sections
CREATE POLICY "Anyone can view site sections"
ON public.site_sections
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Only admins can update site sections"
ON public.site_sections
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default site sections
INSERT INTO public.site_sections (section_key, section_name, is_visible) VALUES
('hero', 'Seção Hero', true),
('about', 'Sobre', true),
('services', 'Serviços', true),
('specializations', 'Especializações', true),
('technical_standards', 'Normas Técnicas', true),
('case_studies', 'Casos de Estudo', true),
('clients', 'Clientes', true),
('stats', 'Estatísticas', true),
('testimonials', 'Depoimentos', true),
('blog', 'Blog', true),
('gallery', 'Galeria', true),
('contact', 'Contato', true);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_sections_updated_at
BEFORE UPDATE ON public.site_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();