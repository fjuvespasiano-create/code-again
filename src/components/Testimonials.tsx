import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      position: 'Diretor Industrial - MetalTech S.A.',
      content: 'A A1 Engenharia transformou nosso ambiente industrial. A adequação das máquinas conforme NR 12 foi executada com precisão técnica excepcional. Recomendo fortemente seus serviços.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Ana Rodrigues',
      position: 'Gerente de Segurança - Construtora ABC',
      content: 'Os treinamentos de trabalho em altura salvaram vidas em nossa empresa. A metodologia e qualidade técnica dos projetos da A1 são impressionantes.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      position: 'CEO - Indústria Forte Ltda.',
      content: 'Projeto estrutural impecável. O memorial de cálculo foi detalhado e a execução superou nossas expectativas. Parceria de longo prazo garantida.',
      avatar: '/api/placeholder/60/60'
    }
  ];

  return (
    <section id="avaliacoes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-foreground mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="body-lg text-muted-foreground">
            Empresas que confiam na A1 Engenharia para suas necessidades de segurança e engenharia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-full mb-6 mx-auto">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                
                <blockquote className="text-muted-foreground mb-6 text-center italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;