import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import { RESOURCE_CATEGORIES, type ResourceItem } from "./resourcesData";
import { FILE_SIZES } from "./fileSizes";

export const metadata: Metadata = {
  title: "Resources",
  description: "Download forms, confessions, and faith-building materials.",
};

function sizeOf(href: string) {
  return FILE_SIZES[href] ?? "";
}

type Action = { label: string; href: string; download: boolean; external: boolean; size: string };

function actionFor(r: ResourceItem): Action {
  const external = Boolean(r.external) || r.kind === "link";
  if (external) return { label: "Open", href: r.href, download: false, external: true, size: "" };
  if (r.kind === "audio") return { label: "Listen", href: r.href, download: false, external: false, size: sizeOf(r.href) };
  return { label: "Download", href: r.href, download: true, external: false, size: sizeOf(r.href) };
}

/**
 * A written version and its audio are listed as two entries in the data. Here
 * they become one row with two things to do: "Prosperity Rhapsodies (Audio)"
 * folds into "Prosperity Rhapsodies".
 */
function mergeFormats(resources: ResourceItem[]) {
  const rows: { item: ResourceItem; actions: Action[] }[] = [];
  for (const r of resources) {
    const base = r.title.replace(/\s*\(audio\)\s*$/i, "");
    const twin = base !== r.title ? rows.find((row) => row.item.title === base) : undefined;
    if (twin) twin.actions.push(actionFor(r));
    else rows.push({ item: r, actions: [actionFor(r)] });
  }
  return rows;
}

function ActionLink({ a }: { a: Action }) {
  return (
    <a
      href={a.href}
      {...(a.download ? { download: true } : {})}
      {...(a.external || !a.download ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="sc-link text-sm"
    >
      {a.label}
      <span aria-hidden="true">{a.download ? "↓" : "↗"}</span>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <main data-home>
      {/* Opening */}
      <section className="bg-white">
        <Container>
          <div className="pb-14 pt-16 md:pb-20 md:pt-24">
            <div
              className="sc-fade text-xs font-bold uppercase tracking-[0.28em] text-black/50"
              style={{ ["--i" as string]: 0 }}
            >
              Free to download
            </div>
            <h1 className="mt-5 text-[clamp(3.25rem,12.5vw,11rem)] font-black leading-[0.86] tracking-tight">
              <span className="sc-line" style={{ ["--i" as string]: 0 }}>
                <span>Resources</span>
              </span>
            </h1>
            <p
              className="sc-fade mt-8 max-w-[34rem] text-lg leading-relaxed text-black/70 md:text-xl"
              style={{ ["--i" as string]: 2 }}
            >
              Download forms, confessions, and faith-building materials.
            </p>

            <nav
              aria-label="On this page"
              className="sc-fade mt-10 flex flex-wrap gap-x-8 gap-y-3"
              style={{ ["--i" as string]: 3 }}
            >
              {RESOURCE_CATEGORIES.map((c, i) => (
                <a key={c.title} href={`#section-${i + 1}`} className="sc-link text-sm">
                  {c.title}
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      {RESOURCE_CATEGORIES.map((category, idx) => {
        const withCovers = category.iconKey === "study";
        const rows = mergeFormats(category.resources);

        return (
          <section
            key={category.title}
            id={`section-${idx + 1}`}
            className="scroll-mt-24 border-t border-black/10 bg-white"
          >
            <Container>
              <div className="grid gap-10 py-20 md:grid-cols-12 md:gap-16 md:py-28">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <div data-reveal className="text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{idx + 1}
                    </div>
                    <h2
                      data-reveal
                      style={{ ["--d" as string]: 60 }}
                      className="mt-4 text-[clamp(2.25rem,4.4vw,3.75rem)] font-black leading-[0.95] tracking-tight"
                    >
                      {category.title}
                    </h2>
                    <p
                      data-reveal
                      style={{ ["--d" as string]: 120 }}
                      className="mt-5 max-w-[24rem] text-lg leading-relaxed text-black/65"
                    >
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  {withCovers ? (
                    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                      {rows.map(({ item, actions }, i) => (
                        <div key={item.id}>
                          <div data-reveal="shutter" style={{ ["--d" as string]: i * 90 }}>
                            <a
                              href={actions[0].href}
                              download
                              aria-label={`Download ${item.title}`}
                              className="group relative block aspect-[16/11] overflow-hidden border border-black/10 bg-neutral-100"
                            >
                              {item.cover ? (
                                <Image
                                  src={item.cover}
                                  alt=""
                                  fill
                                  sizes="(max-width: 640px) 100vw, 380px"
                                  quality={75}
                                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                                />
                              ) : null}
                            </a>
                          </div>
                          <div data-reveal style={{ ["--d" as string]: i * 90 + 120 }} className="mt-5">
                            <h3 className="text-xl font-black leading-snug tracking-tight md:text-2xl">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-base leading-relaxed text-black/65">{item.description}</p>
                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                              {actions.map((a) => (
                                <ActionLink key={a.href} a={a} />
                              ))}
                              <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                                PDF{actions[0].size ? ` · ${actions[0].size}` : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="border-t border-black/10">
                      {rows.map(({ item, actions }, i) => (
                        <li
                          key={item.id}
                          data-reveal
                          style={{ ["--d" as string]: Math.min(i, 6) * 50 }}
                          className="sc-step flex-wrap sm:flex-nowrap"
                          // The row itself is not a link, so it keeps its place on hover.
                        >
                          <div className="min-w-0 flex-1 basis-full sm:basis-0">
                            <h3 className="text-xl font-black leading-snug tracking-tight md:text-2xl">
                              {item.title}
                            </h3>
                            <p className="mt-1.5 max-w-[34rem] text-base leading-relaxed text-black/65">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2">
                            {actions.map((a) => (
                              <span key={a.href} className="flex items-baseline gap-2.5">
                                <ActionLink a={a} />
                                {a.size ? (
                                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
                                    {a.size}
                                  </span>
                                ) : null}
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Closing */}
      <section className="bg-black text-white">
        <Container>
          <div className="py-24 md:py-32">
            <h2
              data-reveal
              className="max-w-[14ch] text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
            >
              Need Something Specific?
            </h2>
            <p
              data-reveal
              style={{ ["--d" as string]: 80 }}
              className="mt-7 max-w-[32rem] text-lg leading-relaxed text-white/75"
            >
              If you can’t find what you’re looking for, reach out and we’ll send it.
            </p>
            <div
              data-reveal
              style={{ ["--d" as string]: 160 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href="/contact"
                className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
              >
                Contact Us
              </Link>
              <Link href="/media" className="sc-link text-sm text-white">
                Sermons
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <HomeMotion />
    </main>
  );
}
