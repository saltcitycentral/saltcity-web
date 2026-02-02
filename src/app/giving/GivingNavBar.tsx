"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; href: string };

const TABS: Tab[] = [
  { label: "Why We Give", href: "/giving" },
  { label: "How to Give", href: "/giving/ways" },
  { label: "FAQ", href: "/giving/faq" },
];

const TEAL = "#1f71be";

export default function GivingNavBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/giving" ? pathname === "/giving" : pathname.startsWith(href);

  return (
    <nav className="w-full bg-white border-b border-black/10 sticky top-[73px] z-30">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-1 h-14">
          {TABS.map((t) => {
            const active = isActive(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`relative px-6 h-full flex items-center text-sm font-semibold transition-colors ${
                  active ? "text-black" : "text-black/50 hover:text-black/75"
                }`}
              >
                {t.label}
                {active && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[3px]" 
                    style={{ background: TEAL }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? "text-white"
                      : "bg-neutral-100 text-black/70 hover:bg-neutral-200"
                  }`}
                  style={active ? { background: TEAL } : {}}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}