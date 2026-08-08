import type { Metadata } from "next";
import EvangelismClient from "./EvangelismClient";

export const metadata: Metadata = {
  title: "Weekly Invite Report | SaltCity",
  description: "Log the guests you're bringing to church this Sunday.",
  robots: { index: false, follow: false }, // internal member tool — keep out of search
};

export default function EvangelismPage() {
  return <EvangelismClient />;
}
