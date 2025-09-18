import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      title: 'Consultoria em Segurança Ocupacional',
      description: 'Inspeção e consultoria especializada em segurança do trabalho com foco na prevenção de acidentes',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'seguranca',
      tags: ['segurança', 'consultoria', 'prevenção']
    },
    {
      id: 2,
      title: 'Treinamentos Profissionais',
      description: 'Capacitação de trabalhadores para operação segura de equipamentos industriais',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'treinamentos',
      tags: ['treinamento', 'capacitação', 'educação']
    },
    {
      id: 3,
      title: 'Perícia Técnica Trabalhista',
      description: 'Análise técnica especializada para processos judiciais e perícias previdenciárias',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'pericias',
      tags: ['perícia', 'judicial', 'análise']
    },
    {
      id: 4,
      title: 'Sistemas de Proteção Contra Quedas',
      description: 'Projeto e instalação de linhas de vida e sistemas de ancoragem para trabalho em altura',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'protecao',
      tags: ['altura', 'proteção', 'linha de vida']
    },
    {
      id: 5,
      title: 'Análise de Risco em Máquinas',
      description: 'Avaliação de conformidade NR 12 e NBR 12100 com análise detalhada de riscos',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'analise',
      tags: ['NR12', 'máquinas', 'risco']
    },
    {
      id: 6,
      title: 'Projetos Estruturais',
      description: 'Engenharia estrutural em aço e madeira com memorial de cálculo detalhado',
      image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      category: 'estrutural',
      tags: ['estrutural', 'aço', 'madeira']
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