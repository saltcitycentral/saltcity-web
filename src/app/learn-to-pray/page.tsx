import type { Metadata } from "next";
import ClassSignupClient from "@/components/classes/ClassSignupClient";
import { WEEKDAY_CLASSES } from "@/lib/weekdayClasses";

const config = WEEKDAY_CLASSES["learn-to-pray"];

export const metadata: Metadata = {
  title: "Learn How To Pray",
  description:
    "Learn How To Pray with Pastor Seun — a weekly class every Thursday, 6–7pm on Telegram. Register to join.",
  alternates: { canonical: "/learn-to-pray" },
  openGraph: {
    title: "Learn How To Pray — with Pastor Seun",
    description: "Every Thursday, 6–7pm on Telegram. Register to join.",
    images: [config.landscape],
  },
};

export default function LearnToPrayPage() {
  return <ClassSignupClient config={config} />;
}
