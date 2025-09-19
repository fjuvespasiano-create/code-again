import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroEngineers from '@/assets/hero-engineers.png';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section id="inicio" className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h1 className="heading-display text-foreground mb-6">
              Soluções Completas em <span className="text-primary">Engenharia</span> e <span className="text-primary">Segurança</span>
            </h1>
            <p className="body-lg text-muted-foreground mb-8">
              Consultoria, projetos e treinamentos especializados para empresas de médio e grande porte.
              Protegemos vidas e otimizamos processos industriais com qualidade técnica e segurança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gradient-primary text-white font-semibold px-8 py-6 text-lg" onClick={() => scrollToSection('contato')}>
                Solicite seu Orçamento
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg" onClick={() => scrollToSection('servicos')}>
                Nossos Serviços
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