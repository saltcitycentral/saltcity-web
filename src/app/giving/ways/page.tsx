import Link from "next/link";
import { 
  Smartphone, 
  Calendar, 
  QrCode, 
  Users, 
  Banknote,
  Gift,
  Building,
  HandHeart 
} from "lucide-react";

const TEAL = "#08b6a6";

const AUTOMATED_GIVING = [
  {
    icon: <Calendar size={32} />,
    title: "Set Your Frequency",
    description: "Choose to give weekly, monthly, or quarterly. Set it once and let your partnership run automatically.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Automatic Deductions",
    description: "Link your bank account or card for seamless, recurring deductions. Never miss your commitment.",
  },
  {
    icon: <QrCode size={32} />,
    title: "QR Code Payments",
    description: "Scan our church QR code during service for instant, secure mobile payments.",
  },
  {
    icon: <Users size={32} />,
    title: "Partnership Plans",
    description: "Join our partnership program with customized giving plans tailored to your commitment level.",
  },
];

const GIVING_TYPES = [
  {
    icon: <Banknote size={40} />,
    title: "Cash & Bank Transfers",
    description: "Give via bank transfer, cash during service, or direct deposit to our accounts.",
    items: [
      "Bank transfers to our designated accounts",
      "Cash offerings during Sunday service",
      "Online banking and mobile transfers",
      "Standing orders for recurring gifts"
    ]
  },
  {
    icon: <Gift size={40} />,
    title: "Items & Resources",
    description: "Contribute equipment, materials, or resources needed for ministry activities.",
    items: [
      "Sound and multimedia equipment",
      "Office supplies and furniture",
      "Cleaning supplies",
      
    ]
  },
  {
    icon: <Building size={40} />,
    title: "Assets & Properties",
    description: "Partner with us through property donations, venue provisions, or asset contributions.",
    items: [
      "Venue space for church programs",
      "Vehicles for ministry use",
      "Land or property donations",
      "Equipment and infrastructure"
    ]
  },
  {
    icon: <HandHeart size={40} />,
    title: "Volunteering",
    description: "Give your time, skills, and talents to serve in various ministry areas.",
    items: [
      "Serve in a unit (Media, Ushering, etc.)",
      "Join a ministry team",
      "Volunteer for special events",
    ]
  },
];

export default function WaysToGivePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[400px] bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1600&q=80"
            alt="How to Give"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative mx-auto w-full max-w-[1200px] px-6 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
              Simple Ways to Give
            </h1>
            <p className="text-xl text-white/95 leading-relaxed">
              Giving to SaltCity is easy and convenient. Choose the method that works best for you.
            </p>
          </div>
        </div>
      </section>

      {/* AUTOMATE GIVING */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Automate Your Giving</h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              Make giving effortless with automated systems that honor your commitment and ensure consistency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AUTOMATED_GIVING.map((item) => (
              <div key={item.title} className="text-center">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: `${TEAL}15`, color: TEAL }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-black/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ background: TEAL }}
            >
              Set Up Automated Giving
            </Link>
          </div>
        </div>
      </section>

      {/* QR CODE SECTION */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl font-black mb-6">Give with QR Code</h2>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Scan our QR code during service or anytime for instant, secure mobile giving. It's fast, easy, and takes just seconds.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: TEAL }}>
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-black/70">Open your mobile banking app or camera</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: TEAL }}>
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-black/70">Scan the QR code displayed during service</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: TEAL }}>
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-black/70">Enter your amount and complete the payment</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8">
                <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                  <QrCode size={200} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* END OF MONTH GIVING */}
      <section className="py-20" style={{ background: TEAL }}>
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Calendar size={48} className="mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-black mb-6">End of Month Partnership</h2>
            <p className="text-xl leading-relaxed mb-8 text-white/95">
              Join our end-of-month partnership program where committed believers give at the close of each month. This consistent rhythm of giving helps us plan better and execute kingdom projects with excellence.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              Join End of Month Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* KINDS OF GIVING */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Different Ways to Contribute</h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              Your partnership goes beyond finances. Here are various ways you can support God's work at SaltCity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GIVING_TYPES.map((type) => (
              <div key={type.title} className="bg-neutral-50 rounded-2xl p-8">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${TEAL}15`, color: TEAL }}
                >
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                <p className="text-black/70 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span className="text-black/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to Start Giving?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Have questions about how to give? Check out our FAQ or contact our team for assistance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/giving/faq"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                View FAQ
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}