"use client";

import { useMemo, useState } from "react";

type Leader = {
  key: string;
  name: string;
  title: string;
  image: string;
  button: string;
  modalTitle: string;
  modalBody: string;
};

export default function LeadershipGrid() {
  const leaders = useMemo<Leader[]>(
    () => [
      {
        key: "tobore",
        name: "Pastor Tobore David",
        title: "Lead Pastor",
        image:
          "/images/PASTOR.jpg",
        button: "About",
        modalTitle: "Pastor Tobore David",
        modalBody:
          "Pastor Tobore David serves as the Lead Pastor of SaltCity Warri, providing spiritual oversight. He is committed to making men fit for use, with practical insights from GOD's Word for daily life. His work extends within SaltCity and the wider Body of Christ, reaching Warri and beyond.",
      },
      {
        key: "seun",
        name: "Pastor Seun Tobore David",
        title: "Pastor, Family Life",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Seun Tobore David",
        modalBody:
          "Pastor Seun Tobore David serves as Pastor over Family Life. She is committed to enriching families and strengthening homes; building Christ-centered families that grow in faith, unity, and purpose.",
      },
      {
        key: "edison",
        name: "Pastor Edison Iboyi",
        title: "Pastor, Cityzens PTI Campus Expression",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Edison Iboyi",
        modalBody:
          "Pastor Edison Iboyi serves as the Pastor of the Cityzens PTI campus expression, the university outreach of City Church at the Petroleum Training Institute, Warri. He is committed to raising young believers equipped to discover their place and path in GOD’s purpose.",
      },
      {
        key: "racheal",
        name: "Pastor Racheal Adesi",
        title: "Resident Pastor, SaltCity Central",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Racheal Adesi",
        modalBody:
          "Pastor Racheal Adesi serves as the Resident Pastor of SaltCity Central. She provides and guides the administrative and operational life of the church. Her ministry is centered on order, care, and the healthy functioning of the church community.",
      },
      {
        key: "othuke",
        name: "Pastor Othuke Adesi",
        title: "Resident Pastor, SaltCity Central",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Othuke Adesi",
        modalBody:
          "Pastor Othuke Adesi serves as a Resident Pastor at SaltCity Central. His service supports the spiritual care and effective organization of the ministry.",
      },

      {
        key: "victor",
        name: "Pastor Victor Samuel",
        title: "Pastor, Teenage Ministry",
        image:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Victor Samuel",
        modalBody:
          "Pastor Victor Samuel serves as the Pastor over the teenage ministry of SaltCity Church. He is committed to centering teenagers in Christ and helping them recognize their identity in Him early.",
      },
      {
        key: "mercy",
        name: "Pastor Mercy Chuks",
        title: "Pastor, Media",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Mercy Chuks",
        modalBody:
          "Pastor Mercy Chuks oversees the use of media to support worship, service delivery, and ministry expression both on ground and across digital platforms. Her work helps ensure that the message and ministry of the church are communicated clearly and effectively.",
      },
      {
        key: "axcel",
        name: "Pastor Axcel Chuks",
        title: "Pastor, Youth Expression",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Axcel Chuks",
        modalBody:
          "Pastor Axcel Chuks serves as the Pastor over the youth expression of SaltCity Church. He is committed to reaching and discipling energetic young people with the gospel, helping them channel their strength toward God and the work of ministry.",
      },
      {
        key: "sam",
        name: "Pastor Sam Igurube",
        title: "Pastor, Venue Management",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Sam Igurube",
        modalBody:
          "Pastor Sam Igurube serves as the Pastor overseeing venue management at SaltCity Church. His service supports the structural and educational foundations that enable ministry to function smoothly.",
      },
      {
        key: "brave",
        name: "Pastor Brave Iyomih",
        title: "Pastor, LifeCity",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        button: "About",
        modalTitle: "Pastor Brave Iyomih",
        modalBody:
          "Pastor Brave Iyomih serves as a Pastor at LifeCity. He contributes to the ministry through his expression of worship and exhortation, strengthening the spiritual life of the church.",
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string | null>(null);
  const active = leaders.find((l) => l.key === openKey) || null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l) => (
            <div key={l.key} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all duration-300">
                <div className="aspect-square bg-neutral-200">
                  <img
                    src={l.image}
                    alt={`${l.name} - ${l.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold mb-1">{l.name}</div>
                <div className="text-sm text-black/60 mb-4">{l.title}</div>

                <button
                  onClick={() => setOpenKey(l.key)}
                  className="text-sm font-semibold px-6 py-2.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
                  type="button"
                >
                  {l.button}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {active ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpenKey(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
                onClick={() => setOpenKey(null)}
                type="button"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <h3 className="text-3xl font-black mb-2">{active.modalTitle}</h3>
                <p className="text-sm text-black/60 mb-6 font-semibold">
                  {leaders.find((l) => l.key === active.key)?.title}
                </p>
                <p className="text-base leading-relaxed text-black/70">
                  {active.modalBody}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
