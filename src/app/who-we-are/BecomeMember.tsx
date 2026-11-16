"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";
import CompanyForm from "@/components/forms/CompanyForm";

export default function BecomeMember() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <Container>
          <div className="grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-5">
              <div data-reveal="shutter">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div data-parallax="0.25" className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src="/images/about/member.jpg"
                      alt="A member reading his Bible during a service"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      quality={72}
                      className="object-cover"
                      style={{ objectPosition: "50% 20%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-white/55">
                Ready for growth?
              </div>
              <h2
                data-reveal
                style={{ ["--d" as string]: 80 }}
                className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
              >
                Become a Member.
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 160 }}
                className="mt-7 max-w-[34rem] text-lg leading-relaxed text-white/75"
              >
                Join a Company and grow with believers around you through structure, fellowship, and
                discipleship. We’ll connect you to a Company lead near you.
              </p>
              <div data-reveal style={{ ["--d" as string]: 240 }} className="mt-10">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
                >
                  Join a Company
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Modal
        open={open}
        title="Join a Company"
        description="Tell us where you are and what kind of community you’re looking for."
        onClose={() => setOpen(false)}
        footer={<div className="text-xs text-black/60">We’ll connect you to a company lead near you.</div>}
      >
        <CompanyForm onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
