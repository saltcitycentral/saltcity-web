"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SectionTab = { label: string; href: string };

/**
 * The tabs under the header on a section with a few pages (Who We Are,
 * Giving). The first tab is the section's own page and matches exactly; the
 * others match their path and anything below it.
 */
export default function SectionTabs({ tabs, label }: { tabs: SectionTab[]; label: string }) {
  const pathname = usePathname();
  const root = tabs[0]?.href;
  const isActive = (href: string) => (href === root ? pathname === href : pathname.startsWith(href));

  return (
    <nav aria-label={label} className="sticky top-[73px] z-30 w-full border-b border-black/10 bg-white">
      <div className="no-scrollbar mx-auto flex w-full max-w-[1200px] gap-6 overflow-x-auto px-6 sm:gap-10">
        {tabs.map((t) => {
          const active = isActive(t.href);
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
