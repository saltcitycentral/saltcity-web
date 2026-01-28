export default function HeroMission() {
  return (
    <section className="relative w-full text-white bg-gradient-to-br from-neutral-800 to-neutral-900">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/who1.jpg"
          alt="Our Mission"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <h2 className="text-sm font-bold tracking-wide opacity-90 uppercase mb-4">
            Our Mission
          </h2>

          <h1 className="text-4xl font-black leading-tight md:text-6xl mb-6">
            Transforming men in distress, in debt, and discontented, into mighty men by the power that is the Word of GOD.
          </h1>

          <p className="text-lg text-white/90">
            We raise disciples and disciple makers.
          </p>
        </div>
      </div>
    </section>
  );
}