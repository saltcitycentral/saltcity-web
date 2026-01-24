import Container from "@/components/ui/Container";
import { FileText, Download, BookOpen, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";

const RESOURCE_CATEGORIES = [
  {
    title: "Forms & Documents",
    icon: <FileText size={32} />,
    description: "Download important forms and documents for various church processes.",
    resources: [
      {
        name: "Spousal Selection Form",
        description: "Guidelines and form for those seeking a life partner.",
        fileSize: "PDF • 2.4 MB",
        downloadUrl: "/downloads/spousal-selection-form.pdf",
      },
      {
        name: "Membership Form",
        description: "Join the SaltCity family officially.",
        fileSize: "PDF • 1.8 MB",
        downloadUrl: "/downloads/membership-form.pdf",
      },
  
    ]
  },
  {
    title: "Confessions & Declarations",
    icon: <MessageSquare size={32} />,
    description: "Daily confessions and declarations to strengthen your faith.",
    resources: [
      {
        name: "Daily Confessions",
        description: "Join our Telegram channel for daily confessions.",
        fileSize: "Telegram Channel",
        downloadUrl: "https://t.me/saltcityconfessions",
        external: true,
      },
      {
        name: "Confessions PDF",
        description: "Downloadable collection of powerful confessions.",
        fileSize: "PDF • 3.1 MB",
        downloadUrl: "/downloads/confessions.pdf",
      },
    ]
  },
  {
    title: "Study Materials",
    icon: <BookOpen size={32} />,
    description: "Resources to help you grow deeper in your faith and understanding.",
    resources: [
      {
        name: "School of Discipleship Curriculum",
        description: "Complete curriculum for new believers.",
        fileSize: "PDF • 5.6 MB",
        downloadUrl: "/downloads/discipleship-curriculum.pdf",
      },
      {
        name: "Bible Study Guides",
        description: "Structured guides for personal and group study.",
        fileSize: "PDF • 4.2 MB",
        downloadUrl: "/downloads/bible-study-guides.pdf",
      },
    ]
  },
  {
    title: "Prayer Resources",
    icon: <Heart size={32} />,
    description: "Tools and guides to enhance your prayer life.",
    resources: [
      {
        name: "Prayer Guide",
        description: "Comprehensive guide to effective prayer.",
        fileSize: "PDF • 2.8 MB",
        downloadUrl: "/downloads/prayer-guide.pdf",
      },
      {
        name: "Prayer Points",
        description: "Weekly prayer points on Telegram.",
        fileSize: "Telegram Channel",
        downloadUrl: "https://t.me/saltcityprayer",
        external: true,
      },
    ]
  },
];

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Resources
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Download forms, access study materials, and get equipped for your spiritual journey with our comprehensive resources.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="space-y-20">
            {RESOURCE_CATEGORIES.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{category.title}</h2>
                    <p className="text-black/70 mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, i) => (
                    <div
                      key={i}
                      className="group bg-neutral-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-black/5 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                          <Download size={24} />
                        </div>
                        <span className="text-xs font-semibold text-black/50">
                          {resource.fileSize}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg mb-2">{resource.name}</h3>
                      <p className="text-sm text-black/70 mb-6">{resource.description}</p>

                      {resource.external ? (
                        <a
                          href={resource.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                        >
                          Open Channel
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                          </svg>
                        </a>
                      ) : (
                        <a
                          href={resource.downloadUrl}
                          download
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">
              Need Something Specific?
            </h2>
            <p className="text-lg text-black/70 mb-8">
              Can't find what you're looking for? Reach out to us and we'll be happy to help.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}