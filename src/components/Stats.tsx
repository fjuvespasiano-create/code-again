const Stats = () => {
  const stats = [
    {
      number: "50+",
      label: "Projetos Realizados"
    },
    {
      number: "100%",
      label: "Conformidade NR"
    },
    {
      number: "24/7",
      label: "Suporte Técnico"
    },
    {
      number: "5★",
      label: "Avaliação Média"
    }
  ];

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">{stat.number}</div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;