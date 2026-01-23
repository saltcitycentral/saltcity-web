import Container from "@/components/ui/Container";

const NEXT_STEPS = [
  {
    title: "Sign up for School of Discipleship",
    desc: "Learn the foundations of faith and grow in your walk with Christ.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  },
  {
    title: "Join a Company",
    desc: "Do life with a community of believers close to you.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4"/>
        <circle cx="16" cy="9" r="3"/>
        <path d="M2 21v-3c0-2 2-4 5-4h4c3 0 5 2 5 4v3"/>
        <path d="M18 21v-2c0-2 1-3 3-3"/>
      </svg>
    )
  },
  {
    title: "More Steps",
    desc: "Find out more about our growth structures.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    )
  }
];

export default function NextSteps() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <h2 className="text-center text-4xl font-black mb-12 tracking-tight">
          Start Growing
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {NEXT_STEPS.map((step) => (
            <div
              key={step.title}
              className="group bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-black/5"
            >
              <div className="w-16 h-16 rounded-xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">
                {step.title}
              </h3>
              <p className="text-base text-black/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}