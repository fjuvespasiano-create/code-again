import { Button } from '@/components/ui/button';
import { Shield, Award, Users, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-engineering.jpg';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Shield, label: 'Anos de Experiência', value: '15+' },
    { icon: Award, label: 'Projetos Concluídos', value: '500+' },
    { icon: Users, label: 'Clientes Ativos', value: '200+' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Engenharia e Segurança Ocupacional" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0 hero-pattern"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <div className="fade-in">
            <h1 className="heading-display mb-6">
              <span className="block">Soluções Completas em</span>
              <span className="block text-gradient">Engenharia e Segurança</span>
            </h1>
            
            <p className="body-lg mb-8 text-gray-100 max-w-2xl mx-auto">
              Consultoria especializada em Segurança do Trabalho, Engenharia Mecânica e 
              Projetos Estruturais. Protegemos vidas e otimizamos processos industriais.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 slide-up">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 shadow-hero text-lg px-8 py-6"
              onClick={() => scrollToSection('contato')}
            >
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => scrollToSection('servicos')}
            >
              Nossos Serviços
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto fade-in">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="heading-lg mb-2">{stat.value}</div>
                <div className="text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('servicos')}
          className="animate-bounce text-white hover:text-gray-300 transition-smooth"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;