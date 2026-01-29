import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { Download, ExternalLink, FileText, BookOpen, MessageSquare, Heart, Play } from "lucide-react";
import { RESOURCE_CATEGORIES } from "./resourcesData";

function IconForCategory({ iconKey }: { iconKey: string }) {
  const cls = "w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.18)]";
  switch (iconKey) {
    case "forms":
      return <div className={cls}><FileText size={26} /></div>;
    case "confessions":
      return <div className={cls}><MessageSquare size={26} /></div>;
    case "prayer":
      return <div className={cls}><Heart size={26} /></div>;
    default:
      return <div className={cls}><BookOpen size={26} /></div>;
  }
}

function KindPill({ kind, badge }: { kind: string; badge?: string }) {
  const label = badge ?? kind.toUpperCase();
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-black text-xs font-semibold shadow">
      {kind === "video" ? <Play size={14} /> : <FileText size={14} />}
      {label}
    </span>
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
              <div key={idx}>
                {/* Category header */}
                <div className="flex items-start gap-6 mb-10">
                  <IconForCategory iconKey={category.iconKey} />
                  <div className="pt-1">
                    <h2 className="text-3xl font-black">{category.title}</h2>
                    <p className="text-black/70 mt-2 max-w-2xl">{category.description}</p>
                  </div>
                </div>

                {/* Resource grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.resources.map((r) => (
                    <div
                      key={r.id}
                      className="group rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_65px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Cover */}
                      <div className="relative aspect-[16/11] bg-neutral-100">
                        {r.cover ? (
                          <Image
                            src={r.cover}
                            alt={r.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            priority={idx === 0}
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

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          {r.external ? (
                            <a
                              href={r.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
                            >
                              <ExternalLink size={16} />
                              Open
                            </a>
                          ) : r.kind === "audio" ? (
                            <a
                              href={r.href}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
                            >
                              <Play size={16} />
                              Play / Download
                            </a>
                          ) : (
                            <a
                              href={r.href}
                              download
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
                            >
                              <Download size={16} />
                              Download
                            </a>
                          )}

                          {/* <span className="text-xs text-black/50">
                            Stored in <span className="font-semibold">/public/downloads</span>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">
              Need Something Specific?
            </h2>
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
