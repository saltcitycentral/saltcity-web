import Hero from "@/components/home/Hero";
import NextSteps from "@/components/home/NextSteps";
import NewHere from "@/components/home/NewHere";
import CityBuildersStrip from "@/components/home/CityBuildersStrip";
import ListenToSermons from "@/components/home/BibleApp";
import OpenNetworkStrip from "@/components/layout/OpenNetworkStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <NextSteps />
      <NewHere />
      <CityBuildersStrip />
      <ListenToSermons />
      <OpenNetworkStrip />
    </main>
  );
}