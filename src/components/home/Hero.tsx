"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  const [ready, setReady] = useState(false);

  // tiny, once-only intro (no heavy libs)
  useEffect(() => {
    // optional: only animate once per session
    const key = "sc_intro_played";
    const played = typeof window !== "undefined" && sessionStorage.getItem(key);

    if (played) {
      setReady(true);
      return;
    }

    // let layout settle, then animate in
    const t = window.setTimeout(() => {
      setReady(true);
      sessionStorage.setItem(key, "1");
    }, 60);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* IMAGE */}
          <div
            className={[
              "overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
              "transition-all duration-700 will-change-transform",
              "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <div className="relative h-[420px] w-full lg:h-[540px]">
              <Image
                src="/images/homey.jpeg"
                alt="Welcome"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* COPY */}
          <div
            className={[
              "transition-all duration-700 delay-100 will-change-transform",
              "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <h1 className="text-5xl lg:text-7xl leading-tight font-black mb-6 tracking-tight">
              Become <br /> Fit For Use
            </h1>

            <p className="text-lg lg:text-xl text-black/75 leading-relaxed max-w-[540px] mb-8">
              GOD created you in Christ Jesus to join Him in His good work, and we are here to help you in doing so.
            </p>

            <div
              className={[
                "flex flex-wrap gap-4",
                "transition-all duration-700 delay-200",
                ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ].join(" ")}
            >
              <Button
                href="https://www.youtube.com/@saltcitycentral"
                target="_blank"
                className="bg-black text-white hover:bg-black/90"
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                }
              >
                Join A Live Service
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
