import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { signOut, checkIsAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut } from 'lucide-react';

interface SiteSection {
  id: string;
  section_key: string;
  section_name: string;
  is_visible: boolean;
}

const Admin = () => {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadSections();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    const isAdmin = await checkIsAdmin(session.user.id);
    if (!isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
      await signOut();
      navigate('/login');
    }
  };

  const loadSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_sections')
      .select('*')
      .order('section_name');

    if (error) {
      toast({
        title: "Erro ao carregar seções",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setSections(data);
    }
    setLoading(false);
  };

  const toggleSection = async (sectionId: string, currentValue: boolean) => {
    setUpdating(true);
    const { error } = await supabase
      .from('site_sections')
      .update({ is_visible: !currentValue })
      .eq('id', sectionId);

    if (error) {
      toast({
        title: "Erro ao atualizar seção",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Seção atualizada",
        description: "A visibilidade da seção foi alterada com sucesso.",
      });
      loadSections();
    }
    setUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground mt-1">Gerencie a visibilidade das seções do site</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Controle de Seções</CardTitle>
            <CardDescription>
              Ative ou desative as seções do site que serão exibidas aos visitantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor={section.section_key} className="font-medium cursor-pointer">
                  {section.section_name}
                </Label>
                <Switch
                  id={section.section_key}
                  checked={section.is_visible}
                  onCheckedChange={() => toggleSection(section.id, section.is_visible)}
                  disabled={updating}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Dica:</strong> As alterações serão aplicadas imediatamente no site principal.
            Visitantes verão apenas as seções ativadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
