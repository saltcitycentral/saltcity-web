import type { Metadata } from "next";
import SpiritOfFaithClient from "./SpiritOfFaithClient";

export const metadata: Metadata = {
  title: "The Spirit of Faith — A Holy Ghost Meeting | SaltCity",
  description:
    "The Spirit of Faith Conference, June 26–28 — a Holy Ghost Meeting for spiritual renewal and city revival. Preparatory classes & fasting June 19–25, All-Night Prayers June 20. The Centre of Discipleship, 20 Okumagba Avenue, Warri.",
  openGraph: {
    title: "The Spirit of Faith — A Holy Ghost Meeting",
    description:
      "The Spirit of Faith Conference, June 26–28 at The Centre of Discipleship, Warri.",
    images: ["/images/spirit-of-faith/hero-water.jpg"],
  },
};

export default function Page() {
  return <SpiritOfFaithClient />;
}
