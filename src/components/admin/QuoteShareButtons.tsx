import { Button } from '@/components/ui/button';
import { Download, Mail, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QuoteShareButtonsProps {
  quoteId: string;
}

const QuoteShareButtons = ({ quoteId }: QuoteShareButtonsProps) => {
  const { toast } = useToast();

  const generatePDF = async () => {
    try {
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .single();

      if (quoteError) throw quoteError;

      const { data: company, error: companyError } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (companyError) throw companyError;

      // Aqui você implementaria a geração do PDF
      // Por enquanto, vamos apenas mostrar um toast
      toast({
        title: "Função em desenvolvimento",
        description: "A geração de PDF será implementada em breve.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const shareByEmail = async () => {
    try {
      const { data: quote } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .single();

      if (quote?.client_email) {
        const subject = encodeURIComponent(`Orçamento ${quote.quote_number}`);
        const body = encodeURIComponent(
          `Prezado(a) ${quote.client_name},\n\n` +
          `Segue em anexo o orçamento ${quote.quote_number} no valor de R$ ${quote.total_value.toFixed(2)}.\n\n` +
          `Atenciosamente,\nA+ Engenharia`
        );
        window.open(`mailto:${quote.client_email}?subject=${subject}&body=${body}`);
      } else {
        toast({
          title: "Email não cadastrado",
          description: "Este orçamento não possui email do cliente.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const shareByWhatsApp = async () => {
    try {
      const { data: quote } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .single();

      if (quote?.client_phone) {
        const phone = quote.client_phone.replace(/\D/g, '');
        const message = encodeURIComponent(
          `Olá ${quote.client_name}!\n\n` +
          `Segue o orçamento ${quote.quote_number} no valor de R$ ${quote.total_value.toFixed(2)}.\n\n` +
          `${quote.service_description}`
        );
        window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
      } else {
        toast({
          title: "Telefone não cadastrado",
          description: "Este orçamento não possui telefone do cliente.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={generatePDF}>
        <Download className="mr-2 h-4 w-4" />
        PDF
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareByEmail}>
        <Mail className="mr-2 h-4 w-4" />
        Email
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareByWhatsApp}>
        <Share2 className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>
    </>
  );
};

export default QuoteShareButtons;
