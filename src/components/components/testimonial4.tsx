import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const cardItems = [
  {
    name: "Doni Wicaksana",
    role: "Siswa",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    testimonial:
      "Awalnya aku jarang memperhatikan mood sendiri, tapi sejak pakai Appiks, aku jadi lebih peka sama perasaanku. Fitur catat mood hariannya gampang banget dipakai, dan tips self-help-nya bener-bener membantu pas lagi down.",
  },
  {
    name: "Adi Wirawan",
    role: "Guru BK",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    testimonial:
    "Dengan Appiks, saya mendapat data yang jelas dan real-time tentang kondisi emosional siswa. Ini sangat membantu dalam menentukan prioritas tindak lanjut dan memberikan bimbingan yang tepat.",
  },
  {
    name: "Grace Wijaya",
    role: "Wali Kelas",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    testimonial:
      "Appiks memudahkan saya memantau kondisi siswa tanpa harus menunggu sampai ada masalah besar. Saya bisa tahu siapa yang sedang butuh perhatian lebih dan menghubungi mereka lebih cepat.",
  },
];

const Testimonial4 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-3xl mb-4 font-medium lg:text-4xl text-center">
            Bagaimana Appiks Membantu Mereka?
          </h2>
          <p className="mb-4 text-sm text-center text-muted-foreground lg:text-base max-w-xl">
            Ribuan Pengguna Telah Memulai Perjalanan Self-Awareness Bersama Kami
          </p>
        </div>
        <div className="flex flex-col mt-14 lg:mt-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {cardItems.map((item) => (
              <Card
                key={item.name}
                className="h-full flex flex-col justify-between"
              >
                <CardFooter>
                  <div className="flex gap-4 items-center">
                    <Avatar className="size-10 rounded-full ring-1 ring-input">
                      <AvatarImage src={item.avatar} alt={item.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </CardFooter>
                <CardContent className="px-6 leading-7 text-foreground/70">
                  <blockquote className="italic text-base mt-2">
                    &ldquo;{item.testimonial}&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonial4 };
