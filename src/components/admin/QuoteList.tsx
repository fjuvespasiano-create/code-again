import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Share2, Download } from 'lucide-react';
import QuoteShareButtons from './QuoteShareButtons';

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

interface QuoteListProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
}

const QuoteList = ({ quotes, onEdit, onDelete }: QuoteListProps) => {
  if (quotes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Nenhum orçamento cadastrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <Card key={quote.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{quote.quote_number}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                    quote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {quote.status === 'approved' ? 'Aprovado' :
                     quote.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{quote.client_name}</p>
                <p className="text-sm">
                  <span className="font-semibold">R$ {quote.total_value.toFixed(2)}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Criado em {new Date(quote.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <QuoteShareButtons quoteId={quote.id} />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(quote)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja excluir este orçamento?')) {
                      onDelete(quote.id);
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuoteList;
