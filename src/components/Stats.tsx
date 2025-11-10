import { useSiteContent } from '@/hooks/useSiteContent';

const Stats = () => {
  const stat1Number = useSiteContent('stats_1_number');
  const stat1Label = useSiteContent('stats_1_label');
  const stat2Number = useSiteContent('stats_2_number');
  const stat2Label = useSiteContent('stats_2_label');
  const stat3Number = useSiteContent('stats_3_number');
  const stat3Label = useSiteContent('stats_3_label');
  const stat4Number = useSiteContent('stats_4_number');
  const stat4Label = useSiteContent('stats_4_label');
  
  const stats = [
    {
      number: stat1Number || "50+",
      label: stat1Label || "Projetos Realizados"
    },
    {
      number: stat2Number || "100%",
      label: stat2Label || "Conformidade NR"
    },
    {
      number: stat3Number || "24/7",
      label: stat3Label || "Suporte Técnico"
    },
    {
      number: stat4Number || "5★",
      label: stat4Label || "Avaliação Média"
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