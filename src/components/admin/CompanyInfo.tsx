import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Upload } from 'lucide-react';
import { z } from 'zod';

const companySchema = z.object({
  company_name: z.string().trim().min(1, "Nome da empresa é obrigatório").max(200),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  address: z.string().trim().max(500).optional(),
  cnpj: z.string().trim().max(18).optional(),
});

interface CompanyData {
  id?: string;
  company_name: string;
  logo_url?: string;
  phone: string;
  email: string;
  address?: string;
  cnpj?: string;
}

const CompanyInfo = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: '',
    phone: '',
    email: '',
    address: '',
    cnpj: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setCompanyData(data);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `company-logo-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(fileName);

      setCompanyData(prev => ({ ...prev, logo_url: publicUrl }));

      toast({
        title: "Logo enviada",
        description: "Logo da empresa atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar logo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const validation = companySchema.safeParse(companyData);
      if (!validation.success) {
        toast({
          title: "Erro de validação",
          description: validation.error.issues[0].message,
          variant: "destructive",
        });
        return;
      }

      if (companyData.id) {
        const { error } = await supabase
          .from('company_info')
          .update(validation.data)
          .eq('id', companyData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('company_info')
          .insert([validation.data]);

        if (error) throw error;
      }

      toast({
        title: "Dados salvos",
        description: "Informações da empresa atualizadas com sucesso.",
      });

      await loadCompanyInfo();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados da Empresa</CardTitle>
        <CardDescription>
          Configure as informações da A+ Engenharia que aparecerão nos orçamentos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="logo">Logo da Empresa</Label>
          {companyData.logo_url && (
            <img
              src={companyData.logo_url}
              alt="Logo da empresa"
              className="w-48 h-32 object-contain border rounded-lg mb-2"
            />
          )}
          <div className="flex items-center gap-2">
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
              disabled={uploading}
            />
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">Nome da Empresa *</Label>
          <Input
            id="company_name"
            value={companyData.company_name}
            onChange={(e) => setCompanyData(prev => ({ ...prev, company_name: e.target.value }))}
            placeholder="A+ Engenharia"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={companyData.cnpj || ''}
            onChange={(e) => setCompanyData(prev => ({ ...prev, cnpj: e.target.value }))}
            placeholder="00.000.000/0000-00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            value={companyData.phone}
            onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="(27) 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={companyData.email}
            onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="contato@aplus.com.br"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Textarea
            id="address"
            value={companyData.address || ''}
            onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Rua, número, bairro, cidade - UF"
            rows={3}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Salvar Dados
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyInfo;
