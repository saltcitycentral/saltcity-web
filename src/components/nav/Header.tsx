"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import MenuOverlay from "@/components/nav/MenuOverlay";

const MAIN_LINKS = [
  { label: "Watch Online", href: "https://www.youtube.com/@saltcitycentral" },
  { label: "Sermons", href: "/media/sermon-series" }, // Updated this line
  { label: "Resources", href: "/resources" },
  { label: "Give", href: "/giving" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Songs", href: "/songs" }, // Bonus: You can also link songs directly
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white border-b border-black/5"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between py-5">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center cursor-pointer">
                <img src="/logo.svg" alt="SaltCity" className="h-8 w-auto" />
              </Link>

              <ul className="hidden lg:flex items-center gap-6">
                {MAIN_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs font-semibold uppercase tracking-wide text-black/50 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="hidden sm:flex cursor-pointer items-center gap-2 uppercase text-xs font-semibold tracking-wide text-black/60 hover:text-black transition-colors"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full border border-black/15 text-black/50">
                  <User className="h-4 w-4" />
                </div>
                <span>LOG IN</span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex cursor-pointer items-center gap-3 uppercase text-xs font-semibold tracking-wide text-black/60 hover:text-black transition-colors"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
              >
                <div className="grid gap-1">
                  <span className="block h-[2px] w-5 bg-black/60 transition-all" />
                  <span className="block h-[2px] w-5 bg-black/60 transition-all" />
                  <span className="block h-[2px] w-5 bg-black/60 transition-all" />
                </div>
                <span>MENU</span>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-[73px]" />

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}