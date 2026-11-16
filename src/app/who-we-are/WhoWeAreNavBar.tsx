"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What to Expect", href: "/who-we-are/what-to-expect" },
  { label: "Our Beliefs", href: "/who-we-are/our-beliefs" },
];

function isActive(pathname: string, href: string) {
  if (href === "/who-we-are") return pathname === "/who-we-are";
  return pathname.startsWith(href);
}

export default function WhoWeAreNavBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Who We Are" className="sticky top-[73px] z-30 w-full border-b border-black/10 bg-white">
      <div className="no-scrollbar mx-auto flex w-full max-w-[1200px] gap-6 overflow-x-auto px-6 sm:gap-10">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex h-12 shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.18em] transition-colors sm:text-xs sm:tracking-[0.2em] ${
                active ? "text-black" : "text-black/45 hover:text-black"
              }`}
            >
              {t.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-black transition-transform duration-500 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
