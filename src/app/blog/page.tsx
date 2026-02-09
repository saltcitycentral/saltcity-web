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
    id: "1",
    title: "Living Above Fear: Walking Boldly in Christ",
    excerpt: "Pastor Tobore teaches how to silence fear, stand firm in faith, and live with spiritual confidence in uncertain times.",
    author: "Pastor Tobore",
    date: "2026-02-07",
    readTime: "9 min read",
    category: "Faith & Courage",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Grace That Sustains: Strength for the Hidden Battles",
    excerpt: "Pastor Edison shares how God’s grace carries believers through seasons no one else sees.",
    author: "Pastor Edison",
    date: "2026-02-05",
    readTime: "7 min read",
    category: "Spiritual Growth",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "When God Says Move: Obedience and Divine Timing",
    excerpt: "Pastor Seun explores the power of immediate obedience and how destiny often waits on one decisive step.",
    author: "Pastor Seun",
    date: "2026-02-03",
    readTime: "8 min read",
    category: "Purpose",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Identity in Christ: Breaking Free from Labels",
    excerpt: "Pastor Karis teaches how to reject false identities and embrace who God says you are.",
    author: "Pastor Karis",
    date: "2026-02-01",
    readTime: "6 min read",
    category: "Identity",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "The Fire of Revival: Stirring Hunger for God Again",
    excerpt: "Pastor Racheal calls the church back to passionate devotion and a fresh encounter with the Holy Spirit.",
    author: "Pastor Racheal",
    date: "2026-01-29",
    readTime: "10 min read",
    category: "Revival",
    image: "/images/capital.jpg",
  },
  {
    id: "6",
    title: "Serving with Excellence: Faithfulness in Small Things",
    excerpt: "Pastor Tobore reminds believers that greatness in ministry begins with consistency in the unseen places.",
    author: "Pastor Tobore",
    date: "2026-01-27",
    readTime: "5 min read",
    category: "Leadership",
    image: "images/listen.jpg",
  },
];

const CATEGORIES = [
  "All Posts",
  "Faith & Purpose",
  "Family",
  "Spiritual Growth",
  "Youth",
  "Leadership",
  "Worship",
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
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
          {/* Use flex-col for mobile, row for desktop. 
              Items-stretch on mobile ensures the search bar takes full width. */}
          <div className="py-4 lg:py-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            
            {/* Search - Max width only applies to desktop */}
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

            {/* Categories - The "Scroll Wrapper" */}
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
              
              {/* Optional: Visual hint that there's more to scroll on mobile */}
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none lg:hidden" />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All Posts" && (
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
          {regularPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, idx) => (
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

      {/* Newsletter CTA */}
      <section className="py-20 bg-black text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Never Miss an Update
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Get fresh insights and teachings delivered straight to your inbox weekly.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </main>
  );
}