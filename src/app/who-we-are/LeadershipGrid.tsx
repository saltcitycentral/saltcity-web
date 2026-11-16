"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Leader = {
  key: string;
  name: string;
  title: string;
  image: string;
  bio: string;
};

const LEADERS: Leader[] = [
  {
    key: "tobore",
    name: "Pastor Tobore David",
    title: "Lead Pastor",
    image: "/images/leaders/tobore.jpg",
    bio: "Pastor Tobore David serves as the Lead Pastor of SaltCity Warri, providing spiritual oversight. He is committed to making men fit for use, with practical insights from GOD’s Word for daily life. His work extends within SaltCity and the wider Body of Christ, reaching Warri and beyond.",
  },
  {
    key: "seun",
    name: "Pastor Seun Tobore David",
    title: "Pastor, Family Life",
    image: "/images/leaders/seun.jpg",
    bio: "Pastor Seun Tobore David serves as Pastor over Family Life. She is committed to enriching families and strengthening homes; building Christ-centered families that grow in faith, unity, and purpose.",
  },
  {
    key: "edison",
    name: "Pastor Edison Iboyi",
    title: "Pastor, Cityzens PTI Campus Expression",
    image: "/images/leaders/edison.jpg",
    bio: "Pastor Edison Iboyi serves as the Pastor of the Cityzens PTI campus expression, the university outreach of City Church at the Petroleum Training Institute, Warri. He is committed to raising young believers equipped to discover their place and path in GOD’s purpose.",
  },
  {
    key: "racheal",
    name: "Pastor Racheal Adesi",
    title: "Resident Pastor, SaltCity Central",
    image: "/images/leaders/racheal.jpg",
    bio: "Pastor Racheal Adesi serves as the Resident Pastor of SaltCity Central. She provides and guides the administrative and operational life of the church. Her ministry is centered on order, care, and the healthy functioning of the church community.",
  },
  {
    key: "othuke",
    name: "Pastor Othuke Adesi",
    title: "Resident Pastor, SaltCity Central",
    image: "/images/leaders/othuke.jpg",
    bio: "Pastor Othuke Adesi serves as a Resident Pastor at SaltCity Central. His service supports the spiritual care and effective organization of the ministry.",
  },
  {
    key: "victor",
    name: "Pastor Victor Samuel",
    title: "Pastor, CityCentre",
    image: "/images/leaders/victor.jpg",
    bio: "Pastor Victor Samuel serves as the Pastor over the teenage ministry of SaltCity Church. He is committed to centering teenagers in Christ and helping them recognize their identity in Him early.",
  },
  {
    key: "dennis",
    name: "Pastor Dennis Oyinvbi",
    title: "Company Group Coordinator",
    image: "/images/leaders/dennis.jpg",
    bio: "Pastor Dennis is the Coordinator for our company groups, which is one of the accountability structures of SaltCity Church.",
  },
];

function Card({
  leader,
  index,
  large,
  onOpen,
}: {
  leader: Leader;
  index: number;
  large?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div data-reveal="shutter" style={{ ["--d" as string]: index * 90 }}>
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes={
              large
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            }
            quality={75}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div data-reveal style={{ ["--d" as string]: index * 90 + 120 }} className="mt-4">
        <div
          className={
            large
              ? "text-2xl font-black tracking-tight md:text-3xl"
              : "text-base font-black leading-snug tracking-tight md:text-lg"
          }
        >
          {leader.name}
        </div>
        <div className={`mt-1 text-black/55 ${large ? "text-base" : "text-sm"}`}>{leader.title}</div>
        <span className="sc-link mt-3 text-xs uppercase tracking-[0.18em]">
          About
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}

export default function LeadershipGrid() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const active = LEADERS.find((l) => l.key === openKey) ?? null;

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openKey]);

  return (
    <>
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-8">
        {LEADERS.slice(0, 2).map((leader, i) => (
          <Card key={leader.key} leader={leader} index={i} large onOpen={() => setOpenKey(leader.key)} />
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-20 md:grid-cols-3 md:gap-x-8 lg:grid-cols-5 lg:gap-x-6">
        {LEADERS.slice(2).map((leader, i) => (
          <Card key={leader.key} leader={leader} index={i} onOpen={() => setOpenKey(leader.key)} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setOpenKey(null)}
        >
          <div
            className="sc-fade relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto bg-white sm:grid-cols-[2fr_3fr]"
            style={{ animationDelay: "0s", animationDuration: "0.45s" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative hidden aspect-[4/5] bg-neutral-200 sm:block">
              <Image src={active.image} alt="" fill sizes="320px" quality={75} className="object-cover" />
            </div>
            <div className="p-7 pr-14 sm:p-10 sm:pr-14">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-black/50">{active.title}</div>
              <h3 className="mt-3 text-3xl font-black leading-[1.02] tracking-tight">{active.name}</h3>
              <p className="mt-6 text-base leading-relaxed text-black/75">{active.bio}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenKey(null)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full transition hover:bg-black/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
