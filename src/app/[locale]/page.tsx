import Essential from "@/components/sections/Essential";
import Hero from "@/components/sections/Hero";
import Moda from "@/components/sections/Moda";
import OurPhilosophy from "@/components/sections/OurPhilosophy";
import Popular from "@/components/sections/Popular";

export default function Home() {
  return (
    <>
      <Hero />
      <OurPhilosophy />
      <Popular side="left" isMain />
      <Essential />
      <Moda />
      <Popular side="right" isMain={false} />
    </>
  );
}
