import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

const Testimonials = () => {
  const title = useSiteContent('testimonials_title');
  const subtitle = useSiteContent('testimonials_subtitle');
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      position: 'Diretor Industrial - MetalTech S.A.',
      content: 'A A+ Engenharia transformou nosso ambiente industrial. A adequação das máquinas conforme NR 12 foi executada com precisão técnica excepcional. Recomendo fortemente seus serviços.',
    },
    {
      id: 2,
      name: 'Ana Rodrigues',
      position: 'Gerente de Segurança - Construtora ABC',
      content: 'Os treinamentos de trabalho em altura salvaram vidas em nossa empresa. A metodologia e qualidade técnica dos projetos da A+ são impressionantes.',
    },
    {
      id: 3,
      name: 'Roberto Santos',
      position: 'CEO - Indústria Forte Ltda.',
      content: 'Projeto estrutural impecável. O memorial de cálculo foi detalhado e a execução superou nossas expectativas. Parceria de longo prazo garantida.',
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title || 'O Que Nossos Clientes Dizem'}</h2>
          <p className="text-lg text-muted-foreground">
            {subtitle || 'Empresas que confiam na A+ Engenharia para suas necessidades de segurança e engenharia.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-6 mx-auto">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                
                <blockquote className="text-muted-foreground mb-6 text-center italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
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