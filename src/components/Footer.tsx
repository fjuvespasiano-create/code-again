import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' }
  ];

  const services = [
    'Consultoria em Segurança Ocupacional',
    'Análise de Risco - NR 12',
    'Treinamentos Especializados',
    'Perícia Trabalhista',
    'Projetos de Linha de Vida',
    'Engenharia Estrutural'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">A+</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">A+ Engenharia</h3>
                <p className="text-sm opacity-80">& Segurança Ocupacional</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Há mais de 15 anos oferecendo soluções completas em engenharia e 
              segurança ocupacional, protegendo vidas e otimizando processos industriais.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-sm opacity-80 hover:opacity-100 transition-smooth text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection('contato')}
                    className="text-sm opacity-80 hover:opacity-100 transition-smooth text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 opacity-80" />
                <a 
                  href="tel:+5527997081901" 
                  className="text-sm opacity-80 hover:opacity-100 transition-smooth"
                >
                  (27) 99708-1901
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 opacity-80" />
                <a 
                  href="mailto:amanda@amaisengenharia.com.br" 
                  className="text-sm opacity-80 hover:opacity-100 transition-smooth"
                >
                  amanda@amaisengenharia.com.br
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 opacity-80 mt-0.5" />
                <span className="text-sm opacity-80">
                  Linhares - ES<br />
                  Brasil
                </span>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/30">
              <p className="text-sm font-semibold mb-2">Emergência 24h</p>
              <a 
                href="tel:+5527997081901"
                className="text-sm opacity-90 hover:opacity-100 transition-smooth"
              >
                (27) 99708-1901
              </a>
            </div>
          </div>
        </div>
      </div>

      <Separator className="opacity-20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm opacity-80 text-center md:text-left">
            <p>© 2024 A+ Engenharia & Segurança Ocupacional. Todos os direitos reservados.</p>
            <p className="mt-1">
              CREA/ES - Engenharia de Segurança do Trabalho | CNPJ: 00.000.000/0001-00
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-4 text-sm opacity-80">
              <button 
                onClick={() => scrollToSection('contato')}
                className="hover:opacity-100 transition-smooth"
              >
                Política de Privacidade
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="hover:opacity-100 transition-smooth"
              >
                Termos de Uso
              </button>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "A+ Engenharia & Segurança Ocupacional",
            "alternateName": "A+ Engenharia",
            "url": "https://amaisengenharia.com.br",
            "description": "Consultoria especializada em Segurança do Trabalho, Engenharia Mecânica e Projetos Estruturais",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressLocality": "Linhares",
              "addressRegion": "ES"
            },
            "telephone": "+5527997081901",
            "email": "amanda@amaisengenharia.com.br",
            "serviceType": [
              "Consultoria em Segurança e Saúde Ocupacional",
              "Treinamentos e Capacitação",
              "Perícia Trabalhista e Previdenciária",
              "Projetos de Linha de Vida e Proteção Contra Quedas",
              "Análise de Risco em Máquinas - NR 12 e NBR 12100",
              "Engenharia Estrutural - Aço e Madeira"
            ],
            "foundingDate": "2009",
            "areaServed": "BR"
          })
        }}
      />
    </footer>
  );
};

export default Footer;