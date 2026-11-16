"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import MenuOverlay from "@/components/nav/MenuOverlay";

const MAIN_LINKS = [
  { label: "Watch Online", href: "https://www.youtube.com/@saltcitycentral" },
  { label: "Sermons", href: "/media/sermon-series" },
  { label: "Resources", href: "/resources" },
  { label: "Give", href: "/giving" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Songs", href: "/songs" },
];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overlayWanted, setOverlayWanted] = useState(false);

  // Detect hero pages
  useEffect(() => {
    const check = () => {
      setOverlayWanted(
        !!document.querySelector('[data-header-overlay="true"]')
      );
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

useEffect(() => {
  if (!menuOpen) return;

  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  const prevOverflow = document.body.style.overflow;
  const prevPaddingRight = document.body.style.paddingRight;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;

  return () => {
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPaddingRight;
  };
}, [menuOpen]);

  const overlayActive = overlayWanted && !scrolled;

  // 🔹 TRUE TRANSPARENT HEADER
  const headerClass = overlayActive
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-black/5";

  const navLinkClass = overlayActive
    ? "text-white/85 hover:text-white drop-shadow"
    : "text-black/55 hover:text-black";

  const rightTextClass = overlayActive
    ? "text-white/90 hover:text-white drop-shadow"
    : "text-black/65 hover:text-black";

  const logoSrc = overlayActive ? "/logo-white.svg" : "/logo.svg";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300",
          headerClass,
        ].join(" ")}
      >
        <Container>
          <nav className="flex items-center justify-between py-5">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <img src={logoSrc} alt="SaltCity" className="h-8 w-auto" />
              </Link>

              <ul className="hidden lg:flex items-center gap-6">
                {MAIN_LINKS.map((item) => {
                  const isExternal = item.href.startsWith("http");
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={[
                          "text-xs font-semibold uppercase tracking-wide transition-colors",
                          navLinkClass,
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className={[
                  "sc-menu-btn flex items-center gap-3.5 py-1 uppercase text-xs font-bold tracking-[0.2em] transition-colors",
                  rightTextClass,
                ].join(" ")}
              >
                <span>Menu</span>
                <span className="sc-burger" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ✅ Spacer ONLY when NOT overlay */}
      {!overlayActive && <div className="h-[73px]" />}

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
