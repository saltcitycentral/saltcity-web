import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <img
              src="/place-for-you.jpg"
              alt="Welcome"
              className="h-[420px] w-full object-cover lg:h-[540px]"
            />
          </div>

          <div>
            <h1 className="text-5xl lg:text-7xl leading-tight font-black mb-6 tracking-tight">
              Become <br /> Fit For Use
            </h1>

            <p className="text-lg lg:text-xl text-black/75 leading-relaxed max-w-[540px] mb-8">
              GOD created you in Christ Jesus to join Him in His good work, and we are here to help you in doing so.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                href="https://www.youtube.com/@saltcitychurch"
                target="_blank"
                className="bg-black text-white hover:bg-black/90"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                }
              >
                Join Us Live
              </Button>

              <Button 
                href="/serve"
                className="bg-transparent text-black ring-2 ring-black/20 hover:ring-black/40 hover:bg-black/5"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                }
              >
                Join a Unit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}