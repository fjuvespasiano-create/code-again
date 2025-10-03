import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  HardHat,
  Wrench,
  Building2,
  Mountain,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const TechnicalStandards = () => {
  const standards = [
    {
      id: 'NR-35',
      title: 'NR 35 - Trabalho em Altura',
      icon: Mountain,
      color: 'bg-blue-500',
      description: 'Estabelece requisitos mínimos para proteção dos trabalhadores que atuam em atividades em altura.',
      requirements: [
        'Análise de Risco obrigatória para atividades acima de 2 metros',
        'Treinamento certificado de 8 horas (inicial) + 8 horas (reciclagem anual)',
        'Sistemas de Proteção Contra Quedas (SPCQ) dimensionados',
        'Procedimento Operacional Padrão (POP) específico',
        'Permissão de Trabalho (PT) para atividades não rotineiras'
      ],
      services: [
        'Projeto de Linha de Vida Horizontal e Vertical',
        'Dimensionamento de Pontos de Ancoragem',
        'Elaboração de Análise de Risco Específica',
        'Treinamento NR 35 Certificado',
        'Inspeção e Manutenção de EPI'
      ]
    },
    {
      id: 'NR-12',
      title: 'NR 12 - Segurança no Trabalho em Máquinas',
      icon: Wrench,
      color: 'bg-orange-500',
      description: 'Define referências técnicas para garantir a saúde e integridade física dos trabalhadores em máquinas e equipamentos.',
      requirements: [
        'Apreciação de Risco conforme NBR 12100',
        'Dispositivos de Proteção (fixos, móveis e eletrônicos)',
        'Sistema de Parada de Emergência adequado',
        'Capacitação específica para operadores',
        'Manual de Instruções em português'
      ],
      services: [
        'Análise de Risco HRN (Hazard Rating Number)',
        'Projeto de Adequação de Máquinas',
        'Instalação de Dispositivos de Segurança',
        'Treinamento de Operadores',
        'Elaboração de Manuais Técnicos'
      ]
    }
  ];

  const certifications = [
    { name: 'NBR 15835', description: 'Eslings têxteis - Requisitos de segurança' },
    { name: 'NBR 12100', description: 'Segurança de máquinas - Princípios gerais de projeto' },
    { name: 'ABNT NBR 14608', description: 'Bombeiro profissional civil' },
    { name: 'ISO 45001', description: 'Sistema de gestão de segurança e saúde ocupacional' },
    { name: 'ANSI Z359', description: 'Código para sistemas de proteção contra quedas' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Conformidade Regulatória</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Atuamos em total conformidade com as Normas Regulamentadoras do Ministério do Trabalho e normas técnicas ABNT, 
            garantindo a segurança e legalidade de todos os projetos.
          </p>
        </div>

        {/* Normas Regulamentadoras */}
        <div className="grid gap-8 mb-16">
          {standards.map((standard) => (
            <Card key={standard.id} className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${standard.color} rounded-lg flex items-center justify-center`}>
                    <standard.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{standard.title}</CardTitle>
                    <p className="text-muted-foreground">{standard.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Requisitos Obrigatórios
                    </h4>
                    <ul className="space-y-2">
                      {standard.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Nossos Serviços
                    </h4>
                    <ul className="space-y-2">
                      {standard.services.map((service, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Normas Técnicas e Certificações */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Normas Técnicas e Certificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Nossos projetos seguem rigorosamente as normas técnicas nacionais e internacionais, 
              garantindo a máxima segurança e qualidade em todas as entregas.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <Badge variant="outline" className="mb-2 w-full justify-center">
                    {cert.name}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open('https://abnt.org.br/', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Consultar Normas NBR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processo de Trabalho */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Processo de Conformidade</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold">Diagnóstico</h4>
              <p className="text-sm text-muted-foreground">Análise completa da situação atual e identificação de não conformidades</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold">Projeto</h4>
              <p className="text-sm text-muted-foreground">Elaboração de projetos técnicos detalhados com memorial de cálculo</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold">Implementação</h4>
              <p className="text-sm text-muted-foreground">Execução dos projetos com acompanhamento técnico especializado</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-semibold">Certificação</h4>
              <p className="text-sm text-muted-foreground">Emissão de ART e documentação técnica para conformidade legal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalStandards;