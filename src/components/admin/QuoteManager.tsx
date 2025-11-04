import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, FileText, Loader2 } from 'lucide-react';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';

interface Quote {
  id: string;
  quote_number: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  total_value: number;
  status: string;
  created_at: string;
}

const QuoteManager = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar orçamentos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Orçamento excluído",
        description: "O orçamento foi removido com sucesso.",
      });

      await loadQuotes();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingQuote(null);
    loadQuotes();
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

  if (showForm) {
    return (
      <QuoteForm
        quote={editingQuote}
        onClose={handleFormClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciar Orçamentos</CardTitle>
              <CardDescription>
                Crie e gerencie orçamentos para seus clientes
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Orçamento
            </Button>
          </div>
        </CardHeader>
      </Card>

      <QuoteList
        quotes={quotes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default QuoteManager;
