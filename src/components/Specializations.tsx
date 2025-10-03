import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HardHat, 
  Mountain, 
  Building2, 
  Wrench, 
  FileCheck, 
  Cpu 
} from 'lucide-react';

const Specializations = () => {
  const consultingServices = [
    {
      icon: Mountain,
      title: 'Trabalho em Altura (NR 35)',
      description: 'Treinamentos certificados, análise de risco e implementação de sistemas de proteção contra quedas.'
    }
  ];

  const protectionServices = [
    {
      icon: Wrench,
      title: 'Adequação de Máquinas (NR 12)',
      description: 'Análise de risco HRN, instalação de dispositivos de segurança e adequação à NBR 12100.'
    }
  ];

  const engineeringServices = [
    {
      icon: Building2,
      title: 'Projetos Estruturais',
      description: 'Dimensionamento completo de estruturas metálicas e de madeira com memorial de cálculo detalhado.'
    },
    {
      icon: FileCheck,
      title: 'Memorial de Cálculo',
      description: 'Documentação técnica completa com análise estrutural, cargas e verificação de segurança.'
    },
    {
      icon: Cpu,
      title: 'Projetos Mecânicos',
      description: 'Desenvolvimento de soluções mecânicas customizadas e adequações técnicas para ambientes industriais.'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-foreground mb-4">Áreas de Especialização</h2>
        </div>

        <div className="space-y-16">
          {/* Consultoria em Segurança do Trabalho */}
          <div>
            <h3 className="heading-lg text-foreground mb-8">Consultoria em Segurança do Trabalho</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {consultingServices.map((service, index) => (
                <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="heading-sm text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Trabalhadores da construção usando capacetes e equipamentos de segurança"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Projetos de Proteção e Adequação */}
          <div>
            <h3 className="heading-lg text-foreground mb-8">Projetos de Proteção e Adequação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {protectionServices.map((service, index) => (
                <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="heading-sm text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Maquinário industrial com sistemas de segurança"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Engenharia Estrutural e Mecânica */}
          <div>
            <h3 className="heading-lg text-foreground mb-8">Engenharia Estrutural e Mecânica</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engineeringServices.map((service, index) => (
                <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="heading-sm text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specializations;