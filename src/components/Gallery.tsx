import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import treinamentoNR12Teorico from '@/assets/projects/treinamento-nr12-teorico.jpg';
import treinamentoNR12Pratico1 from '@/assets/projects/treinamento-nr12-pratico-1.jpg';
import treinamentoNR12Pratico2 from '@/assets/projects/treinamento-nr12-pratico-2.jpg';
import treinamentoNR12Pratico3 from '@/assets/projects/treinamento-nr12-pratico-3.jpg';
import ancoragemTaludesInstalacao from '@/assets/projects/ancoragem-taludes-instalacao.jpg';
import ancoragemTaludesUso1 from '@/assets/projects/ancoragem-taludes-uso-1.jpg';
import ancoragemTaludesUso2 from '@/assets/projects/ancoragem-taludes-uso-2.jpg';
import ancoragemTaludesUso3 from '@/assets/projects/ancoragem-taludes-uso-3.jpg';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todos');

  const filters = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'seguranca', label: 'Segurança' },
    { id: 'treinamentos', label: 'Treinamentos' },
    { id: 'pericias', label: 'Perícias' },
    { id: 'protecao', label: 'Proteção' },
    { id: 'analise', label: 'Análise de Risco' },
    { id: 'estrutural', label: 'Estrutural' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Treinamento NR 12 - Capacitação Teórica',
      description: 'Capacitação teórica em segurança de máquinas e equipamentos conforme NR 12 com apresentação didática',
      image: treinamentoNR12Teorico,
      category: 'treinamentos',
      tags: ['NR12', 'teoria', 'capacitação']
    },
    {
      id: 2,
      title: 'Treinamento NR 12 - Prática com Munck',
      description: 'Treinamento prático para operação segura de caminhão munck conforme normas de segurança',
      image: treinamentoNR12Pratico1,
      category: 'treinamentos',
      tags: ['NR12', 'munck', 'prática']
    },
    {
      id: 3,
      title: 'Treinamento NR 12 - Capacitação de Equipe',
      description: 'Capacitação prática de equipe para operação segura de equipamentos pesados em campo',
      image: treinamentoNR12Pratico2,
      category: 'treinamentos',
      tags: ['NR12', 'equipe', 'campo']
    },
    {
      id: 4,
      title: 'Treinamento NR 12 - Uso de EPIs',
      description: 'Instrução prática sobre uso correto de equipamentos de proteção individual em operações',
      image: treinamentoNR12Pratico3,
      category: 'treinamentos',
      tags: ['NR12', 'EPI', 'proteção']
    },
    {
      id: 5,
      title: 'Sistema de Ancoragem em Taludes - Instalação',
      description: 'Instalação de sistema de ancoragem para acesso seguro em taludes e áreas de difícil acesso',
      image: ancoragemTaludesInstalacao,
      category: 'protecao',
      tags: ['ancoragem', 'taludes', 'instalação']
    },
    {
      id: 6,
      title: 'Acesso Seguro em Taludes - Área Aquática',
      description: 'Utilização de sistema de ancoragem para trabalhos seguros próximos a corpos d\'água',
      image: ancoragemTaludesUso1,
      category: 'protecao',
      tags: ['taludes', 'água', 'rapel']
    },
    {
      id: 7,
      title: 'Sistema de Ancoragem - Trabalho em Altura',
      description: 'Aplicação prática de sistema de proteção contra quedas em taludes de grande altura',
      image: ancoragemTaludesUso2,
      category: 'protecao',
      tags: ['altura', 'ancoragem', 'segurança']
    },
    {
      id: 8,
      title: 'Trabalho em Área Vegetada',
      description: 'Execução de serviços especializados em áreas com vegetação densa utilizando EPIs adequados',
      image: ancoragemTaludesUso3,
      category: 'protecao',
      tags: ['vegetação', 'EPI', 'campo']
    },
    {
      id: 9,
      title: 'Teste de Carga e Tagueamento',
      description: 'Teste de resistência e certificação de pontos de ancoragem com dinamômetro analógico cap. 3.000kgf',
      image: '/src/assets/projects/teste-carga-tagueamento.png',
      category: 'analise',
      tags: ['teste de carga', 'ancoragem', 'certificação']
    },
    {
      id: 10,
      title: 'Material para Instalação de Pontos de Ancoragem',
      description: 'Parabolt Inox 12mm, olhal inox, barra rosqueada 15mm e conjunto padrão para instalação',
      image: '/src/assets/projects/material-instalacao.png',
      category: 'protecao',
      tags: ['parabolt', 'inox', 'instalação']
    },
    {
      id: 11,
      title: 'Ponto de Ancoragem Instalado',
      description: 'Ponto de ancoragem instalado em fachada de edifício com sistema de segurança contra quedas',
      image: '/src/assets/projects/ponto-ancoragem-instalado.png',
      category: 'protecao',
      tags: ['fachada', 'ancoragem', 'altura']
    },
    {
      id: 12,
      title: 'Equipamento de Teste de Carga',
      description: 'Dinamômetro analógico com capacidade de 3.000kgf para teste de ancoragem predial',
      image: '/src/assets/projects/teste-carga-equipamento.png',
      category: 'analise',
      tags: ['dinamômetro', 'teste', 'equipamento']
    },
    {
      id: 13,
      title: 'Linha de Vida para Montagem de Laje',
      description: 'Sistema de linha de vida horizontal para proteção de trabalhadores em obra de construção civil',
      image: '/src/assets/projects/linha-vida-laje.jpg',
      category: 'protecao',
      tags: ['linha de vida', 'laje', 'construção']
    },
    {
      id: 14,
      title: 'Consultoria em Segurança Ocupacional',
      description: 'Inspeção e consultoria especializada em segurança do trabalho com foco na prevenção de acidentes',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'seguranca',
      tags: ['segurança', 'consultoria', 'prevenção']
    },
    {
      id: 15,
      title: 'Perícia Técnica Trabalhista',
      description: 'Análise técnica especializada para processos judiciais e perícias previdenciárias',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'pericias',
      tags: ['perícia', 'judicial', 'análise']
    }
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="galeria" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-foreground mb-4">Galeria de Projetos</h2>
          <p className="body-lg text-muted-foreground">
            Conheça alguns dos nossos principais trabalhos em engenharia e segurança ocupacional
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id ? "gradient-primary text-white" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="gradient-card border-0 shadow-card hover:shadow-card-hover transition-smooth group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="p-6">
                <h3 className="heading-sm text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;