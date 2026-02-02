"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import { User, Instagram, ArrowUpRight } from "lucide-react";
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
    title: "Attend Online",
    desc: "Watch a message live with our online community.",
    href: "https://www.youtube.com/@saltcitycentral",
  },
  { title: "Sermons", desc: "Teaching series and messages.", href: "/media/sermon-series" },
  { title: "Resources", desc: "Tools and guides to grow.", href: "/resources" },
  { title: "Give", desc: "Simple ways to give.", href: "/giving" },
  { title: "Who We Are", desc: "Our story, beliefs, leadership.", href: "/who-we-are" },
  { title: "Songs", desc: "Worship and sound doctrine.", href: "/songs" },
];

const QUICK_LINKS: NavItem[] = [
  { title: "Shop", href: "/shop" },
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
    href: "https://instagram.com/saltcitychildren",
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

export default function MenuOverlay({ open, onClose }: Props) {
  // Two-step animation: mount first, then animate in next frame.
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!open) {
      setActive(false);
      return;
    }
    setMounted(true);
    const t = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose]);

  // Unmount after close transition
  useEffect(() => {
    if (!mounted) return;
    if (open) return;

    const timeout = window.setTimeout(() => setMounted(false), 240);
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  const ExpressionCards = useMemo(() => {
    return EXPRESSIONS.map((x) => (
      <a
        key={x.title}
        href={x.href}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "group rounded-2xl border border-black/10 bg-white",
          "px-5 py-4",
          "shadow-[0_10px_40px_rgba(0,0,0,0.06)]",
          "hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)] hover:-translate-y-[1px]",
          "transition-all duration-200",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-black/90 truncate">
              {x.title}
            </div>
            <div className="mt-1 text-xs text-black/55 truncate">{x.handle}</div>
            {x.note ? (
              <div className="mt-2 text-xs text-black/60 leading-relaxed">
                {x.note}
              </div>
            ) : null}
          </div>

          <div
            className={[
              "shrink-0 grid place-items-center",
              "h-10 w-10 rounded-full border border-black/10",
              "text-black/60",
              "group-hover:text-black group-hover:border-black/20",
              "transition-colors",
            ].join(" ")}
            aria-hidden="true"
          >
            <Instagram className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-black/60 group-hover:text-black transition-colors">
          View on Instagram
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </a>
    ));
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={[
          "absolute inset-0",
          "bg-black/35 backdrop-blur-[2px]",
          "transition-opacity duration-200",
          active ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        className={[
          "absolute inset-0 bg-white",
          "transition-transform duration-200 ease-out",
          "will-change-transform",
          active ? "translate-y-0" : "-translate-y-3",
        ].join(" ")}
      >
        {/* Top bar mirrors header */}
        <div className="border-b border-black/10">
          <Container>
            <div className="flex items-center justify-between py-6">
              <Link href="/" className="flex items-center" onClick={onClose}>
                <img src="/logo.svg" alt="SaltCity" className="h-6 w-auto" />
              </Link>

              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="hidden sm:flex items-center gap-2 uppercase text-sm font-semibold tracking-wide text-black/70 hover:text-black"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-full border border-black/20 text-black/50">
                    <User className="h-4 w-4" />
                  </div>
                  <span>LOG IN</span>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-3 uppercase text-sm font-semibold tracking-wide text-black/70 hover:text-black"
                  aria-label="Close menu"
                >
                  <span className="text-xl leading-none">×</span>
                  <span>MENU</span>
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-81px)] overflow-y-auto">
          <Container>
            <div className="py-10">
              {/* Header block */}
              <div className="mb-10">
                <div className="text-xs font-bold uppercase tracking-wider text-black/45">
                  Navigation
                </div>
                <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-black">
                  Welcome to SaltCity
                </div>
                <div className="mt-3 max-w-2xl text-sm text-black/65 leading-relaxed">
                  Find where you belong and stay connected with what God is doing across our expressions.
                </div>
              </div>

              {/* Layout */}
              <div className="grid gap-10 lg:grid-cols-12">
                {/* LEFT: Explore */}
                <div className="lg:col-span-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-black/45">
                    Explore
                  </div>

                  <div className="mt-5 space-y-2">
                    {TOP_ITEMS.map((x) => {
                      const ext = isExternal(x.href);
                      return (
                        <Link
                          key={x.title}
                          href={x.href}
                          onClick={onClose}
                          target={ext ? "_blank" : undefined}
                          rel={ext ? "noopener noreferrer" : undefined}
                          className={[
                            "block rounded-xl border border-black/10 bg-white",
                            "px-4 py-3",
                            "hover:border-black/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]",
                            "transition-all duration-200",
                          ].join(" ")}
                        >
                          <div className="text-sm font-extrabold text-black/90">
                            {x.title}
                          </div>
                          {x.desc ? (
                            <div className="mt-1 text-xs text-black/60 leading-relaxed">
                              {x.desc}
                            </div>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Quick links */}
                  <div className="mt-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-black/45">
                      Quick links
                    </div>
                    <div className="mt-4 space-y-2">
                      {QUICK_LINKS.map((x) => (
                        <Link
                          key={x.title}
                          href={x.href}
                          onClick={onClose}
                          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black/70 hover:text-black hover:border-black/25 transition"
                        >
                          {x.title}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Expressions */}
                <div className="lg:col-span-8">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-black/45">
                        Expressions
                      </div>
                      <div className="mt-2 text-xl md:text-2xl font-extrabold text-black">
                        Follow the one closest to you.
                      </div>
                      <div className="mt-2 text-sm text-black/60 max-w-2xl">
                        Each expression shares updates, gatherings, and moments on Instagram.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {ExpressionCards}
                  </div>

                  <div className="mt-10 border-t border-black/10 pt-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-black/45">
                      About
                    </div>
                    <div className="mt-2 text-sm text-black/65">
                      Want leadership, beliefs, and our story? Use{" "}
                      <Link href="/who-we-are" onClick={onClose} className="font-semibold text-black underline">
                        Who We Are
                      </Link>
                      .
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom spacing */}
              <div className="h-10" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
