"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Leader = {
  key: string;
  name: string;
  title: string;
  image: string;
  button: string;
  modalTitle: string;
  modalBody: string;

  // NEW: controls vertical crop focus (0% = very top, 50% = center)
  focusY?: number;
};

export default function LeadershipGrid() {
  const leaders = useMemo<Leader[]>(
    () => [
      {
        key: "tobore",
        name: "Pastor Tobore David",
        title: "Lead Pastor",
        image: "/images/PASTOR.jpg",
        button: "About",
        modalTitle: "Pastor Tobore David",
        modalBody:
          "Pastor Tobore David serves as the Lead Pastor of SaltCity Warri, providing spiritual oversight. He is committed to making men fit for use, with practical insights from GOD's Word for daily life. His work extends within SaltCity and the wider Body of Christ, reaching Warri and beyond.",
        focusY: 36,
      },
      {
        key: "seun",
        name: "Pastor Seun Tobore David",
        title: "Pastor, Family Life",
        image: "/images/PS.jpg",
        button: "About",
        modalTitle: "Pastor Seun Tobore David",
        modalBody:
          "Pastor Seun Tobore David serves as Pastor over Family Life. She is committed to enriching families and strengthening homes; building Christ-centered families that grow in faith, unity, and purpose.",
        focusY: 14,
      },
      {
        key: "dennis",
        name: "Pastor Dennis Oyinvbi",
        title: "Company Group Coordinator",
        image: "/images/PD.jpg",
        button: "About",
        modalTitle: "Pastor Oyinvbi Iboyi",
        modalBody:
          "Pastor Oyinvbi Iboyi serves as the Pastor of the Cityzens PTI campus expression, the university outreach of City Church at the Petroleum Training Institute, Warri. He is committed to raising young believers equipped to discover their place and path in GOD’s purpose.",
        focusY: 12,
      },
      {
        key: "edison",
        name: "Pastor Edison Iboyi",
        title: "Pastor, Cityzens PTI Campus Expression",
        image: "/images/PE.jpg",
        button: "About",
        modalTitle: "Pastor Edison Iboyi",
        modalBody:
          "Pastor Edison Iboyi serves as the Pastor of the Cityzens PTI campus expression, the university outreach of City Church at the Petroleum Training Institute, Warri. He is committed to raising young believers equipped to discover their place and path in GOD’s purpose.",
        focusY: 10,
      },

      {
        key: "racheal",
        name: "Pastor Racheal Adesi",
        title: "Resident Pastor, SaltCity Central",
        image: "/images/PR.jpg",
        button: "About",
        modalTitle: "Pastor Racheal Adesi",
        modalBody:
          "Pastor Racheal Adesi serves as the Resident Pastor of SaltCity Central. She provides and guides the administrative and operational life of the church. Her ministry is centered on order, care, and the healthy functioning of the church community.",
        focusY: 23,
      },
      {
        key: "othuke",
        name: "Pastor Othuke Adesi",
        title: "Resident Pastor, SaltCity Central",
        image: "/images/PO.jpg",
        button: "About",
        modalTitle: "Pastor Othuke Adesi",
        modalBody:
          "Pastor Othuke Adesi serves as a Resident Pastor at SaltCity Central. His service supports the spiritual care and effective organization of the ministry.",
        focusY: 8,
      },
      {
        key: "victor",
        name: "Pastor Victor Samuel",
        title: "Pastor, CityCentre",
        image: "/images/PV.jpg",
        button: "About",
        modalTitle: "Pastor Victor Samuel",
        modalBody:
          "Pastor Victor Samuel serves as the Pastor over the teenage ministry of SaltCity Church. He is committed to centering teenagers in Christ and helping them recognize their identity in Him early.",
        focusY: -1,
      },
      {
        key: "mercy",
        name: "Pastor Mercy Chuks",
        title: "Pastor, Media",
        image: "/images/PM.jpg",
        button: "About",
        modalTitle: "Pastor Mercy Chuks",
        modalBody:
          "Pastor Mercy Chuks oversees the use of media to support worship, service delivery, and ministry expression both on ground and across digital platforms. Her work helps ensure that the message and ministry of the church are communicated clearly and effectively.",
        focusY: 14,
      },
      {
        key: "axcel",
        name: "Pastor Axcel Chuks",
        title: "Pastor, LifeCity",
        image: "/images/PA.jpg",
        button: "About",
        modalTitle: "Pastor Axcel Chuks",
        modalBody:
          "Pastor Axcel Chuks serves as the Pastor over the youth expression of SaltCity Church. He is committed to reaching and discipling energetic young people with the gospel, helping them channel their strength toward God and the work of ministry.",
        focusY: 15,
      },
      {
        key: "sam",
        name: "Pastor Sam Igurube",
        title: "Pastor, Church Administration",
        image: "/images/PSI.jpg",
        button: "About",
        modalTitle: "Pastor Sam Igurube",
        modalBody:
          "Pastor Sam Igurube serves as the Pastor overseeing the operations of the Church and manages the facility. His service supports the structural foundations that enable ministry to function smoothly.",
        focusY: 2,
      },
      {
        key: "stephanie",
        name: "Pastor Stephanie Innocent",
        title: "Fruitful Bough Coordinator",
        image: "/images/PIS.jpg",
        button: "About",
        modalTitle: "Pastor Stephanie Innocent",
        modalBody:
          "Pastor Brave Iyomih serves as a Pastor at LifeCity. He contributes to the ministry through his expression of worship and exhortation, strengthening the spiritual life of the church.",
        focusY: 14,
      },
      {
        key: "brave",
        name: "Pastor Brave Iyomih",
        title: "Pastor, LifeCity",
        image: "/images/PB.jpg",
        button: "About",
        modalTitle: "Pastor Brave Iyomih",
        modalBody:
          "Pastor Brave Iyomih serves as a Pastor at LifeCity. He contributes to the ministry through his expression of worship and exhortation, strengthening the spiritual life of the church.",
        focusY: 12,
      },
      {
        key: "immanuel",
        name: "Pastor Immanuel Oluwanifise",
        title: "Pastor, Cityzens Church, FUPRE",
        image: "/images/PI.jpg",
        button: "About",
        modalTitle: "Pastor Immanuel Oluwanifise",
        modalBody:
          "Pastor Immanuel Oluwanifise serves as a Pastor at LifeCity. He contributes to the ministry through his expression of worship and exhortation, strengthening the spiritual life of the church.",
        focusY: 12,
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string | null>(null);
  const active = leaders.find((l) => l.key === openKey) ?? null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, index) => {
            // Default focus if not provided
            const focusY = leader.focusY ?? 12;

            return (
              <div key={leader.key} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all duration-300">
                  <Image
                    src={leader.image}
                    alt={`${leader.name} — ${leader.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 4}
                    quality={78}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    // ✅ THIS is the alignment fix:
                    style={{ objectPosition: `50% ${focusY}%` }}
                  />
                </div>

                <div className="text-center">
                  <div className="text-xl font-bold mb-1">{leader.name}</div>
                  <div className="text-sm text-neutral-600 mb-4">{leader.title}</div>

                  <button
                    onClick={() => setOpenKey(leader.key)}
                    className="text-sm font-semibold px-6 py-2.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors duration-200"
                    type="button"
                  >
                    {leader.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal – unchanged */}
        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpenKey(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                onClick={() => setOpenKey(null)}
                type="button"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-2">{active.modalTitle}</h3>
                <p className="text-sm text-neutral-600 font-medium mb-5 sm:mb-6">{active.title}</p>
                <p className="text-base leading-relaxed text-neutral-700">{active.modalBody}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
