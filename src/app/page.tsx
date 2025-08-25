import { Footer7 } from "@/components/components/landingpage/footer";
import { NavbarLandingPage } from "@/components/components/navbar";
import { Feature } from "@/components/components/landingpage/feature";
import { Hero } from "@/components/components/landingpage/hero";
import { Stats } from "@/components/components/landingpage/stats";
import { Cta } from "@/components/components/landingpage/cta";
import { Testimonial } from "@/components/components/landingpage/testimonial";

export default function Home() {
  return (
    <>
      <NavbarLandingPage />
      <Hero />
      <Feature />
      <Stats />
      <Cta />
      <Testimonial />
      <Footer7 />
    </>
  );
}
