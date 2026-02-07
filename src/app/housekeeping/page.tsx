"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { Calendar, MapPin, Clock, Bell, ChevronRight, Info } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category: "event" | "update" | "reminder" | "important";
  priority: "high" | "medium" | "low";
  image?: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Discipleship Class Registration Now Open",
    description: "Join us for our next discipleship class starting March 1st. Registration is now open for all first-timers and those seeking deeper spiritual growth.",
    date: "2026-03-01",
    time: "10:00 AM",
    location: "SaltCity Central",
    category: "important",
    priority: "high",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Sunday Service Time Change - This Week Only",
    description: "Please note that this Sunday's service will start at 9:00 AM instead of the usual 10:00 AM due to a special program.",
    date: "2026-02-09",
    time: "9:00 AM",
    location: "All Locations",
    category: "important",
    priority: "high",
  },
  {
    id: "3",
    title: "Youth Hangout - February Edition",
    description: "All youths are invited to our monthly hangout featuring games, music, and faith discussions. Bring a friend!",
    date: "2026-02-15",
    time: "4:00 PM",
    location: "LifeCity Centre",
    category: "event",
    priority: "medium",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "New Company Locations Added",
    description: "We've opened three new company meeting points across Warri and Effurun. Check the locations page to find one near you.",
    date: "2026-02-08",
    category: "update",
    priority: "medium",
  },
  {
    id: "5",
    title: "Volunteer Opportunities Available",
    description: "Join our media, ushering, or children's ministry teams. Training sessions will be held every Saturday this month.",
    date: "2026-02-10",
    time: "2:00 PM",
    location: "SaltCity Central",
    category: "event",
    priority: "medium",
  },
  {
    id: "6",
    title: "Midweek Service Reminder",
    description: "Don't forget our Wednesday midweek service. Join us online or in person for powerful teaching and prayer.",
    date: "2026-02-12",
    time: "6:00 PM",
    location: "All Locations & Online",
    category: "reminder",
    priority: "low",
  },
  {
    id: "7",
    title: "Prayer & Fasting Week Begins",
    description: "Our corporate prayer and fasting begins February 17th. Join us as we seek God's face together for breakthrough and guidance.",
    date: "2026-02-17",
    category: "important",
    priority: "high",
  },
  {
    id: "8",
    title: "Monthly Thanksgiving Service",
    description: "Join us for our monthly thanksgiving service as we celebrate God's faithfulness and goodness.",
    date: "2026-02-23",
    time: "10:00 AM",
    location: "SaltCity Central",
    category: "event",
    priority: "medium",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
  },
];

const CATEGORY_CONFIG = {
  event: { label: "Event", color: "bg-blue-500", textColor: "text-blue-500" },
  update: { label: "Update", color: "bg-green-500", textColor: "text-green-500" },
  reminder: { label: "Reminder", color: "bg-amber-500", textColor: "text-amber-500" },
  important: { label: "Important", color: "bg-red-500", textColor: "text-red-500" },
};

export default function HousekeepingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const filteredAnnouncements = ANNOUNCEMENTS.filter((announcement) => {
    if (selectedCategory === "all") return true;
    return announcement.category === selectedCategory;
  }).sort((a, b) => {
    // Sort by priority first, then by date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const highPriorityItems = filteredAnnouncements.filter((a) => a.priority === "high");
  const otherItems = filteredAnnouncements.filter((a) => a.priority !== "high");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-black/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent)]" />
        
        <Container>
          <div
            className={[
              "relative z-10 py-20 max-w-4xl transition-all duration-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-black/60">
                Stay Informed
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-[1.1] tracking-tight">
              Church Updates &<br />
              <span className="text-black/60">Announcements</span>
            </h1>

            <p className="text-lg text-black/70 leading-relaxed max-w-2xl">
              Everything you need to know about upcoming events, important updates,
              and opportunities to get involved in the SaltCity community.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
        <Container>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={[
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                selectedCategory === "all"
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-black/5 text-black/70 hover:bg-black/10",
              ].join(" ")}
            >
              All Updates
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={[
                  "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2",
                  selectedCategory === key
                    ? `${config.color} text-white shadow-lg scale-105`
                    : "bg-black/5 text-black/70 hover:bg-black/10",
                ].join(" ")}
              >
                {selectedCategory === key && (
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                )}
                {config.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* High Priority Section */}
      {highPriorityItems.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-red-50/50 to-transparent">
          <Container>
            <div className="flex items-center gap-3 mb-6">
              <Info className="h-5 w-5 text-red-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-red-500">
                Urgent & Important
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {highPriorityItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={[
                    "group relative overflow-hidden rounded-2xl bg-white border-2 border-red-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  ].join(" ")}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  {item.image && (
                    <div className="relative h-48 overflow-hidden bg-black/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className={`inline-flex items-center gap-2 rounded-full ${CATEGORY_CONFIG[item.category].color} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        {CATEGORY_CONFIG[item.category].label}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-black mb-3 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-black/70 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-black/60">
                      {item.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span className="font-semibold">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                      {item.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span>{item.time}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Regular Announcements */}
      <section className="py-12">
        <Container>
          {otherItems.length === 0 && highPriorityItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-black/50">No announcements in this category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {otherItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={[
                    "group relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  ].join(" ")}
                  style={{
                    transitionDelay: `${(idx + highPriorityItems.length) * 60}ms`,
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Image (if exists) */}
                    {item.image && (
                      <div className="md:w-64 h-48 md:h-auto rounded-xl overflow-hidden bg-black/5 shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className={`inline-flex items-center gap-2 rounded-full ${CATEGORY_CONFIG[item.category].color} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shrink-0`}>
                          {CATEGORY_CONFIG[item.category].label}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-black mb-2 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-sm text-black/70 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Details */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-black/60">
                        {item.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className={`h-4 w-4 ${CATEGORY_CONFIG[item.category].textColor}`} />
                            <span className="font-semibold">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center shrink-0">
                      <ChevronRight className="h-6 w-6 text-black/20 group-hover:text-black/60 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Follow us on social media and enable notifications to never miss important updates.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://t.me/mysaltcity"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Join Telegram
              </a>
              <a
                href="https://instagram.com/saltcitycentral"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}