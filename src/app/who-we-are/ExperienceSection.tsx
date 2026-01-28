import Link from "next/link";

export default function ExperienceSection() {
  return (
    <section className="relative w-full text-white bg-neutral-800">
      <div className="absolute inset-0 opacity-30">
        <img
          src="images/experience_saltcity.jpg"
          alt="Experience"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-black mb-4">
              Experience SaltCity for Yourself
            </h2>

            <p className="text-lg leading-relaxed text-white/90">
              Find out{" "}
              <Link
                className="underline underline-offset-4 hover:text-white"
                href="/who-we-are/what-to-expect"
              >
                what you can expect
              </Link>{" "}
              when you attend at a SaltCity location or online.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/20 transition-colors mb-4"
              href="/locations"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-white" />
              Find Your Closest Location
            </Link>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Choose a Location
              </label>
              <select className="w-full rounded-xl bg-white/90 px-5 py-3.5 text-black outline-none">
                <option value="">Choose a Location</option>
                <option value="online">SaltCity Online</option>
                <optgroup label="Nigeria">
                  <option>Warri</option>
                  <option>Benin City</option>
                  <option>Sapele</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}