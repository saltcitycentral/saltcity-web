import SectionTabs from "@/components/nav/SectionTabs";

const TABS = [
  { label: "Why We Give", href: "/giving" },
  { label: "How to Give", href: "/giving/ways" },
  { label: "FAQ", href: "/giving/faq" },
];

export default function GivingNavBar() {
  return <SectionTabs tabs={TABS} label="Giving" />;
}
