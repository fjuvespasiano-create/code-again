import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Shield, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Segurança em Primeiro Lugar',
      description: 'A segurança das pessoas é nossa prioridade máxima em todos os projetos e serviços.'
    },
    {
      icon: Award,
      title: 'Excelência Técnica',
      description: 'Mantemos os mais altos padrões de qualidade e precisão técnica em nossas soluções.'
    },
    {
      icon: Users,
      title: 'Parceria Estratégica',
      description: 'Construímos relacionamentos duradouros baseados na confiança e resultados.'
    },
    {
      icon: TrendingUp,
      title: 'Inovação Contínua',
      description: 'Investimos constantemente em tecnologia e metodologias avançadas.'
    }
  ];

  const certifications = [
    'CREA - Conselho Regional de Engenharia',
    'Especialização em Segurança do Trabalho',
    'Certificação NBR ISO 45001',
    'Qualificação em Perícias Judiciais',
    'Treinamento em Análise de Riscos',
    'Especialização em Estruturas Metálicas'
  ];

  const achievements = [
    { number: '15+', label: 'Anos de Experiência' },
    { number: '500+', label: 'Projetos Executados' },
    { number: '200+', label: 'Clientes Atendidos' },
    { number: '1000+', label: 'Profissionais Treinados' }
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-xl text-primary mb-4">
            Sobre a A1 Engenharia
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Há mais de 15 anos oferecendo soluções inovadoras em engenharia e segurança 
            ocupacional, com foco na proteção de vidas e otimização de processos industriais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div className="space-y-6">
            <div className="slide-up">
              <h3 className="heading-lg text-primary mb-4">Nossa História</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A A1 Engenharia e Segurança Ocupacional nasceu da visão de criar um ambiente 
                  de trabalho mais seguro e eficiente para empresas de todos os portes. Fundada 
                  por engenheiros especialistas, nossa empresa rapidamente se tornou referência 
                  no mercado brasileiro.
                </p>
                <p>
                  Ao longo dos anos, desenvolvemos metodologias próprias e parcerias estratégicas 
                  que nos permitem oferecer soluções completas e personalizadas, sempre alinhadas 
                  às normas regulamentadoras e melhores práticas internacionais.
                </p>
                <p>
                  Hoje, somos reconhecidos pela qualidade técnica, agilidade na entrega e 
                  compromisso com a segurança, atendendo empresas de diversos setores em 
                  todo o território nacional.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 slide-up">
              <Card className="gradient-card border-0 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h4 className="heading-md text-primary">Missão</h4>
                </div>
                <p className="text-muted-foreground">
                  Proteger vidas e otimizar processos industriais através de soluções 
                  inovadoras em engenharia e segurança ocupacional.
                </p>
              </Card>

              <Card className="gradient-card border-0 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                  <h4 className="heading-md text-primary">Visão</h4>
                </div>
                <p className="text-muted-foreground">
                  Ser a empresa líder em consultoria de engenharia e segurança ocupacional 
                  no Brasil, reconhecida pela excelência técnica.
                </p>
              </Card>
            </div>
          </div>

          {/* Values & Certifications */}
          <div className="space-y-8">
            {/* Company Values */}
            <div className="slide-up">
              <h3 className="heading-lg text-primary mb-6">Nossos Valores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-smooth"
                  >
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-1">{value.title}</h5>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="slide-up">
              <h3 className="heading-lg text-primary mb-6">Certificações e Qualificações</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="text-center">
          <h3 className="heading-lg text-primary mb-8">Nossos Números</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center p-6 rounded-xl gradient-card shadow-card hover:shadow-card-hover transition-smooth">
                  <div className="heading-xl text-primary mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground font-medium">{achievement.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;