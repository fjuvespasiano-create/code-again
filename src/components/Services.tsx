import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Consultoria em Segurança e Saúde Ocupacional",
      description: "Consultoria especializada em Engenharia de Segurança e Saúde Ocupacional, oferecendo soluções completas para conformidade regulatória e prevenção de acidentes de trabalho.",
      features: [
        "Consultoria especializada em Engenharia de Segurança e Saúde Ocupacional",
        "Avaliação e adequação às Normas Regulamentadoras",
        "Programas de prevenção de acidentes de trabalho"
      ],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Perícia Trabalhista e Previdenciária",
      description: "Assistente Técnico em Perícia Trabalhista e Previdenciária, oferecendo suporte especializado em processos judiciais relacionados à segurança do trabalho e doenças ocupacionais.",
      features: [
        "Assistente Técnico em Perícia Trabalhista e Previdenciária",
        "Análise técnica de acidentes de trabalho e doenças ocupacionais",
        "Elaboração de pareceres técnicos fundamentados",
        "Vistoria técnica em locais de trabalho",
        "Análise de nexo causal entre trabalho e doença/acidente",
        "Avaliação de insalubridade e periculosidade",
        "Perícias em aposentadoria especial",
        "Contestação de laudos periciais"
      ],
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Projetos de Linha de Vida e Proteção Contra Quedas",
      description: "Projetos de sistemas de proteção contra quedas, incluindo linhas de vida horizontais e verticais, conforme NR 35 e NBR 15835.",
      features: [
        "Projetos de sistemas de proteção contra quedas",
        "Linhas de vida horizontais e verticais",
        "Dimensionamento conforme NR 35 e NBR 15835"
      ],
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Apreciação de Risco em Máquinas - NR 12 e NBR 12100",
      description: "Apreciação de risco de máquinas e equipamentos na metodologia HRN - NR12.",
      features: [
        "Apreciação de risco em máquinas e equipamentos",
        "Metodologia HRN (Hazard Rating Number)",
        "Projetos de adequação conforme NR 12"
      ],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    },
    {
      title: "Projetos Estruturais",
      description: "Engenharia estrutural em aço e madeira com memorial de cálculo detalhado",
      features: [
        "Projetos estruturais em aço e madeira",
        "Memorial de cálculo detalhado",
        "Análise estrutural completa"
      ],
      image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    }
  ];

  return (
    <section id="servicos" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas em três áreas principais, com expertise técnica e conformidade regulatória total.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;