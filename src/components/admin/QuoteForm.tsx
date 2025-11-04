import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { z } from 'zod';

const quoteSchema = z.object({
  client_name: z.string().trim().min(1, "Nome do cliente é obrigatório").max(200),
  client_email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal('')),
  client_phone: z.string().trim().max(20).optional(),
  client_address: z.string().trim().max(500).optional(),
  service_description: z.string().trim().min(1, "Descrição do serviço é obrigatória").max(2000),
  notes: z.string().trim().max(1000).optional(),
  valid_until: z.string().optional(),
});

interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface QuoteFormProps {
  quote?: any;
  onClose: () => void;
}

const QuoteForm = ({ quote, onClose }: QuoteFormProps) => {
  const [formData, setFormData] = useState({
    client_name: quote?.client_name || '',
    client_email: quote?.client_email || '',
    client_phone: quote?.client_phone || '',
    client_address: quote?.client_address || '',
    service_description: quote?.service_description || '',
    notes: quote?.notes || '',
    valid_until: quote?.valid_until || '',
  });
  
  const [items, setItems] = useState<QuoteItem[]>(
    quote?.items || [{ description: '', quantity: 1, unit_price: 0, total: 0 }]
  );
  
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const generateQuoteNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORC-${year}${month}-${random}`;
  };

  const calculateItemTotal = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const calculateTotalValue = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].total = calculateItemTotal(
        newItems[index].quantity,
        newItems[index].unit_price
      );
    }
    
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const validation = quoteSchema.safeParse(formData);
      if (!validation.success) {
        toast({
          title: "Erro de validação",
          description: validation.error.issues[0].message,
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      const totalValue = calculateTotalValue();
      const quoteData = {
        ...validation.data,
        quote_number: quote?.quote_number || generateQuoteNumber(),
        items: JSON.stringify(items),
        total_value: totalValue,
        status: quote?.status || 'pending',
      };

      if (quote?.id) {
        const { error } = await supabase
          .from('quotes')
          .update(quoteData)
          .eq('id', quote.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('quotes')
          .insert([quoteData]);

        if (error) throw error;
      }

      toast({
        title: "Orçamento salvo",
        description: "O orçamento foi salvo com sucesso.",
      });

      onClose();
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{quote ? 'Editar Orçamento' : 'Novo Orçamento'}</CardTitle>
            <CardDescription>
              Preencha os dados do orçamento
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Nome do Cliente *</Label>
            <Input
              id="client_name"
              value={formData.client_name}
              onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
              placeholder="João da Silva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_email">Email do Cliente</Label>
            <Input
              id="client_email"
              type="email"
              value={formData.client_email}
              onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
              placeholder="cliente@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_phone">Telefone do Cliente</Label>
            <Input
              id="client_phone"
              value={formData.client_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
              placeholder="(27) 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valid_until">Válido Até</Label>
            <Input
              id="valid_until"
              type="date"
              value={formData.valid_until}
              onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="client_address">Endereço do Cliente</Label>
          <Textarea
            id="client_address"
            value={formData.client_address}
            onChange={(e) => setFormData(prev => ({ ...prev, client_address: e.target.value }))}
            placeholder="Rua, número, bairro, cidade - UF"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service_description">Descrição do Serviço *</Label>
          <Textarea
            id="service_description"
            value={formData.service_description}
            onChange={(e) => setFormData(prev => ({ ...prev, service_description: e.target.value }))}
            placeholder="Descreva o serviço a ser realizado"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Itens do Orçamento</Label>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Item
            </Button>
          </div>

          {items.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 space-y-2">
                    <Label>Descrição</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Descrição do item"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Valor Unit.</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Total</Label>
                    <Input
                      value={item.total.toFixed(2)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <div className="text-lg font-semibold">
              Total: R$ {calculateTotalValue().toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Observações adicionais"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salvar Orçamento
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
