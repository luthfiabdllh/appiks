import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero34 = () => {
  return (
    <section>
      <div className="container">
        <div className="bg-muted grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Platform Kesehatan Mental untuk Siswa
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Pantau mood harianmu, dapatkan dukungan, dan jaga kesehatan mentalmu bersama appiks.id
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="rounded-full" size="lg">
                Mulai Sekarang
              </Button>
              <Button variant="outline" className="rounded-full" size="lg">Pelajari Lebih Lanjut</Button>
            </div>
          </div>
          <Image
            width={500}
            height={500}
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero34 };
