import { Timer, Zap, ZoomIn } from "lucide-react";

const features = [
  {
    icon: <Timer className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Pantau Mood Harian",
    description:
      "Catat dan pantau perasaanmu setiap hari dengan mudah. Dapatkan insight tentang pola emosionalmu.",
  },
  {
    icon: <Zap className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Self Help",
    description:
      "Akses tips dan teknik mengelola emosi, latihan pernapasan, dan panduan anger management.",
  },
  {
    icon: <ZoomIn className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Lapor Masalah",
    description:
      "Laporkan masalah bullying atau kekerasan dengan aman dan mendapat dukungan yang tepat.",
  },
  {
    icon: <ZoomIn className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Konten Edukasi",
    description:
      "Pelajari tentang kesehatan mental, anti-bullying, dan toleransi melalui konten yang menarik.",
  },
  {
    icon: <ZoomIn className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Rekap Mood",
    description:
      "Lihat progress dan perkembangan mood mingguan/bulanan dalam bentuk grafik yang mudah dipahami.",
  },
  {
    icon: <ZoomIn className="w-7 h-7 text-primary" aria-hidden="true" />,
    title: "Motivasi Harian",
    description:
      "Dapatkan kata-kata motivasi dan quote inspiratif setiap hari untuk menjaga semangat.",
  },
];

const Feature16 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-3xl mb-4 font-medium lg:text-4xl text-center">
            Fitur Unggulan
          </h2>
          <p className="mb-4 text-sm text-center text-muted-foreground lg:text-base max-w-lg">
            Platform komprehensif untuk mendukung kesehatan mental siswa dengan
            berbagai fitur yang mudah digunakan
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-2 p-16">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="rounded-xl bg-accent p-6 flex flex-col lg:flex-row gap-6"
              aria-labelledby={`feature-title-${idx}`}
            >
              <span className="flex items-center justify-center rounded-full bg-background w-14 h-14 mb-4 lg:mb-0">
                {feature.icon}
              </span>
              <div className="flex-1 text-center lg:text-left">
                <h3
                  className="mb-2 text-xl font-semibold"
                  id={`feature-title-${idx}`}
                >
                  {feature.title}
                </h3>
                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature16 };
