import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>(11) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>contato@a1engenharia.com.br</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>São Paulo - SP</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-smooth ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-sm shadow-card border-b' 
            : 'bg-background'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A1</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-primary">A1 Engenharia</h1>
                <p className="text-xs text-muted-foreground">Segurança Ocupacional</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => scrollToSection('contato')}
              >
                Solicitar Orçamento
              </Button>
              <Button
                className="gradient-primary text-white"
                onClick={() => scrollToSection('contato')}
              >
                Fale Conosco
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">A1</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-primary">A1 Engenharia</h2>
                      <p className="text-xs text-muted-foreground">Segurança Ocupacional</p>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col gap-4">
                    {navigationItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href.slice(1))}
                        className="text-left text-foreground hover:text-primary transition-smooth font-medium py-2"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="flex flex-col gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => scrollToSection('contato')}
                      className="w-full"
                    >
                      Solicitar Orçamento
                    </Button>
                    <Button
                      className="gradient-primary text-white w-full"
                      onClick={() => scrollToSection('contato')}
                    >
                      Fale Conosco
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;