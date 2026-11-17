import SectionTabs from "@/components/nav/SectionTabs";

const TABS = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What to Expect", href: "/who-we-are/what-to-expect" },
  { label: "Our Beliefs", href: "/who-we-are/our-beliefs" },
];

export default function WhoWeAreNavBar() {
  return <SectionTabs tabs={TABS} label="Who We Are" />;
}
