import { ArrowRight } from "lucide-react";

interface Stats8Props {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats8 = ({
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",
  link = {
    text: "Read the full impact report",
    url: "https://www.shadcnblocks.com",
  },
  stats = [
    {
      id: "stat-1",
      value: "95%",
      label: "Siswa merasa lebih baik",
    },
    {
      id: "stat-2",
      value: "92%",
      label: "Berkurangnya kasus bullying",
    },
    {
      id: "stat-3",
      value: "89%",
      label: "Peningkatan awareness",
    },
    {
      id: "stat-4",
      value: "1000+",
      label: "Siswa terdaftar",
    },
  ],
}: Stats8Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-3xl mb-4 font-medium lg:text-4xl text-center">
            Dampak Positif
          </h2>
          <p className="mb-4 text-sm text-center text-muted-foreground lg:text-base max-w-lg">
            Bersama appiks.id, mari ciptakan lingkungan yang lebih sehat untuk semua siswa
          </p>
        </div>
        <div className="mt-14 lg:mt-20 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5 justify-center items-center">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };
