import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

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
    { label: 'Home', href: '#inicio' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Blog', href: '#blog' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
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
            <img 
              src="/logo-a1.png" 
              alt="A+ Engenharia & Segurança Ocupacional" 
              className="h-12 w-auto"
            />
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
              className="gradient-primary text-white font-medium"
              onClick={() => scrollToSection('contato')}
            >
              Solicite um Orçamento
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
                  <img 
                    src="/logo-a1.png" 
                    alt="A+ Engenharia & Segurança Ocupacional" 
                    className="h-10 w-auto"
                  />
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
  );
};

export default Header;