import { Card, CardContent } from '@/components/ui/card';

const Clients = () => {
  const clients = [
    {
      name: 'EPO Engenharia',
      sector: 'Engenharia e Construção',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'PHV Engenharia',
      sector: 'Incorporação Imobiliária',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'Vale',
      sector: 'Mineração',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'Terrabel',
      sector: 'Empreendimentos',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'SESI',
      sector: 'Serviço Social da Indústria',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'SADA',
      sector: 'Grupo Logístico',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'Agmar Engenharia',
      sector: 'Construtora - Empreendimentos Residenciais',
      logo: '/api/placeholder/150/80'
    },
    {
      name: 'Construtora Caparaó',
      sector: '67 Anos - Construção Civil',
      logo: '/api/placeholder/150/80'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projetos Realizados' },
    { number: '100%', label: 'Conformidade NR' },
    { number: '24/7', label: 'Suporte Técnico' },
    { number: '5★', label: 'Avaliação Média' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-foreground mb-4">Empresas que Confiam em Nós</h2>
          <p className="body-lg text-muted-foreground">
            Orgulhamos-nos de trabalhar com empresas líderes em diversos setores industriais
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {clients.map((client, index) => (
            <Card key={index} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {client.name.split(' ')[0].substring(0, 2)}
                  </span>
                </div>
                <h3 className="heading-sm text-foreground mb-2">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.sector}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;