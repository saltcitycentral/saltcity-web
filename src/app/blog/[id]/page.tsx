"use client";

import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";

// This would normally come from a database or CMS
const BLOG_POSTS = {
  "1": {
    title: "Walking in Faith: Understanding God's Purpose for Your Life",
    content: `
      <p class="lead">Every believer is created with a unique purpose and calling. Understanding this divine assignment is crucial to living a fulfilling and impactful Christian life.</p>

      <h2>The Foundation of Purpose</h2>
      <p>Your purpose isn't something you create—it's something you discover. Before you were formed in your mother's womb, God knew you and set you apart for a specific work (Jeremiah 1:5). This truth should anchor your pursuit of purpose.</p>

      <h2>Three Keys to Discovering Your Purpose</h2>
      
      <h3>1. Intimacy with God</h3>
      <p>Purpose flows from relationship. The closer you walk with God, the clearer your assignment becomes. Spend time in His presence, study His Word, and listen for His voice through prayer.</p>

      <h3>2. Understanding Your Design</h3>
      <p>God has equipped you with specific gifts, talents, and passions. These aren't random—they're clues to your calling. What brings you joy? What are you naturally good at? Where do you see needs that stir your heart?</p>

      <h3>3. Faithful Service</h3>
      <p>Purpose is often revealed through faithful service in small things. As you serve where you are, God opens doors to where He's called you to be. Don't despise small beginnings.</p>

      <h2>Walking It Out Daily</h2>
      <p>Once you've discovered your purpose, the real work begins—living it out consistently. This requires discipline, perseverance, and unwavering faith. Here are practical steps:</p>

      <ul>
        <li>Set clear, God-honoring goals aligned with your purpose</li>
        <li>Surround yourself with believers who encourage your calling</li>
        <li>Stay rooted in Scripture and prayer</li>
        <li>Take consistent action, even when you don't feel like it</li>
        <li>Trust God's timing and process</li>
      </ul>

      <h2>Overcoming Obstacles</h2>
      <p>The journey to fulfilling your purpose won't be without challenges. You'll face doubt, opposition, setbacks, and seasons of waiting. But remember: the God who called you is faithful to complete the work He started in you (Philippians 1:6).</p>

      <blockquote>
        "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." - Ephesians 2:10
      </blockquote>

      <h2>Your Next Steps</h2>
      <p>If you're still seeking clarity on your purpose, don't be discouraged. Here's what you can do today:</p>

      <ol>
        <li>Spend time in prayer asking God to reveal His plan for your life</li>
        <li>Take inventory of your gifts and passions</li>
        <li>Look for opportunities to serve in areas that align with your interests</li>
        <li>Talk to spiritual mentors who can provide guidance</li>
        <li>Trust that God will make your path clear as you walk with Him</li>
      </ol>

      <p>Remember, God's purpose for your life is good, pleasing, and perfect (Romans 12:2). Trust Him, stay faithful, and watch Him unfold His beautiful plan for you.</p>
    `,
    author: "Pastor Emmanuel",
    date: "2026-02-05",
    readTime: "8 min read",
    category: "Faith & Purpose",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&auto=format&fit=crop",
  },
  // Add more blog posts here...
};

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = BLOG_POSTS[postId as keyof typeof BLOG_POSTS];

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
            <p className="text-black/70 mb-8">The article you're looking for doesn't exist.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden bg-black">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </section>

      {/* Article */}
      <Container>
        <article className="max-w-4xl mx-auto -mt-32 relative z-10">
          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>

            <div className="inline-block rounded-full bg-black/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black/70 mb-4">
              {post.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-black/60 pb-6 border-b border-black/10">
              <span className="font-bold text-black">{post.author}</span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm font-semibold text-black/70">Share:</span>
              <button className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center transition">
                <Facebook className="h-4 w-4 text-black/70" />
              </button>
              <button className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center transition">
                <Twitter className="h-4 w-4 text-black/70" />
              </button>
              <button className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center transition">
                <Share2 className="h-4 w-4 text-black/70" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          />

          {/* Author Bio */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 md:p-12 text-white mb-16">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-white/20 shrink-0 grid place-items-center text-2xl font-black">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">About {post.author}</h3>
                <p className="text-white/80 leading-relaxed">
                  {post.author} serves as a pastor at SaltCity, teaching and equipping believers
                  to live out their faith with excellence. With a passion for biblical truth and
                  practical application, {post.author.includes('Pastor') ? 'he' : 'she'} helps people discover their purpose
                  and walk in God's calling.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-black/5 p-8 md:p-12 text-center">
            <h3 className="text-3xl font-black mb-4">Ready to Take the Next Step?</h3>
            <p className="text-black/70 mb-6 max-w-2xl mx-auto">
              Join us for service, connect with a community, or explore more resources
              to grow in your faith journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/locations"
                className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-black/90 transition"
              >
                Find a Location
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 rounded-full border-2 border-black/15 text-black font-bold hover:border-black/30 transition"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </article>
      </Container>

      {/* Bottom Spacing */}
      <div className="h-20" />

      <style jsx global>{`
        .prose {
          color: #000;
        }
        .prose p {
          margin-bottom: 1.5em;
          line-height: 1.8;
          color: rgba(0, 0, 0, 0.8);
        }
        .prose h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-top: 2.5em;
          margin-bottom: 1em;
          line-height: 1.2;
          color: #000;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.3;
          color: #000;
        }
        .prose ul, .prose ol {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }
        .prose li {
          margin-bottom: 0.75em;
          color: rgba(0, 0, 0, 0.8);
          line-height: 1.7;
        }
        .prose blockquote {
          border-left: 4px solid #000;
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          font-size: 1.25rem;
          color: rgba(0, 0, 0, 0.7);
        }
        .prose .lead {
          font-size: 1.25rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 2em;
          line-height: 1.7;
        }
        .prose strong {
          font-weight: 700;
          color: #000;
        }
        .prose a {
          color: #000;
          text-decoration: underline;
          font-weight: 600;
        }
        .prose a:hover {
          opacity: 0.7;
        }
      `}</style>
    </main>
  );
}