import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  useEffect(() => {
    const saved = FirecrawlService.getApiKey();
    if (saved) setApiKey(saved);
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey) {
      toast({ title: 'Chave obrigatória', description: 'Informe sua Firecrawl API key.', variant: 'destructive' });
      return;
    }
    FirecrawlService.saveApiKey(apiKey);
    const ok = await FirecrawlService.testApiKey(apiKey);
    if (ok) {
      toast({ title: 'Chave validada', description: 'API key salva e testada com sucesso.' });
    } else {
      toast({ title: 'Falha ao validar', description: 'Verifique sua API key.', variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);

    try {
      const key = FirecrawlService.getApiKey();
      if (!key) {
        toast({ title: 'API key ausente', description: 'Salve sua API key antes de iniciar.', variant: 'destructive' });
        return;
      }

      setProgress(10);
      const result = await FirecrawlService.crawlWebsite(url);
      setProgress(80);

      if (result.success) {
        toast({ title: 'Sucesso', description: 'Site varrido com sucesso.' });
        setCrawlResult(result.data);
      } else {
        toast({ title: 'Erro', description: result.error || 'Falha ao varrer o site', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({ title: 'Erro', description: 'Falha ao conectar ao Firecrawl', variant: 'destructive' });
    } finally {
      setProgress(100);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <Card className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">Configurar Firecrawl</h2>
        <div className="flex gap-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua Firecrawl API Key"
            aria-label="Firecrawl API Key"
          />
          <Button onClick={handleSaveKey} disabled={!apiKey}>
            Salvar e Testar
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Sua chave é armazenada localmente (localStorage).</p>
      </Card>

      <Card className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">URL do site</label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://seusite.com"
              required
            />
          </div>
          {isLoading && <Progress value={progress} className="w-full" />}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Varrendo...' : 'Iniciar Scraper'}
          </Button>
        </form>

        {crawlResult && (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Resultado</h3>
            <div className="space-y-2 text-sm">
              <p>Status: {crawlResult.status}</p>
              <p>Páginas concluídas: {crawlResult.completed}</p>
              <p>Total de páginas: {crawlResult.total}</p>
              <p>Créditos usados: {crawlResult.creditsUsed}</p>
              <p>Expira em: {new Date(crawlResult.expiresAt || '').toLocaleString()}</p>
            </div>
            {crawlResult.data && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Dados:</p>
                <pre className="bg-muted p-2 rounded overflow-auto max-h-60 text-xs">
                  {JSON.stringify(crawlResult.data, null, 2)}
                </pre>
              </div>
            )}
          </Card>
        )}
      </Card>
    </div>
  );
}

export default CrawlForm;
