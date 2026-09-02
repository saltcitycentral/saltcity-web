import type { Metadata } from "next";
import ClassSignupClient from "@/components/classes/ClassSignupClient";
import { WEEKDAY_CLASSES } from "@/lib/weekdayClasses";

const config = WEEKDAY_CLASSES["read-your-bible"];

export const metadata: Metadata = {
  title: "How To Read Your Bible",
  description:
    "How To Read Your Bible with Pastor Edison — a weekly class every Thursday, 6–7pm on Telegram. Register to join.",
  alternates: { canonical: "/read-your-bible" },
  openGraph: {
    title: "How To Read Your Bible — with Pastor Edison",
    description: "Every Thursday, 6–7pm on Telegram. Register to join.",
    images: [config.landscape],
  },
};

export default function ReadYourBiblePage() {
  return <ClassSignupClient config={config} />;
}
