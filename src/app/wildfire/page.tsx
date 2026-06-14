import type { Metadata } from "next";
import ProgramSignupClient, {
  type ProgramConfig,
} from "@/components/programs/ProgramSignupClient";

export const metadata: Metadata = {
  title: "Wildfire — Midnight Prayers | SaltCity",
  description:
    "Wildfire — 14 nights of midnight prayer, contending for breakthrough and revival. Midnight, June 15 – 28, 2026. Sign up.",
};

const config: ProgramConfig = {
  program: "wildfire",
  image: "/images/programs/wildfire-banner.jpg",
  imageAlt: "Wildfire — 14 Day Midnight Prayer Revival, 15 Jun to 28 Jun, 12:00 AM daily",
  kicker: "SaltCity Central · Midnight Prayers",
  title: "Wildfire — 14 Day Midnight Prayer Revival",
  tagline:
    "Fourteen nights of midnight prayer. Come contend in the place of fire — for breakthrough, revival, and the move of the Spirit.",
  schedule: [
    { label: "Time", value: "12:00 AM daily" },
    { label: "Duration", value: "14 nights" },
    { label: "Dates", value: "June 15 – 28, 2026" },
  ],
  accent: "#D7402B",
};

export default function WildfirePage() {
  return <ProgramSignupClient config={config} />;
}
