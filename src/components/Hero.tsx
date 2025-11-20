import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '@/hooks/useSiteContent';
import heroEngineers from '@/assets/hero-safety-engineers.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const title = useSiteContent('hero_title');
  const subtitle = useSiteContent('hero_subtitle');
  const ctaPrimary = useSiteContent('hero_cta_primary');
  const ctaSecondary = useSiteContent('hero_cta_secondary');
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section id="inicio" className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/login')}
            className="text-muted-foreground hover:text-primary"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Admin
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h1 className="heading-display text-foreground mb-6">
              {title || 'Soluções Completas em Engenharia e Segurança'}
            </h1>
            <p className="body-lg text-muted-foreground mb-8">
              {subtitle || 'Consultoria, projetos e treinamentos especializados para empresas de médio e grande porte. Protegemos vidas e otimizamos processos industriais com qualidade técnica e segurança.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gradient-primary text-white font-semibold px-8 py-6 text-lg" onClick={() => scrollToSection('contato')}>
                {ctaPrimary || 'Solicite seu Orçamento'}
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg" onClick={() => scrollToSection('servicos')}>
                {ctaSecondary || 'Nossos Serviços'}
              </Button>
            </div>
          </div>
          {/* Right image */}
          <div className="relative">
            <img
              src={heroEngineers}
              alt="Engenheiros profissionais trabalhando com equipamentos de segurança em ambiente industrial"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;