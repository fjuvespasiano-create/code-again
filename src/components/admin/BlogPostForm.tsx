import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author_name: string | null;
  is_published: boolean;
  published_at: string | null;
}

interface BlogPostFormProps {
  post?: BlogPost;
  onClose: () => void;
}

export const BlogPostForm = ({ post, onClose }: BlogPostFormProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    author_name: "",
    is_published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        image_url: post.image_url || "",
        author_name: post.author_name || "",
        is_published: post.is_published,
      });
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: post ? formData.slug : generateSlug(title),
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Erro",
        description: "Título e conteúdo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const dataToSave = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        author_name: formData.author_name || null,
        is_published: formData.is_published,
        published_at: formData.is_published && !post?.published_at ? new Date().toISOString() : post?.published_at,
      };

      if (post) {
        const { error } = await supabase
          .from("blog_posts")
          .update(dataToSave)
          .eq("id", post.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Post atualizado com sucesso",
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Post criado com sucesso",
        });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {post ? "Editar Post" : "Novo Post"}
        </h2>

        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Digite o título do post"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="slug-do-post"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Breve descrição do post"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Conteúdo completo do post"
            rows={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author_name">Nome do Autor</Label>
          <Input
            id="author_name"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            placeholder="Nome do autor"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_published: checked })
            }
          />
          <Label htmlFor="is_published">Publicar post</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Card>
  );
};
