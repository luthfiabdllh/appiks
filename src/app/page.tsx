import { Footer7 } from "@/components/components/footer";
import { Navbar } from "@/components/components/navbar";
import { Feature } from "@/components/components/feature";
import { Hero } from "@/components/components/hero";
import { Stats } from "@/components/components/stats";
import { Cta } from "@/components/components/cta";
import { Testimonial } from "@/components/components/testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Stats />
      <Cta />
      <Testimonial />
      <Footer7 />
    </>
  );
}
