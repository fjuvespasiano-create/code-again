import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Wrench, 
  FileCheck, 
  GraduationCap, 
  Scale, 
  Building,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: 'Consultoria em Segurança e Saúde Ocupacional',
      description: 'Consultoria especializada em Engenharia de Segurança e Saúde Ocupacional, oferecendo soluções completas para conformidade regulatória.',
      features: [
        'Programa de Prevenção de Riscos Ambientais (PPRA)',
        'Programa de Controle Médico de Saúde Ocupacional (PCMSO)',
        'Laudo Técnico das Condições Ambientais de Trabalho (LTCAT)',
        'Perfil Profissiográfico Previdenciário (PPP)'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wrench,
      title: 'Análise de Risco em Máquinas - NR 12',
      description: 'Apreciação de risco em máquinas e equipamentos conforme NR 12 e NBR 12100, com projetos de adequação.',
      features: [
        'Análise de Risco conforme NBR 12100',
        'Projetos de adequação à NR 12',
        'Dispositivos de segurança em máquinas',
        'Metodologia HRN (Hazard Rating Number)'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: GraduationCap,
      title: 'Treinamentos e Capacitação',
      description: 'Treinamentos especializados para capacitação de profissionais em segurança do trabalho e normas regulamentadoras.',
      features: [
        'Treinamento NR 35 - Trabalho em Altura',
        'Treinamento NR 33 - Espaços Confinados',
        'Treinamento NR 12 - Segurança em Máquinas',
        'Capacitação de CIPA e SESMT'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Scale,
      title: 'Perícia Trabalhista e Previdenciária',
      description: 'Perícias técnicas especializadas para processos trabalhistas e previdenciários com rigor técnico e científico.',
      features: [
        'Perícia em Acidentes de Trabalho',
        'Perícia em Doenças Ocupacionais',
        'Nexo Técnico Epidemiológico',
        'Assistência Técnica Judicial'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileCheck,
      title: 'Projetos de Linha de Vida e Proteção Contra Quedas',
      description: 'Projetos especializados em sistemas de proteção contra quedas e linhas de vida para trabalho em altura.',
      features: [
        'Projeto de Linha de Vida Horizontal',
        'Projeto de Linha de Vida Vertical',
        'Sistemas de Ancoragem',
        'Memorial de Cálculo Estrutural'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Building,
      title: 'Engenharia Estrutural - Aço e Madeira',
      description: 'Projetos estruturais em aço e madeira com cálculos detalhados e especificações técnicas precisas.',
      features: [
        'Projetos de Estruturas Metálicas',
        'Projetos de Estruturas de Madeira',
        'Análise Estrutural Computacional',
        'Laudos de Estabilidade Estrutural'
      ],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-xl text-primary mb-4">
            Nossos Serviços Especializados
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas em engenharia e segurança ocupacional, 
            com foco na proteção de vidas e otimização de processos industriais.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="service-card gradient-card border-0 group hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="heading-md text-primary mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="body-md text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => scrollToSection('contato')}
                >
                  Saiba Mais
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center gradient-card rounded-2xl p-8 md:p-12 shadow-card">
          <h3 className="heading-lg text-primary mb-4">
            Precisa de uma Solução Personalizada?
          </h3>
          <p className="body-md text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para desenvolver soluções 
            sob medida para as necessidades específicas da sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white shadow-hero"
              onClick={() => scrollToSection('contato')}
            >
              Solicitar Orçamento Personalizado
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('sobre')}
            >
              Conhecer Nossa Equipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;