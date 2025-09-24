import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  FileText
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em até 24 horas.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '(31) 99959-1842 (WhatsApp)',
      link: 'tel:+5531999591842'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@a1engenharia.com.br',
      link: 'mailto:contato@a1engenharia.com.br'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua Lisio Barreto, 447, AP 212\nAraguaia, Belo Horizonte - MG',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Segunda à Sexta: 8h às 18h\nSábado: 8h às 12h',
      link: '#'
    }
  ];

  const services = [
    'Consultoria em Segurança Ocupacional',
    'Análise de Risco em Máquinas - NR 12',
    'Treinamentos e Capacitação',
    'Perícia Trabalhista e Previdenciária',
    'Projetos de Linha de Vida',
    'Engenharia Estrutural',
    'Outro serviço'
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Conversar agora',
      action: () => window.open('https://wa.me/5531999591842', '_blank')
    },
    {
      icon: Calendar,
      title: 'Agendar Reunião',
      description: 'Marcar uma conversa',
      action: () => toast({ title: "Em breve!", description: "Sistema de agendamento em desenvolvimento." })
    },
    {
      icon: FileText,
      title: 'Material Técnico',
      description: 'Baixar catálogo',
      action: () => toast({ title: "Em breve!", description: "Material técnico em preparação." })
    }
  ];

  return (
    <section id="contato" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-xl text-primary mb-4">
            Entre em Contato
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para desenvolver soluções personalizadas para sua empresa. 
            Entre em contato e converse com nossos especialistas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="heading-lg text-primary">
                  Solicite um Orçamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Serviço de Interesse</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Descreva suas necessidades ou tire suas dúvidas..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white shadow-hero"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="heading-md text-primary">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                      {info.link.startsWith('#') ? (
                        <p className="text-muted-foreground text-sm">{info.content}</p>
                      ) : (
                        <a 
                          href={info.link} 
                          className="text-muted-foreground text-sm hover:text-primary transition-smooth"
                        >
                          {info.content}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="heading-md text-primary">
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-smooth text-left"
                  >
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary text-sm">{action.title}</h4>
                      <p className="text-muted-foreground text-xs">{action.description}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center">
          <Card className="gradient-card border-0 shadow-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="heading-md text-primary">Atendimento de Emergência</h3>
                  <p className="text-muted-foreground">Disponível 24h para casos urgentes</p>
                </div>
              </div>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => window.open('tel:+5531999591842', '_self')}
              >
                (31) 99959-1842 - Emergência 24h
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;