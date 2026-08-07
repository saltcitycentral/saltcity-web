import type { Metadata } from "next";
import FathersBlessingClient from "./FathersBlessingClient";

export const metadata: Metadata = {
  title: "A Father's Blessing | SaltCity",
  description:
    "A Father's Blessing — an evening for pastors and ministers. Wednesday, August 19, 2026, 5pm at 20 Okumagba Avenue, Warri. Register to attend.",
  openGraph: {
    title: "A Father's Blessing",
    description:
      "An evening for pastors and ministers. Wednesday, August 19, 2026, 5pm · 20 Okumagba Avenue, Warri.",
    images: ["/images/fathers-blessing/poster.jpg"],
  },
};

export default function FathersBlessingPage() {
  return <FathersBlessingClient />;
}
