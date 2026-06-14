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
  kicker: "SaltCity Central · Midnight Prayers",
  title: "Wildfire",
  tagline:
    "Fourteen nights of midnight prayer. Come contend in the place of fire — for breakthrough, revival, and the move of the Spirit.",
  schedule: [
    { label: "Prayers", value: "Midnight · 12:00 AM" },
    { label: "Duration", value: "14 nights" },
    { label: "Dates", value: "June 15 – 28, 2026" },
  ],
  startNote: "Starts June 15, 2026",
  accent: "#D7402B",
};

export default function WildfirePage() {
  return <ProgramSignupClient config={config} />;
}
