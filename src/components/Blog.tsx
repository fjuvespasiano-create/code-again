import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Apreciação de Risco em Máquinas: Metodologia HRN na Prática',
      excerpt: 'Entenda como aplicar a metodologia HRN para apreciação de risco conforme NR 12 e NBR 12100...',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      date: '14 de jan. de 2025',
      category: 'NR 12'
    },
    {
      id: 2,
      title: 'Sistemas de Linha de Vida: Projeto e Dimensionamento',
      excerpt: 'Conheça os requisitos técnicos para projeto de sistemas de linha de vida horizontal e vertical...',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      date: '07 de jan. de 2025',
      category: 'NR 35'
    },
    {
      id: 3,
      title: 'Projetos Estruturais em Aço: Tendências e Inovações',
      excerpt: 'As mais recentes técnicas em dimensionamento e memorial de cálculo para estruturas metálicas...',
      image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      date: '01 de jan. de 2025',
      category: 'Estrutural'
    }
  ];

  return (
    <section id="blog" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Blog & Insights</h2>
          <p className="text-lg text-muted-foreground">
            Fique atualizado com as últimas tendências em segurança do trabalho e engenharia industrial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                
                <Button variant="outline" className="w-full group">
                  Leia Mais
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;