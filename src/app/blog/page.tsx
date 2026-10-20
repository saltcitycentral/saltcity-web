"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: "the-approval-of-jesus-of-nazareth",
    title: "The Approval of Jesus of Nazareth",
    excerpt: "Peter stood before the very people who crucified Jesus and called Him by the name they used to mock Him. A study of Acts 2:22 on how God publicly endorsed His Son — and how He still approves His church today by miracles, wonders and signs.",
    author: "Tobore David",
    date: "2026-10-20",
    readTime: "11 min read",
    category: "Holy Spirit & Power",
    image: "/images/blog/approval.jpg",
    featured: true,
  },
  {
    id: "the-art-of-expectation",
    title: "The Art of Expectation",
    excerpt: "Discover how biblical expectation shapes your faith journey and positions you to receive from God. A deep dive into the Greek words for expectation and what they mean for your daily walk.",
    author: "Tobore David",
    date: "2026-02-18",
    readTime: "12 min read",
    category: "Faith & Expectation",
    image: "/images/blog/_FAS9143.jpg",
  },
  {
    id: "should-gospel-music-be-sold",
    title: "Should Gospel Music Be Sold?",
    excerpt: "A thought-provoking examination of the debate around selling gospel music, with biblical, historical, and practical perspectives on supporting music ministers.",
    author: "Tobore David",
    date: "2026-02-18",
    readTime: "15 min read",
    category: "Music & Ministry",
    image: "/images/blog/gospel-music-be-sold.jpeg",
  },
];

const CATEGORIES = [
  "All Posts",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.category))),
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        </div>

        <Container>
          <div
            className={[
              "relative z-10 max-w-4xl transition-all duration-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm mb-6">
              SaltCity Blog
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Stories of Faith,
              <br />
              <span className="text-white/70">Growth & Purpose</span>
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              Insights, teachings, and reflections to inspire your walk with Christ
              and equip you for kingdom impact.
            </p>
          </div>
        </Container>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
        <Container>
          <div className="py-4 lg:py-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Categories */}
            <div className="relative w-full lg:w-auto">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={[
                      "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0",
                      selectedCategory === cat
                        ? "bg-black text-white shadow-lg"
                        : "bg-black/5 text-black/70 hover:bg-black/10",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none lg:hidden" />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All Posts" && searchQuery === "" && (
        <section className="py-16 bg-gradient-to-b from-black/[0.02] to-transparent">
          <Container>
            <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-6">
              Featured Article
            </div>

            <Link href={`/blog/${featuredPost.id}`}>
              <div className="group relative overflow-hidden rounded-3xl bg-black shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-10">
                  <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm mb-4">
                    {featuredPost.category}
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight max-w-3xl group-hover:translate-x-2 transition-transform duration-300">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-white/90 mb-6 max-w-2xl leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-white/80">
                    <span className="font-semibold">{featuredPost.author}</span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(featuredPost && selectedCategory === "All Posts" && searchQuery === "" ? regularPosts : filteredPosts).map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className={[
                    "group transition-all duration-700",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  ].join(" ")}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  <article className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative overflow-hidden h-56 bg-black/5">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <h3 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-black/80 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-sm text-black/70 leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-black/60 pt-4 border-t border-black/5">
                        <span className="font-semibold">{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-black group-hover:gap-4 transition-all duration-300">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Come and Worship With Us
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join us on Sunday, or take your next step with the SaltCity family this week.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/locations"
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition"
              >
                Find a Location
              </Link>
              <Link
                href="/next-steps"
                className="px-8 py-4 rounded-full border-2 border-white/25 text-white font-bold hover:border-white/50 transition"
              >
                Take a Next Step
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}