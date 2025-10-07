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
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const Index = () => {
  const hero = useSectionVisibility('hero');
  const about = useSectionVisibility('about');
  const services = useSectionVisibility('services');
  const specializations = useSectionVisibility('specializations');
  const technicalStandards = useSectionVisibility('technical_standards');
  const caseStudies = useSectionVisibility('case_studies');
  const clients = useSectionVisibility('clients');
  const stats = useSectionVisibility('stats');
  const testimonials = useSectionVisibility('testimonials');
  const blog = useSectionVisibility('blog');
  const gallery = useSectionVisibility('gallery');
  const contact = useSectionVisibility('contact');

  useEffect(() => {
    document.title = "A+ Engenharia e Segurança Ocupacional | Soluções Completas em Engenharia e Segurança";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {hero.isVisible && <Hero />}
        {about.isVisible && <About />}
        {services.isVisible && <Services />}
        {specializations.isVisible && <Specializations />}
        {technicalStandards.isVisible && <TechnicalStandards />}
        {caseStudies.isVisible && <CaseStudies />}
        {clients.isVisible && <Clients />}
        {stats.isVisible && <Stats />}
        {testimonials.isVisible && <Testimonials />}
        {blog.isVisible && <Blog />}
        {gallery.isVisible && <Gallery />}
        {contact.isVisible && <Contact />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
