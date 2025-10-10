import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Loader2 } from 'lucide-react';
import { z } from 'zod';

interface ContentItem {
  id: string;
  content_key: string;
  content_type: string;
  section: string;
  label: string;
  value: string;
  default_value: string;
}

interface ContentEditorProps {
  content: ContentItem[];
  onContentUpdated: () => void;
}

// Validation schemas
const textSchema = z.string().trim().min(1, "Campo não pode estar vazio").max(5000, "Texto muito longo (máximo 5000 caracteres)");
const imageFileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) return false;
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
}, "Arquivo inválido. Use JPG, PNG, WEBP ou GIF (máx. 10MB)");

const ContentEditor = ({ content, onContentUpdated }: ContentEditorProps) => {
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Group content by section
  const contentBySection = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const getValue = (contentKey: string, originalValue: string) => {
    return editedContent[contentKey] ?? originalValue;
  };

  const handleChange = (contentKey: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      [contentKey]: value
    }));
  };

  const handleSave = async (item: ContentItem) => {
    setSaving(prev => ({ ...prev, [item.content_key]: true }));
    const newValue = editedContent[item.content_key] ?? item.value;

    // Validate text input
    const validation = textSchema.safeParse(newValue);
    if (!validation.success) {
      toast({
        title: "Erro de validação",
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      setSaving(prev => ({ ...prev, [item.content_key]: false }));
      return;
    }

    const { error } = await supabase
      .from('site_content')
      .update({ value: validation.data })
      .eq('id', item.id);

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Conteúdo atualizado",
        description: `${item.label} foi atualizado com sucesso.`,
      });
      setEditedContent(prev => {
        const newState = { ...prev };
        delete newState[item.content_key];
        return newState;
      });
      onContentUpdated();
    }
    setSaving(prev => ({ ...prev, [item.content_key]: false }));
  };

  const handleImageUpload = async (item: ContentItem, file: File) => {
    setUploading(prev => ({ ...prev, [item.content_key]: true }));

    // Validate image file
    const validation = imageFileSchema.safeParse(file);
    if (!validation.success) {
      toast({
        title: "Erro de validação",
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      setUploading(prev => ({ ...prev, [item.content_key]: false }));
      return;
    }

    // Sanitize filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sanitizedKey = item.content_key.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${sanitizedKey}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({
        title: "Erro ao enviar imagem",
        description: uploadError.message,
        variant: "destructive",
      });
      setUploading(prev => ({ ...prev, [item.content_key]: false }));
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('site_content')
      .update({ value: publicUrl })
      .eq('id', item.id);

    if (updateError) {
      toast({
        title: "Erro ao atualizar",
        description: updateError.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Imagem atualizada",
        description: `${item.label} foi atualizada com sucesso.`,
      });
      onContentUpdated();
    }
    setUploading(prev => ({ ...prev, [item.content_key]: false }));
  };

  const renderField = (item: ContentItem) => {
    const currentValue = getValue(item.content_key, item.value);
    const hasChanges = editedContent[item.content_key] !== undefined;
    const isUploading = uploading[item.content_key];
    const isSaving = saving[item.content_key];

    if (item.content_type === 'image') {
      return (
        <div className="space-y-2">
          <Label htmlFor={item.content_key}>{item.label}</Label>
          {currentValue && (
            <img 
              src={currentValue} 
              alt={item.label} 
              className="w-full max-w-md h-48 object-cover rounded-lg border"
            />
          )}
          <div className="flex items-center gap-2">
            <Input
              id={item.content_key}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(item, file);
              }}
              disabled={isUploading}
            />
            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </div>
      );
    }

    if (item.content_type === 'rich_text') {
      return (
        <div className="space-y-2">
          <Label htmlFor={item.content_key}>{item.label}</Label>
          <Textarea
            id={item.content_key}
            value={currentValue}
            onChange={(e) => handleChange(item.content_key, e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleSave(item)}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Salvar
            </Button>
            {hasChanges && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditedContent(prev => {
                    const newState = { ...prev };
                    delete newState[item.content_key];
                    return newState;
                  });
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Label htmlFor={item.content_key}>{item.label}</Label>
        <Input
          id={item.content_key}
          value={currentValue}
          onChange={(e) => handleChange(item.content_key, e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleSave(item)}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salvar
          </Button>
          {hasChanges && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditedContent(prev => {
                  const newState = { ...prev };
                  delete newState[item.content_key];
                  return newState;
                });
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(contentBySection).map(([section, items]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle>Editar Conteúdo - {section}</CardTitle>
            <CardDescription>
              Edite os textos e imagens da seção {section}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                {renderField(item)}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentEditor;
