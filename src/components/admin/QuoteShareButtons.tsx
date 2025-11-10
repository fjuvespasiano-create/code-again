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
          // Handle relative URLs by prepending the origin
          const logoUrl = company.logo_url.startsWith('http') 
            ? company.logo_url 
            : `${window.location.origin}${company.logo_url}`;
          
          const response = await fetch(logoUrl);
          if (!response.ok) throw new Error('Failed to fetch logo');
          
          const blob = await response.blob();
          const reader = new FileReader();
          
          await new Promise((resolve, reject) => {
            reader.onloadend = () => {
              try {
                const base64data = reader.result as string;
                // Detect image format from base64 string
                const format = base64data.includes('image/png') ? 'PNG' : 'JPEG';
                doc.addImage(base64data, format, 20, yPos, 40, 40);
                resolve(true);
              } catch (error) {
                reject(error);
              }
            };
            reader.onerror = () => reject(new Error('Failed to read image'));
            reader.readAsDataURL(blob);
          });
          
          yPos += 45;
        } catch (error) {
          console.error('Erro ao carregar logo:', error);
          // Continue without logo if it fails to load
        }
      }
      // Header - Company Info (Emissor)
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 102, 204); // Cor primária A+
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
      
      // Quote Info - Título do Orçamento
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 102, 204); // Cor primária A+
      doc.text(`ORÇAMENTO Nº ${quote.quote_number}`, pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(80);
      doc.text(`Data de Emissão: ${new Date(quote.created_at).toLocaleDateString('pt-BR')}`, pageWidth / 2, yPos, { align: 'center' });
      
      if (quote.valid_until) {
        yPos += 5;
        doc.text(`Validade: ${new Date(quote.valid_until).toLocaleDateString('pt-BR')}`, pageWidth / 2, yPos, { align: 'center' });
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
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 102, 204); // Cor primária A+
      doc.text('DESCRIÇÃO DO SERVIÇO', 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(60);
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
        
        // Título da tabela
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 102, 204);
        doc.text('ITENS DO ORÇAMENTO', 20, yPos);
        yPos += 7;
        
        autoTable(doc, {
          startY: yPos,
          head: [['Descrição', 'Qtd', 'Valor Unit.', 'Total']],
          body: tableData,
          theme: 'striped',
          headStyles: { 
            fillColor: [0, 102, 204], // Cor primária A+
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
          },
          styles: {
            fontSize: 9,
            cellPadding: 4,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
          },
          alternateRowStyles: {
            fillColor: [245, 247, 250]
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'center' },
            2: { cellWidth: 35, halign: 'right' },
            3: { cellWidth: 35, halign: 'right' }
          }
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 10;
      }
      
      // Total com destaque
      // Caixa de destaque para o total
      doc.setFillColor(0, 102, 204); // Cor primária A+
      doc.rect(pageWidth - 90, yPos - 5, 70, 12, 'F');
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(255, 255, 255); // Branco
      doc.text(
        `TOTAL: R$ ${quote.total_value.toFixed(2)}`, 
        pageWidth - 55, 
        yPos + 3, 
        { align: 'center' }
      );
      
      // Notes
      if (quote.notes) {
        yPos += 15;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 102, 204); // Cor primária A+
        doc.text('OBSERVAÇÕES', 20, yPos);
        
        yPos += 7;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80);
        const notesLines = doc.splitTextToSize(quote.notes, pageWidth - 40);
        doc.text(notesLines, 20, yPos);
        yPos += (notesLines.length * 5);
      }
      
      // Footer com linha separadora
      const footerY = doc.internal.pageSize.getHeight() - 25;
      
      // Linha divisória
      doc.setDrawColor(0, 102, 204); // Cor primária A+
      doc.setLineWidth(0.5);
      doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
      
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.setFont(undefined, 'italic');
      doc.text(
        'Este orçamento tem validade conforme data especificada acima.',
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
      
      doc.setFont(undefined, 'normal');
      doc.text(
        `${company?.company_name || 'A+ Engenharia'} | ${company?.phone || ''} | ${company?.email || ''}`,
        pageWidth / 2,
        footerY + 5,
        { align: 'center' }
      );
      
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
