import { Card, CardContent } from '@/components/ui/card';
import epoLogo from '@/assets/clients/epo-logo.png';
import phvLogo from '@/assets/clients/phv-logo-new.jpg';
import valeLogo from '@/assets/clients/vale-logo-new.png';
import terrabelLogo from '@/assets/clients/terrabel-logo.png';
import sesiLogo from '@/assets/clients/sesi-logo.png';
import sadaLogo from '@/assets/clients/sada-logo.png';
import agmarLogo from '@/assets/clients/agmar-logo-new.png';
import caparaoLogo from '@/assets/clients/caparao-logo.png';

const Clients = () => {
  const clients = [
    {
      name: 'EPO Engenharia',
      sector: 'Engenharia e Construção',
      logo: epoLogo
    },
    {
      name: 'PHV Engenharia',
      sector: 'Incorporação Imobiliária',
      logo: phvLogo
    },
    {
      name: 'Vale',
      sector: 'Mineração',
      logo: valeLogo
    },
    {
      name: 'Terrabel',
      sector: 'Empreendimentos',
      logo: terrabelLogo
    },
    {
      name: 'SESI',
      sector: 'Serviço Social da Indústria',
      logo: sesiLogo
    },
    {
      name: 'SADA',
      sector: 'Grupo Logístico',
      logo: sadaLogo
    },
    {
      name: 'Agmar Engenharia',
      sector: 'Construtora - Empreendimentos Residenciais',
      logo: agmarLogo
    },
    {
      name: 'Construtora Caparaó',
      sector: '67 Anos - Construção Civil',
      logo: caparaoLogo
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
                <img 
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  className="w-full h-20 object-contain mb-4 group-hover:scale-110 transition-transform"
                />
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