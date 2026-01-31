"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NewHere() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = "sc_intro_newhere";
    const played = typeof window !== "undefined" && sessionStorage.getItem(key);

    if (played) {
      setReady(true);
      return;
    }

    const t = window.setTimeout(() => {
      setReady(true);
      sessionStorage.setItem(key, "1");
    }, 60);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background image (optimized) */}
      <div className="absolute inset-0">
        <Image
          src="/new-here.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Soft overlay (not too dark) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Gentle tint for polish */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />

      {/* Bottom fade into the next section background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />

      <Container className="relative">
        <div className="py-20 lg:py-24 flex items-center justify-center text-center">
          <div
            className={[
              "max-w-3xl",
              "transition-all duration-700 will-change-transform",
              "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <h2
              className={[
                "text-4xl md:text-5xl font-black text-white mb-6",
                "transition-all duration-700 delay-75",
                ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ].join(" ")}
            >
              New to SaltCity?
            </h2>

            <p
              className={[
                "text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto",
                "transition-all duration-700 delay-150",
                ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ].join(" ")}
            >
              Here at SaltCity, we teach believers how to live victoriously by practicing the
              Written Word of GOD and living everyday with JESUS as our EXAMPLE.
            </p>

            <div
              className={[
                "flex flex-col sm:flex-row items-center justify-center gap-4",
                "transition-all duration-700 delay-200",
                ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
              ].join(" ")}
            >
              <Button
                href="/who-we-are"
                className="w-full sm:w-auto bg-white text-black hover:bg-white/90"
              >
                Who We Are
              </Button>

              <Button
                href="/next-steps"
                className="w-full sm:w-auto bg-transparent text-white ring-1 ring-white/50 hover:ring-white hover:bg-white/10"
              >
                Grow With Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
