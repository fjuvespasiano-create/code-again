import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Factory, 
  Truck, 
  Home,
  TrendingUp,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

const CaseStudies = () => {
  const cases = [
    {
      id: 1,
      title: 'Adequação NR 12 - Indústria Metalúrgica',
      sector: 'Industrial',
      client: 'Metalúrgica Vale do Aço',
      icon: Factory,
      challenge: 'Adequação de 45 máquinas e equipamentos conforme NR 12, incluindo prensas hidráulicas, tornos CNC e equipamentos de soldagem.',
      solution: [
        'Análise de risco HRN em 100% dos equipamentos',
        'Instalação de 180 dispositivos de segurança',
        'Treinamento de 75 operadores',
        'Elaboração de 45 manuais técnicos'
      ],
      results: [
        '100% de conformidade regulatória',
        '85% de redução em acidentes',
        '60 dias de prazo de execução',
        'R$ 450.000 em investimento'
      ],
      duration: '3 meses',
      team: '8 especialistas',
      image: '/src/assets/projects/equipamento-teste-base.jpg'
    },
    {
      id: 2,
      title: 'Sistema de Linha de Vida - Complexo Logístico',
      sector: 'Logística',
      client: 'Grupo Logístico MG',
      icon: Truck,
      challenge: 'Implementação de sistema completo de proteção contra quedas em galpões logísticos de 15.000m² cada.',
      solution: [
        'Projeto de linha de vida horizontal em 3 galpões',
        'Instalação de 120 pontos de ancoragem',
        'Sistema de proteção coletiva em coberturas',
        'Treinamento NR 35 para 50 colaboradores'
      ],
      results: [
        '3 galpões totalmente seguros',
        'Zero acidentes em altura',
        '45 dias de instalação',
        'Certificação CREA/ART'
      ],
      duration: '2 meses',
      team: '6 especialistas',
      image: '/src/assets/projects/linha-vida-construcao.jpg'
    },
    {
      id: 3,
      title: 'Projeto Estrutural - Edifício Residencial',
      sector: 'Construção Civil',
      client: 'Construtora Horizonte',
      icon: Building2,
      challenge: 'Dimensionamento de estrutura metálica para cobertura de área de lazer em edifício de 25 andares.',
      solution: [
        'Cálculo estrutural completo em aço',
        'Memorial de cálculo detalhado',
        'Projeto de fundações especiais',
        'Acompanhamento técnico da execução'
      ],
      results: [
        '500m² de estrutura dimensionada',
        'Redução de 30% no peso estrutural',
        'Economia de R$ 80.000 em materiais',
        'Prazo reduzido em 20%'
      ],
      duration: '1,5 meses',
      team: '4 especialistas',
      image: '/src/assets/projects/construcao-laje-estrutura.jpg'
    },
    {
      id: 4,
      title: 'Treinamento Corporativo - Rede de Varejo',
      sector: 'Varejo',
      client: 'SuperMercados BH',
      icon: Home,
      challenge: 'Capacitação de equipes para operação segura de equipamentos de movimentação em 15 lojas.',
      solution: [
        'Treinamento NR 11 para 200 funcionários',
        'Elaboração de POPs específicos',
        'Certificação de 45 operadores',
        'Programa de reciclagem anual'
      ],
      results: [
        '200 funcionários capacitados',
        '90% de aprovação nos testes',
        '15 lojas certificadas',
        'Redução de 70% em incidentes'
      ],
      duration: '2 meses',
      team: '5 instrutores',
      image: '/src/assets/projects/treinamento-nr12-pratico-1.jpg'
    }
  ];

  const sectors = [
    { name: 'Industrial', count: 15, icon: Factory },
    { name: 'Construção Civil', count: 12, icon: Building2 },
    { name: 'Logística', count: 8, icon: Truck },
    { name: 'Varejo', count: 6, icon: Home }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Casos de Sucesso</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos, demonstrando nossa expertise técnica 
            e capacidade de entregar soluções eficazes em diferentes setores.
          </p>
        </div>

        {/* Estatísticas por Setor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {sectors.map((sector, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <sector.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{sector.name}</h3>
                <p className="text-2xl font-bold text-primary">{sector.count}</p>
                <p className="text-sm text-muted-foreground">projetos</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Casos Detalhados */}
        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <Card key={caseStudy.id} className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <caseStudy.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline">{caseStudy.sector}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{caseStudy.client}</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Desafio</h4>
                      <p className="text-muted-foreground text-sm">{caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Solução Implementada</h4>
                      <ul className="space-y-2">
                        {caseStudy.solution.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Resultados Alcançados</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {caseStudy.results.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{caseStudy.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{caseStudy.team}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4">Seu Projeto Pode Ser o Próximo</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos desenvolver uma solução 
                personalizada para as necessidades específicas da sua empresa.
              </p>
              <Button className="gradient-primary text-white px-8 py-3">
                Solicitar Consultoria Gratuita
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;