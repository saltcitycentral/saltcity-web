"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

type NavItem = {
  title: string;
  desc?: string;
  href: string;
};

type Expression = {
  title: string;
  handle: string;
  href: string;
  note?: string;
};

const TOP_ITEMS: NavItem[] = [
  {
    title: "The Faith Convention",
    desc: "MULTIPLY. 8–13 December, Warri.",
    href: "/tfc",
  },
  {
    title: "The Spirit of Faith",
    desc: "A Holy Ghost Meeting — Conference, June 26–28.",
    href: "/events/spirit-of-faith",
  },
  {
    title: "Attend Online",
    desc: "Watch a message live with our online community.",
    href: "https://www.youtube.com/@saltcitycentral",
  },
  { title: "Sermons", desc: "Teaching series and messages.", href: "/media/sermon-series" },
  {
  title: "Contact",
  desc: "Reach out, ask a question, or connect with us.",
  href: "/contact",
},
  { title: "Blog", desc: "Articles, stories, and updates.", href: "/blog" }, // Added Blog
  {
    title: "The CityBuilders",
    desc: "The NGO we founded — building cities by building people.",
    href: "/citybuilders",
  },
  { title: "Resources", desc: "Tools and guides to grow.", href: "/resources" },
  { title: "Give", desc: "Simple ways to give.", href: "/giving" },
  { title: "Who We Are", desc: "Our story, beliefs, leadership.", href: "/who-we-are" },
  { title: "Songs", desc: "Worship and sound doctrine.", href: "/songs" },
];

const QUICK_LINKS: NavItem[] = [
  { title: "Shop", href: "/shop" },
  { title: "Housekeeping", href: "/housekeeping" }, // Added Housekeeping
];

const EXPRESSIONS: Expression[] = [
  // ✅ replace handles/links with your real IG URLs if needed
  {
    title: "SaltCity Central",
    handle: "@saltcitycentral",
    href: "https://instagram.com/saltcitycentral",
    note: "Main expression",
  },
  {
    title: "Children Chapel",
    handle: "@saltcitychildren",
    href: "https://instagram.com/saltcity_children_chapel",
    note: "Kids ministry",
  },
  {
    title: "LifeCity",
    handle: "@thisislifecity",
    href: "https://instagram.com/thisislifecity",
    note: "Youth expression",
  },
  {
    title: "PTI Cityzens",
    handle: "@pticityzens",
    href: "https://instagram.com/pticityzens",
    note: "Campus expression",
  },
  {
    title: "FUPRE Cityzens",
    handle: "@fuprecityzens",
    href: "https://instagram.com/fuprecityzens",
    note: "Campus expression",
  },
  {
    title: "CityCentre",
    handle: "@mycitycentre",
    href: "https://instagram.com/mycitycentre",
    note: "Community expression",
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

/**
 * The menu. A black panel comes down over the page like a blind; the links,
 * set large, rise out of their lines behind it. Reach for one and the others
 * step back. The styles are .sc-menu-* in globals.css.
 */
export default function MenuOverlay({ open, onClose }: Props) {
  // Mount first, then open on the next frame so the transition has a start.
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!open) {
      const t = requestAnimationFrame(() => setActive(false));
      return () => cancelAnimationFrame(t);
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      setMounted(true);
      inner = requestAnimationFrame(() => setActive(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose]);

  // Unmount once the blind has gone back up.
  useEffect(() => {
    if (!mounted || open) return;
    const timeout = window.setTimeout(() => setMounted(false), 850);
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={["sc-menu fixed inset-0 z-50", active ? "is-open" : ""].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="sc-menu-panel absolute inset-0 flex flex-col bg-[#0b0b0b] text-white">
        {/* Top bar, in the header's place */}
        <Container>
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="flex items-center" onClick={onClose}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.svg" alt="SaltCity" className="h-8 w-auto" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              <span>Close</span>
              <span className="sc-close" aria-hidden="true" />
            </button>
          </div>
        </Container>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Container>
            <div className="grid gap-14 pb-16 pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:pt-12">
              {/* The pages, set large */}
              <nav aria-label="Pages">
                <ul className="sc-menu-list">
                  {TOP_ITEMS.map((x, i) => {
                    const ext = isExternal(x.href);
                    return (
                      <li key={x.title}>
                        <Link
                          href={x.href}
                          onClick={onClose}
                          target={ext ? "_blank" : undefined}
                          rel={ext ? "noopener noreferrer" : undefined}
                          className="sc-menu-link sc-menu-rise py-[0.18em] text-[clamp(1.9rem,4.6vw,3.9rem)] font-black leading-[1.02] tracking-tight"
                        >
                          <span style={{ ["--i" as string]: i }}>
                            {x.title}
                            <span className="sc-menu-arrow ml-[0.35em] text-[0.6em]" aria-hidden="true">
                              {ext ? "↗" : "→"}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Everything smaller */}
              <div className="space-y-12 lg:pt-3">
                <div className="sc-menu-fade" style={{ ["--i" as string]: 0 }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
                    Expressions
                  </div>
                  <ul className="mt-4 border-t border-white/12">
                    {EXPRESSIONS.map((x) => (
                      <li key={x.title}>
                        <a
                          href={x.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline justify-between gap-4 border-b border-white/12 py-3.5"
                        >
                          <span className="font-bold">{x.title}</span>
                          <span className="text-sm text-white/45 transition-colors group-hover:text-white">
                            {x.handle} ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sc-menu-fade" style={{ ["--i" as string]: 1 }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
                    Also
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                    {QUICK_LINKS.map((x) => (
                      <li key={x.title}>
                        <Link href={x.href} onClick={onClose} className="sc-link text-sm text-white">
                          {x.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sc-menu-fade text-sm leading-relaxed text-white/55" style={{ ["--i" as string]: 2 }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
                    Join us
                  </div>
                  <p className="mt-4">
                    Sundays, 9:00 AM
                    <br />
                    20 Okumagba Avenue, Warri
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
