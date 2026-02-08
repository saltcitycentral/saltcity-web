"use client";

import Image from "next/image";
import Link from "next/link";

const TEAL = "#08b6a6";
const PRICE = 10000;

// ✅ Put your WhatsApp number here (international format, no +)
// example: "2348012345678"
const WHATSAPP_NUMBER = "2348030597015";

const ITEMS = [
  {
    title: "Raising Mighty Men Tee",
    image: "/images/shop1.jpeg",
  },
  {
    title: "Fit For Use Tee",
    image: "/images/shop2.jpeg",
  },
  {
    title: "I Am A Disciple Tee",
    image: "/images/shop2.jpeg",
  },
  {
    title: "Fit For Use (Back Print) Tee",
    image: "/images/shop3.jpeg",
  },
];

function naira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

export default function ShopPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/15" />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
              style={{ background: "rgba(8,182,166,0.22)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <span className="h-2 w-2 rounded-full bg-white/80" />
              SaltCity Shop
            </div>

            <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-white">
              Merch
            </h1>

            <p className="mt-5 text-lg text-white/90 leading-relaxed">
              Simple. Clean. Wear the message.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((item) => {
              const msg = `Hi SaltCity, I want to order: ${item.title} (${naira(PRICE)}).`;
              const href =
                WHATSAPP_NUMBER.includes("X")
                  ? "#"
                  : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden"
                >
                  <div className="relative aspect-square bg-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 360px, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-lg font-bold text-black">{item.title}</div>
                    <div className="mt-2 text-2xl font-black" style={{ color: TEAL }}>
                      {naira(PRICE)}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={href}
                        target={href === "#" ? undefined : "_blank"}
                        className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors"
                        style={{ background: TEAL }}
                      >
                        Order on WhatsApp
                      </Link>
                    </div>

                    {href === "#" ? (
                      <p className="mt-3 text-xs text-black/55">
                        Set your WhatsApp number inside <span className="font-semibold">app/shop/page.tsx</span> to enable ordering.
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-sm text-black/60">
            Want to give instead?{" "}
            <Link href="/giving" className="font-semibold" style={{ color: TEAL }}>
              Go to Giving
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
