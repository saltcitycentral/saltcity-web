"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const TEAL = "#08b6a6";

const FAQS = [
  {
    category: "General Questions",
    questions: [
      {
        q: "What happens to my money when I give to SaltCity?",
        a: "When you give to SaltCity, your contributions support discipleship programs, outreach initiatives, facility maintenance, staff support, and various kingdom projects. We are committed to stewarding every gift with integrity and transparency, ensuring your giving makes a lasting impact for God's glory."
      },
      {
        q: "Is SaltCity a registered organization?",
        a: "Yes, SaltCity Church is a registered religious organization in Nigeria. We operate with full legal compliance and maintain proper accountability structures for all financial matters."
      },
      {
        q: "Can I get a receipt for my giving?",
        a: "Yes! We provide receipts for all documented gifts. If you give via bank transfer, please send your payment confirmation to our WhatsApp line or email, and we'll issue you a receipt. This is especially important for those who need tax documentation or record-keeping purposes."
      },
      {
        q: "Should I give my tithe or to a specific project?",
        a: "The Bible teaches us to bring our tithes (the first 10% of our income) to the storehouse, which is the local church. Beyond your tithe, you can give offerings to specific projects or causes that resonate with your heart. We encourage both faithful tithing and generous offerings."
      },
    ]
  },
  {
    category: "Giving Methods",
    questions: [
      {
        q: "What are the ways I can give?",
        a: "You can give through bank transfers to our designated accounts, cash/cheque during service, mobile transfers, QR code payments during service, or by setting up recurring automated giving. We've made it easy and convenient for you to partner with us."
      },
      {
        q: "Can I give items instead of money?",
        a: "Absolutely! We welcome contributions of equipment, resources, and materials needed for ministry. Please contact our admin team to discuss what you'd like to contribute, and we'll coordinate with the relevant department."
      },
      {
        q: "How do I set up recurring giving?",
        a: "Contact our finance team via WhatsApp or email, and they'll help you set up automated recurring giving through your bank's standing order or our partnership program. You can choose weekly, monthly, or quarterly frequencies."
      },
      {
        q: "Is my financial information secure?",
        a: "Yes! We use secure banking channels and never store your financial details. All transactions go through verified banking systems with proper encryption and security measures."
      },
    ]
  },
  {
    category: "Accountability & Transparency",
    questions: [
      {
        q: "How can I see how my giving is being used?",
        a: "We provide regular updates through our announcements, social media, and quarterly reports. You can also request our annual financial summary or speak with our leadership team for more detailed information about specific projects."
      },
      {
        q: "Who oversees the church finances?",
        a: "Our church finances are overseen by our pastoral leadership team and a dedicated finance committee. We maintain proper checks and balances with multiple levels of accountability to ensure faithful stewardship."
      },
      {
        q: "Can I designate my gift to a specific ministry or project?",
        a: "Yes! When giving, you can specify which ministry, project, or cause you'd like to support. Simply indicate your preference when making your transfer or during your cash offering."
      },
    ]
  },
  {
    category: "Partnership & Commitment",
    questions: [
      {
        q: "What is the partnership program?",
        a: "Our partnership program is for believers who want to commit to consistent, recurring giving beyond their tithe. Partners support ongoing projects, missions, and ministry expansion through monthly or quarterly commitments."
      },
      {
        q: "Can I change or cancel my recurring giving?",
        a: "Yes, you have full control over your giving commitments. Simply contact our finance team, and they'll help you adjust or cancel your recurring gift at any time."
      },
      {
        q: "What if I miss a month of giving?",
        a: "There's no condemnation! We understand that circumstances change. Give as the Lord leads you. If you're on a partnership plan and need to pause or adjust, just let us know."
      },
    ]
  }
];

export default function GivingFAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[400px]" style={{ background: TEAL }}>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"
            alt="FAQ"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative mx-auto w-full max-w-[1200px] px-6 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
              Giving FAQs
            </h1>
            <p className="text-xl text-white/95 leading-relaxed">
              Find answers to common questions about giving to SaltCity Church.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">
              Giving is More Than a Transaction
            </h2>
            <p className="text-lg text-black/70 leading-relaxed">
              It's a spiritual practice. Whether you're exploring giving as a next step in your relationship with Christ or you're a long-time giver looking for ways to invest in what God is doing, we're here to help! You can learn more about the logistics of giving through SaltCity below, and if you still have questions, contact our team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTIONS */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {FAQS.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-black mb-6">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const index = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === index;
                    
                    return (
                      <div
                        key={qIndex}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5"
                      >
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                        >
                          <span className="font-bold text-lg pr-8">{faq.q}</span>
                          <svg
                            className={`w-5 h-5 shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-black/5">
                            <p className="text-black/70 leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASK A QUESTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">Still Have Questions?</h2>
              <p className="text-lg text-black/70">
                We're here to help! Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>

<div className="grid md:grid-cols-3 gap-6">
  {/* Email Card */}
  <a
    href="mailto:giving@saltcity.church"
    className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div 
      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
      style={{ background: `${TEAL}15`, color: TEAL }}
    >
      <Mail size={32} />
    </div>
    <h3 className="font-bold text-lg mb-2">Send an Email</h3>
    <p className="text-sm text-black/60">giving@saltcity.church</p>
  </a>

  {/* WhatsApp Card */}
  <a
    href="https://wa.me/2348012345678"
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div 
      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
      style={{ background: `${TEAL}15`, color: TEAL }}
    >
      <MessageCircle size={32} />
    </div>
    <h3 className="font-bold text-lg mb-2">WhatsApp Us</h3>
    <p className="text-sm text-black/60">+234 801 234 5678</p>
  </a>

  {/* Phone Card */}
  <a
    href="tel:+2348012345678"
    className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div 
      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
      style={{ background: `${TEAL}15`, color: TEAL }}
    >
      <Phone size={32} />
    </div>
    <h3 className="font-bold text-lg mb-2">Call Us</h3>
    <p className="text-sm text-black/60">+234 801 234 5678</p>
  </a>
</div>

            {/* Contact Form */}
            <div className="mt-12 bg-neutral-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Ask Your Question</h3>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Your Question</label>
                  <textarea
                    rows={5}
                    placeholder="Type your question here..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: TEAL }}
                >
                  Submit Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Your generosity transforms lives and advances God's kingdom. Start giving today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/giving"
                className="px-8 py-3.5 rounded-full text-black font-semibold hover:bg-white/90 transition-colors"
                style={{ background: "white" }}
              >
                Learn Why We Give
              </Link>
              <Link
                href="/giving/ways"
                className="px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Discover Ways to Give
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}