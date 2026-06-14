import type { Metadata } from "next";
import ProgramSignupClient, {
  type ProgramConfig,
} from "@/components/programs/ProgramSignupClient";

export const metadata: Metadata = {
  title: "Finding Your Assignment | SaltCity",
  description:
    "Finding Your Assignment — 21 mornings of seeking GOD for clarity, direction, and purpose in the kingdom. 5:00 AM daily, June 15 – July 5, 2026. Sign up.",
};

const config: ProgramConfig = {
  program: "assignment",
  image: "/images/programs/assignment-banner.jpg",
  imageAlt: "Finding Your Assignment in the Kingdom — Mon 15th Jun to Sun 5th Jul, 5AM daily",
  kicker: "SaltCity Central · Kingdom",
  title: "Finding Your Assignment in the Kingdom",
  tagline:
    "Twenty-one mornings of seeking GOD for clarity, direction, and purpose — discovering what He has called you to do in the kingdom.",
  schedule: [
    { label: "Time", value: "5:00 AM daily" },
    { label: "Duration", value: "21 days" },
    { label: "Dates", value: "June 15 – July 5, 2026" },
  ],
  accent: "#B8862F",
};

export default function AssignmentPage() {
  return <ProgramSignupClient config={config} />;
}
