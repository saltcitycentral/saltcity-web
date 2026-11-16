import Link from "next/link";
import Container from "@/components/ui/Container";

/** The closing row of each page: one large link on to the next. */
export default function NextPage({ label, title, href }: { label: string; title: string; href: string }) {
  return (
    <section className="bg-white">
      <Container>
        <div data-reveal>
          <Link href={href} className="sc-step" style={{ padding: "clamp(3rem, 7vw, 5rem) 0", borderBottom: 0 }}>
            <span className="flex-1">
              <span className="block text-xs font-bold uppercase tracking-[0.28em] text-black/50">{label}</span>
              <span className="mt-4 block text-[clamp(2.25rem,6vw,5rem)] font-black leading-[0.95] tracking-tight">
                {title}
              </span>
            </span>
            <span className="sc-step-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
