"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const TEAL = "#08b6a6";

const FAQS = [
  {
    category: "The Purpose of Giving",
    questions: [
      {
        q: "How do I give?",
        a: "Biblically, the primary purpose of giving is for raising disciples through the spread of the gospel. God gave us the ultimate gift of his Son generously, and that is how He expects His children to give. Here at SaltCity, we teach that everyone should give now and again, as God has prospered them. You can partner with the work SaltCity church is doing around the world by giving through the following channels below."
      },
      {
        q: "What does the Bible say about partnership and giving?",
        a: "Philippians 4:15-19 (KJV): 15 Now you Philippians know also that in the beginning of the gospel, when I departed from Macedonia, no church shared with me concerning giving and receiving but you only. 16 For even in Thessalonica you sent aid once and again for my necessities. 17 Not that I seek the gift, but I seek the fruit that abounds to your account. 18 Indeed I [a]have all and abound. I am full, having received from Epaphroditus the things sent from you, a sweet-smelling aroma, an acceptable sacrifice, well pleasing to God. 19 And my God shall supply all your need according to His riches in glory by Christ Jesus."
      }
    ]
  },
  {
    category: "Banking Channels",
    questions: [
      {
        q: "What are the account details for giving?",
        a: "Account Name: SaltCity Church | Account Number: 0431944413 | Bank: Guaranty Trust Bank Plc | Type: Naira. \n\n Account Name: SaltCity Church | Account Number: 0469266462 | Bank: Guaranty Trust Bank Plc | Type: Dollar. \n\n Account Name: SaltCity Church | Account Number: 0469266462 | Bank: Guaranty Trust Bank Plc | Type: Euro. \n\n Account Name: SaltCity Church | Account Number: 0073530847 | Bank: Access Bank | Type: Naira. \n\n Account Name: SaltCity Church | Account Number: 1015095018 | Bank: Zenith Bank | Type: Naira."
      }
    ]
  },
  {
    category: "Partnership & Commitment",
    questions: [
      {
        q: "Why should I partner with SaltCity?",
        a: "Just as Paul had these partners, as you will see in Luke 8:2-3, Jesus also had partners who ministered their substance to His ministry while He was on the earth. Since the Lord has assigned us this task of raising disciples to fulfill their ministry we have set our faith for everything we need to be successful in teaching the Word. So, decide prayerfully, what you will give to the work monthly as we obey the Lord."
      }
    ]
  },
  {
    category: "Ministry Focus",
    questions: [
      {
        q: "What is the focus of SaltCity Church?",
        a: "SaltCity Church is a Bible-teaching church focused on Discipling Believers and Perfecting them for the Fulfillment of the Work of Ministry."
      }
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
              Welcome to SaltCity Church
            </h2>
            <p className="text-lg text-black/70 leading-relaxed">
              SaltCity Church is a Bible-teaching church focused on Discipling Believers and Perfecting them for the Fulfillment of the Work of Ministry. Whether you're exploring giving as a next step in your relationship with Christ or you're a long-time giver looking for ways to invest in what God is doing, we're here to help!
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
                            <p className="text-black/70 leading-relaxed pt-4 whitespace-pre-line">{faq.a}</p>
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
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Still Have Questions?</h2>
            <p className="text-lg text-black/70">
              Reach out to our team via the channels below or fill out the form.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:tobore@saltcitycentral.org" className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${TEAL}15`, color: TEAL }}><Mail size={32} /></div>
              <h3 className="font-bold text-lg mb-2">Email Pastor Tobore</h3>
              <p className="text-sm text-black/60">tobore@saltcitycentral.org</p>
            </a>

            <a href="https://wa.me/2348030597015" target="_blank" rel="noopener noreferrer" className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${TEAL}15`, color: TEAL }}><MessageCircle size={32} /></div>
              <h3 className="font-bold text-lg mb-2">Info Desk</h3>
              <p className="text-sm text-black/60">08030597015</p>
            </a>

            <a href="tel:08030597015" className="group bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${TEAL}15`, color: TEAL }}><Phone size={32} /></div>
              <h3 className="font-bold text-lg mb-2">Call Info Desk</h3>
              <p className="text-sm text-black/60">08030597015</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}