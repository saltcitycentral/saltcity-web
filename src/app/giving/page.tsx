import Link from "next/link";
import { HandHeart, MapPin, Users, Book, Heart } from "lucide-react";

const TEAL = "#08b6a6";

const ONGOING_PROJECTS = [
  {
    title: "New Church Property - Warri",
    description: "Partner with us to buy and build a permanent home for our Warri congregation to gather, worship, and grow together.",
    progress: 1,
    icon: <MapPin size={28} />,
  },
  {
    title: "Church Operations - Monthly",
    description: "Join us as we create a financial structure for seamless day-to-day operations of church operations and weekly service execution.",
    progress: 40,
    icon: <Users size={28} />,
  },
  {
    title: "Saltworship Projects",
    description: "Support our vision of saturating the earth (both physically and digitally) with the gospel through songs.",
    progress: 55,
    icon: <Heart size={28} />,
  },
];

const GIVING_ACCOUNTS = [
  {
    bank: "Access Bank",
    accountName: "SaltCity Church",
    accountNumber: "0123456789",
    type: "Tithe & Offerings",
  },
  {
    bank: "GTBank",
    accountName: "SaltCity Church - Projects",
    accountNumber: "0987654321",
    type: "Building & Projects",
  },
  {
    bank: "Zenith Bank",
    accountName: "SaltCity Church - Missions",
    accountNumber: "1122334455",
    type: "Missions & Outreach",
  },
];

export default function GivingPage() {
  return (
    <main>
      {/* HERO */}
      {/* HERO */}
<section
  className="relative h-[500px]"
  style={{
    backgroundImage: "url(/images/giving-hero.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative mx-auto w-full max-w-[1200px] px-6 h-full flex items-center">
    <div className="max-w-3xl">
      <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
        Why Should <br /> The Believer Give?
      </h1>

      <p className="text-xl text-white/90 leading-relaxed">
        The primary purpose of giving is for raising disciples through the spread of the gospel.
      </p>

      {/* ✅ NEW: Give Now button */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/giving/ways"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
        >
          Give Now
        </Link>

        <Link
          href="/giving/ways"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent text-white font-semibold ring-1 ring-white/35 hover:ring-white/60 hover:bg-white/10 transition-colors"
        >
          See All Channels
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* OUR MANDATE */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Our Mandate on Giving</h2>
            <p className="text-lg leading-relaxed text-black/70 mb-8">
              GOD, our primary EXAMPLE gave us the ultimate gift of his Son generously, and that is how He expects His children to give. 
              Here at SaltCity, we teach that everyone should give now and again, as GOD has prospered them.
            </p>
            <p className="text-lg leading-relaxed text-black/70">
                </p>
          </div>
        </div>
      </section>

      {/* PASTOR'S NOTE */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start max-w-5xl mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <img
                src="images/PASTOR.jpg"
                alt="Pastor Tobore David"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-black mb-4">A Word from PASTOR</h2>
              <div className="space-y-4 text-lg leading-relaxed text-black/70">
                <p className="italic">
                  "...and certain women, which had been healed of evil spirits and infirmities, Mary called Magdalene, out of whom went seven devils, and Joanna the wife of Chuza Herod's steward, and Susanna, and many others, which ministered unto him of their substance. - Luke 8:2-3"
                </p>
                <p>
                  In Luke 8:2-3, we see the partners of Jesus, who gave their time, presence as substance to His ministry while He was on the earth. 
                </p>
                <p>
                  Since the LORD has assigned us this task of raising disciples to fulfill their ministry, I believe strongly that He has divinely positioned partners to give towards all we need for the propagation of GOD’s Message in SaltCity Church.          
               </p>
                <p className="font-semibold text-black">
                  — Pastor Tobore David
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCRIPTURE */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <Book size={48} className="mx-auto opacity-90" />
            </div>
            <h2 className="text-3xl font-black mb-8">What the Bible Says About Giving</h2>
            
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-xl italic mb-3">
                  "Upon the first day of the week let every one of you lay by him in store, as God hath prospered him, that there be no gatherings when I come"
                </p>
                <p className="font-bold">— 1 Corinthians 16:2</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-xl italic mb-3">
                  "Charge them that are rich in this world, that they be not highminded, nor trust in uncertain riches, but in the living God, who giveth us richly all things to enjoy; that they do good, that they be rich in good works, ready to distribute, willing to communicate; laying up in store for themselves a good foundation against the time to come, that they may lay hold on eternal life."
                </p>
                <p className="font-bold">— 1 Timothy 6:17-19</p>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP STRUCTURE */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Partnership Structure</h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              At SaltCity, we believe in partnership—walking together in faith and supporting God's work through consistent, committed giving.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
                <HandHeart size={32} style={{ color: TEAL }} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Tithe Partners</h3>
              <p className="text-black/70 mb-4">
                Give your first 10% consistently as an act of worship and obedience to God's Word.
              </p>
              <p className="text-sm font-semibold" style={{ color: TEAL }}>
                Monthly Commitment
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
                <Heart size={32} style={{ color: TEAL }} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Project Partners</h3>
              <p className="text-black/70 mb-4">
                Support specific kingdom projects and help us expand our reach and impact.
              </p>
              <p className="text-sm font-semibold" style={{ color: TEAL }}>
                One-time or Recurring
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
                <Users size={32} style={{ color: TEAL }} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Mission Partners</h3>
              <p className="text-black/70 mb-4">
                Fund evangelism, outreach, and community impact initiatives across Nigeria.
              </p>
              <p className="text-sm font-semibold" style={{ color: TEAL }}>
                Quarterly Commitment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONGOING PROJECTS */}
      <section className="py-20 bg-neutral-900">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Ongoing Projects</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Your giving is making these kingdom projects a reality. Join us in building for God's glory.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ONGOING_PROJECTS.map((project) => (
              <div key={project.title} className="bg-white rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mb-6" style={{ color: TEAL }}>
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-black/70 mb-6">{project.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Progress</span>
                    <span style={{ color: TEAL }}>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%`, background: TEAL }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVING ACCOUNTS */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Accounts to Give To</h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              You can give directly to any of these accounts. Please send confirmation of payment to our WhatsApp line.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {GIVING_ACCOUNTS.map((account) => (
              <div
                key={account.accountNumber}
                className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white shadow-[0_12px_40px_rgba(8,182,166,0.3)]"
              >
                <div className="text-sm font-bold opacity-90 mb-6">{account.type}</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs opacity-75 mb-1">Bank Name</div>
                    <div className="text-lg font-bold">{account.bank}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-75 mb-1">Account Name</div>
                    <div className="font-semibold">{account.accountName}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-75 mb-1">Account Number</div>
                    <div className="text-2xl font-black tracking-wider">{account.accountNumber}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/giving/ways"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
            >
              See More Ways to Give
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}