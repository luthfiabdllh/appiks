import { Button } from "@/components/ui/button";
import Image from "next/image";

const Cta = () => {
  return (
    <section>
      <div className="container">
        <div className="bg-muted grid items-center gap-8 lg:grid-cols-2">
          <Image
            width={500}
            height={500}
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder hero"
            className="h-full w-full object-cover"
          />
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Siap Memulai Perjalanan Kesehatan Mentalmu?
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Kenali mood-mu, ceritakan jika ada yang mengganggu, dan temukan dukungan yang kamu butuhkan di sini.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="rounded-full" size="lg">
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta };
