-- Create company_info table to store A+ Engenharia data
CREATE TABLE public.company_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  logo_url text,
  phone text NOT NULL,
  email text NOT NULL,
  address text,
  cnpj text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create quotes table for budget quotes
CREATE TABLE public.quotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number text NOT NULL UNIQUE,
  client_name text NOT NULL,
  client_email text,
  client_phone text,
  client_address text,
  service_description text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_value numeric(10,2) NOT NULL,
  notes text,
  valid_until date,
  status text NOT NULL DEFAULT 'pending',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for company_info
CREATE POLICY "Anyone can view company info"
  ON public.company_info FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert company info"
  ON public.company_info FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update company info"
  ON public.company_info FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete company info"
  ON public.company_info FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for quotes
CREATE POLICY "Admins can view all quotes"
  ON public.quotes FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update quotes"
  ON public.quotes FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quotes"
  ON public.quotes FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_company_info_updated_at
  BEFORE UPDATE ON public.company_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();