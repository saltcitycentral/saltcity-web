import HeroStill from "@/components/home/HeroStill";
import HomeLoader from "@/components/home/HomeLoader";
import HomeMotion from "@/components/home/HomeMotion";
import NextSteps from "@/components/home/NextSteps";
import NewHere from "@/components/home/NewHere";
import CityBuildersStrip from "@/components/home/CityBuildersStrip";
import ListenToSermons from "@/components/home/BibleApp";
import OpenNetworkStrip from "@/components/layout/OpenNetworkStrip";

export default function Home() {
  return (
    <main data-home>
      <HomeLoader />
      <HeroStill />
      <NextSteps />
      <NewHere />
      <CityBuildersStrip />
      <ListenToSermons />
      <OpenNetworkStrip />
      <HomeMotion />
    </main>
  );
}
