import { Button } from '@/components/ui/button';
import { Download, Mail, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPos = 20;

      // Add company logo if available
      if (company?.logo_url) {
        try {
          const response = await fetch(company.logo_url);
          const blob = await response.blob();
          const reader = new FileReader();
          
          await new Promise((resolve) => {
            reader.onloadend = () => {
              const base64data = reader.result as string;
              doc.addImage(base64data, 'PNG', 20, yPos, 40, 40);
              resolve(true);
            };
            reader.readAsDataURL(blob);
          });
          
          yPos += 45;
        } catch (error) {
          console.error('Erro ao carregar logo:', error);
        }
      }
      // Header - Company Info (Emissor)
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 102, 204);
      doc.text('EMPRESA EMISSORA', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(company?.company_name || 'A+ Engenharia', 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(60);
      
      if (company?.cnpj) {
        doc.text(`CNPJ: ${company.cnpj}`, 20, yPos);
        yPos += 5;
      }
      if (company?.address) {
        const addressLines = doc.splitTextToSize(`Endereço: ${company.address}`, 90);
        doc.text(addressLines, 20, yPos);
        yPos += (addressLines.length * 5);
      }
      if (company?.phone) {
        doc.text(`Telefone: ${company.phone}`, 20, yPos);
        yPos += 5;
      }
      if (company?.email) {
        doc.text(`Email: ${company.email}`, 20, yPos);
        yPos += 5;
      }
      
      yPos += 10;
      
      // Quote Info
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text(`ORÇAMENTO Nº ${quote.quote_number}`, 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.text(`Data: ${new Date(quote.created_at).toLocaleDateString('pt-BR')}`, 20, yPos);
      
      if (quote.valid_until) {
        yPos += 5;
        doc.text(`Válido até: ${new Date(quote.valid_until).toLocaleDateString('pt-BR')}`, 20, yPos);
      }
      
      yPos += 10;
      
      // Client Info (Destinatário)
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 102, 204);
      doc.text('CLIENTE / DESTINATÁRIO', 20, yPos);
      
      yPos += 8;
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(quote.client_name, 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(60);
      
      if (quote.client_address) {
        const addressLines = doc.splitTextToSize(`Endereço: ${quote.client_address}`, 90);
        doc.text(addressLines, 20, yPos);
        yPos += (addressLines.length * 5);
      }
      
      if (quote.client_phone) {
        doc.text(`Telefone: ${quote.client_phone}`, 20, yPos);
        yPos += 5;
      }
      
      if (quote.client_email) {
        doc.text(`Email: ${quote.client_email}`, 20, yPos);
        yPos += 5;
      }
      
      yPos += 10;
      
      // Service Description
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('DESCRIÇÃO DO SERVIÇO', 20, yPos);
      doc.setFont(undefined, 'normal');
      
      yPos += 7;
      doc.setFontSize(10);
      const serviceLines = doc.splitTextToSize(quote.service_description, pageWidth - 40);
      doc.text(serviceLines, 20, yPos);
      yPos += (serviceLines.length * 5) + 10;
      
      // Items Table
      const items = typeof quote.items === 'string' 
        ? JSON.parse(quote.items) 
        : (Array.isArray(quote.items) ? quote.items : []);
      
      if (items.length > 0) {
        const tableData = items.map((item: any) => [
          item.description,
          item.quantity.toString(),
          `R$ ${item.unit_price.toFixed(2)}`,
          `R$ ${item.total.toFixed(2)}`
        ]);
        
        autoTable(doc, {
          startY: yPos,
          head: [['Descrição', 'Qtd', 'Valor Unit.', 'Total']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [0, 102, 204] },
          styles: { fontSize: 9 },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'center' },
            2: { cellWidth: 35, halign: 'right' },
            3: { cellWidth: 35, halign: 'right' }
          }
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 10;
      }
      
      // Total
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`VALOR TOTAL: R$ ${quote.total_value.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
      
      // Notes
      if (quote.notes) {
        yPos += 15;
        doc.setFontSize(12);
        doc.text('OBSERVAÇÕES', 20, yPos);
        doc.setFont(undefined, 'normal');
        
        yPos += 7;
        doc.setFontSize(10);
        const notesLines = doc.splitTextToSize(quote.notes, pageWidth - 40);
        doc.text(notesLines, 20, yPos);
      }
      
      // Save PDF
      doc.save(`Orcamento_${quote.quote_number}.pdf`);
      
      toast({
        title: "PDF gerado com sucesso",
        description: "O arquivo foi baixado para seu computador.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao gerar PDF",
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
