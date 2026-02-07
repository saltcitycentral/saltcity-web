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
    title: "Walking in Faith: Understanding God's Purpose for Your Life",
    excerpt: "Discover how to align your daily walk with God's divine purpose and calling for your life.",
    author: "Pastor Emmanuel",
    date: "2026-02-05",
    readTime: "8 min read",
    category: "Faith & Purpose",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "The Power of Prayer in Building Strong Families",
    excerpt: "Practical insights on establishing a prayer culture that transforms your home and relationships.",
    author: "Sis. Grace",
    date: "2026-02-03",
    readTime: "6 min read",
    category: "Family",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Navigating Life's Challenges with Biblical Wisdom",
    excerpt: "How to apply scriptural principles to overcome obstacles and emerge victorious.",
    author: "Bro. David",
    date: "2026-02-01",
    readTime: "10 min read",
    category: "Spiritual Growth",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Youth & Purpose: Finding Your Place in God's Kingdom",
    excerpt: "A message for the young generation on discovering and fulfilling their divine assignment.",
    author: "Pastor Sarah",
    date: "2026-01-30",
    readTime: "7 min read",
    category: "Youth",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Building a Culture of Excellence in Ministry",
    excerpt: "Keys to developing and maintaining standards of excellence in all areas of church service.",
    author: "Elder Michael",
    date: "2026-01-28",
    readTime: "9 min read",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "The Role of Worship in Personal Transformation",
    excerpt: "Understanding how genuine worship reshapes our character and deepens our relationship with God.",
    author: "Bro. John",
    date: "2026-01-25",
    readTime: "5 min read",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
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
          <div className="py-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
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
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={[
                    "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300",
                    selectedCategory === cat
                      ? "bg-black text-white shadow-lg"
                      : "bg-black/5 text-black/70 hover:bg-black/10",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
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