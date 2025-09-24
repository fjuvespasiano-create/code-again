import { useEffect } from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Specializations from '@/components/Specializations';
import TechnicalStandards from '@/components/TechnicalStandards';
import CaseStudies from '@/components/CaseStudies';
import Gallery from '@/components/Gallery';
import Clients from '@/components/Clients';
import Stats from '@/components/Stats';
import Blog from '@/components/Blog';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = "A+ Engenharia e Segurança Ocupacional | Soluções Completas em Engenharia e Segurança";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Specializations />
        <TechnicalStandards />
        <CaseStudies />
        <Clients />
        <Stats />
        <Testimonials />
        <Blog />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
