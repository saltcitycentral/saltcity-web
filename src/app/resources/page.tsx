"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  FileText,
  BookOpen,
  MessageSquare,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RESOURCE_CATEGORIES, type ResourceCategory, type ResourceItem } from "./resourcesData";

function IconForCategory({ iconKey }: { iconKey: ResourceCategory["iconKey"] }) {
  const cls =
    "w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.18)]";
  switch (iconKey) {
    case "forms":
      return (
        <div className={cls}>
          <FileText size={26} />
        </div>
      );
    case "confessions":
      return (
        <div className={cls}>
          <MessageSquare size={26} />
        </div>
      );
    case "prayer":
      return (
        <div className={cls}>
          <Heart size={26} />
        </div>
      );
    case "study":
    default:
      return (
        <div className={cls}>
          <BookOpen size={26} />
        </div>
      );
  }
}

function KindPill({ kind, badge }: { kind: ResourceItem["kind"]; badge?: string }) {
  const label = badge ?? kind.toUpperCase();
  const icon =
    kind === "audio" ? <Play size={14} /> : <FileText size={14} />;

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-black text-xs font-semibold shadow">
      {icon}
      {label}
    </span>
  );
}

function ResourceCard({ r, priority }: { r: ResourceItem; priority?: boolean }) {
  const isExternal = Boolean(r.external) || r.kind === "link";

  const ActionButton = () => {
    if (isExternal) {
      return (
        <a
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
        >
          <ExternalLink size={16} />
          Open
        </a>
      );
    }

    if (r.kind === "audio") {
      return (
        <a
          href={r.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
        >
          <Play size={16} />
          Play / Download
        </a>
      );
    }

    // pdf | doc default to download
    return (
      <a
        href={r.href}
        download
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
      >
        <Download size={16} />
        Download
      </a>
    );
  };

  return (
    <div className="group rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_65px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1">
      {/* Cover */}
      <div className="relative aspect-[16/11] bg-neutral-100">
        {r.cover ? (
          <Image
            src={r.cover}
            alt={r.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 92vw, 380px"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div className="absolute top-4 left-4">
          <KindPill kind={r.kind} badge={r.badge} />
        </div>

        {r.fileSize && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-black/55 text-white text-xs font-semibold">
              {r.fileSize}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-7">
        <h3 className="font-black text-lg leading-snug mb-2">{r.title}</h3>
        <p className="text-sm text-black/70 leading-relaxed mb-6">{r.description}</p>

        <div className="flex items-center gap-3">
          <ActionButton />
        </div>
      </div>
    </div>
  );
}

function ScrollRail({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.82) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Buttons */}
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll left"
        className="hidden lg:grid absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 place-items-center rounded-full bg-white border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll right"
        className="hidden lg:grid absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 place-items-center rounded-full bg-white border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition"
      >
        <ChevronRight size={20} />
      </button>

      {/* Rail */}
      <div
        ref={ref}
        aria-label={ariaLabel}
        className={[
          "flex gap-8 overflow-x-auto pb-2",
          "scroll-smooth snap-x snap-mandatory",
          "pr-6",
          "[scrollbar-width:none] [-ms-overflow-style:none]",
        ].join(" ")}
      >
        {/* Hide webkit scrollbar */}
        <style>{`
          div[aria-label="${ariaLabel}"]::-webkit-scrollbar { display: none; }
        `}</style>

        {children}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Resources
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Download forms, confessions, and faith-building materials—beautifully organised and easy to access.
            </p>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <Container>
          <div className="space-y-24">
            {RESOURCE_CATEGORIES.map((category, idx) => (
              <div key={category.title}>
                {/* Header */}
                <div className="flex items-start gap-6 mb-10">
                  <IconForCategory iconKey={category.iconKey} />
                  <div className="pt-1">
                    <h2 className="text-3xl font-black">{category.title}</h2>
                    <p className="text-black/70 mt-2 max-w-2xl">{category.description}</p>

                    <div className="mt-4 text-sm text-black/60">
                      {category.resources.length} item{category.resources.length === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <ScrollRail ariaLabel={`Resources: ${category.title}`}>
                  {category.resources.map((r, i) => (
                    <div
                      key={r.id}
                      className="snap-start shrink-0 w-[86vw] sm:w-[420px] lg:w-[380px]"
                    >
                      <ResourceCard r={r} priority={idx === 0 && i < 2} />
                    </div>
                  ))}
                </ScrollRail>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">Need Something Specific?</h2>
            <p className="text-lg text-black/70 mb-8">
              If you can’t find what you’re looking for, reach out and we’ll send it.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
