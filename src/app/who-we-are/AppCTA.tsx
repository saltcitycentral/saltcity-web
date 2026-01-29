"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import CompanyForm from "@/components/forms/CompanyForm";

export default function AppCTA() {
  const [open, setOpen] = useState(false);

  const bg =
    "https://cms-images.life.church/lc-site/pages/app-2022/hero-bg-3.png?fit=auto&auto=format,compress&fm=webp&w=1600&dpr=2";
  const icon = "/logo-white.svg";

  return (
    <>
      <section
        className="relative w-full text-white"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Ready for Growth?
              <br />
              Become a Member.
            </h2>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href="/app/download"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 p-3 hover:bg-white/15 transition"
              >
                <img src={icon} alt="Life.Church App" className="h-14 w-14" />
              </a>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black transition"
              >
                Join a Company
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={open}
        title="Join a Company"
        description="Tell us where you are and what kind of community you’re looking for."
        onClose={() => setOpen(false)}
        footer={
          <div className="text-xs text-black/60">
            We’ll connect you to a company lead near you.
          </div>
        }
      >
        <CompanyForm onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
