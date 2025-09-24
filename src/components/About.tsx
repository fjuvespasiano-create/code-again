const About = () => {
  return (
    <section id="sobre" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Equipe profissional de engenharia em reunião"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">Quem Somos</h2>
            <p className="text-lg text-muted-foreground">
              Desde 2016, a A+ Engenharia e Segurança Ocupacional oferece soluções técnicas especializadas em sistemas de proteção contra quedas em altura, atendendo diversos setores com inovação e qualidade.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Nossa História e Missão</h3>
              <p className="text-muted-foreground">
                A história da A+ Engenharia teve início em 2016, com o propósito de atender à crescente demanda do setor da construção civil por soluções técnicas voltadas ao dimensionamento de Linhas de Vida e demais sistemas de proteção contra quedas em altura.
              </p>
              <p className="text-muted-foreground">
                Evoluímos e expandimos nosso conhecimento técnico, permitindo atuar em outros segmentos como mineração, transporte, varejo e condomínios residenciais. Hoje, contamos com um portfólio diversificado e constantemente atualizado.
              </p>
              <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                <p className="font-semibold mb-2">Missão:</p>
                <p className="text-muted-foreground">
                  Proteger vidas por meio de soluções técnicas inteligentes e eficazes em engenharia de segurança, promovendo ambientes de trabalho mais seguros, eficientes e alinhados às normas vigentes.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Segurança em primeiro lugar</h4>
                <p className="text-sm text-muted-foreground">A integridade das pessoas está no centro de tudo o que fazemos</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Qualidade técnica</h4>
                <p className="text-sm text-muted-foreground">Entregamos projetos com precisão, sempre alinhados às normas e melhores práticas</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Inovação</h4>
                <p className="text-sm text-muted-foreground">Buscamos constantemente soluções modernas e eficazes para nossos clientes</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Comprometimento</h4>
                <p className="text-sm text-muted-foreground">Atuamos com responsabilidade, ética e foco em resultados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;