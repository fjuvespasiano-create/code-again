import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CrawlForm } from '@/components/CrawlForm';

const Scraper = () => {
  useEffect(() => {
    document.title = 'Scraper Firecrawl | Cópia do Site';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-2xl mb-4">Clonar conteúdo via Scraper</h1>
            <p className="body text-muted-foreground mb-8">
              Insira sua API key do Firecrawl e a URL do site alvo para extrair o conteúdo.
            </p>
            <CrawlForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Scraper;
