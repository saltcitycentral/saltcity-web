import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

const EXPRESSIONS = [
  {
    title: "SaltCity Warri",
    description: "Our main location in Warri where we gather to worship, hear GOD's Word, and fellowship.",
    image: "/images/salt_warri.jpg",
    href: "/locations"
  },
  {
    title: "Cityzens Churches",
    description: "Our campus expressions expessions, located at FUPRE and PTI.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
    href: "/cityzens"
  },
  {
    title: "LifeCity",
    description: "The vibrant youthful expression of SALTCITY.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    href: "/lifecity"
  },
  {
    title: "CityCenter",
    description: "Teenage church for young believers between 13-20 years.",
    image: "/images/citycentre.jpg",
    href: "/citycentre"
  },
  {
    title: "Sapele Bible Study",
    description: "Satellite study center that holds every Thursday.",
    image: "/images/sapele.jpg",
    href: "/sapele"
  },
  {
    title: "SaltCity Capital",
    description: "Training institute for raising human capital",
    image: "/images/capital.jpg",
    href: "/capital"
  },
  {
    title: "SaltWorship",
    description: "A platform for communicating the gospel through songs",
    image: "/images/saltworship.jpg",
    href: "/worship"
  },
  {
    title: "SaltCity Online Church",
    description: "Virtual community for members in diaspora",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80",
    href: "/watch"
  }
];

const FAQS = [
  {
    question: "How do i become a member?",
    answer: "At SaltCity, you'll be welcomed into a friendly environment by people who are excited to see you. We'll help you feel at ease so you can focus on connecting with God. Our services include vibrant worship, practical teaching from the Bible, and opportunities to connect with others."
  },
  {
    question: "What is a company group?",
    answer: "Come as you are! You'll see people in everything from casual wear to more formal attire. We care more about your heart than your wardrobe."
  },
  {
    question: "How do i register for premarital class?",
    answer: "We love questions! Feel free to approach any of our team members before or after service. You can also reach out through our contact page, and we'll be happy to help."
  },
  {
    question: "How do i give?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  },
    {
    question: "Can i come with my kids?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  },
    {
    question: "How do i speak to a Pastor?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  },
    {
    question: "What service unit can i join?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  },
    {
    question: "How can i find church sermons?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  },
    {
    question: "Is there SaltCity outside Warri?",
    answer: "We have age-appropriate programs for children that make learning about God fun and engaging. Our CityKids ministry provides a safe, welcoming environment where your children can grow in faith."
  }
];

export default function WhatToExpectPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[450px] bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0">
          <Image 
            src="/images/fulfill_call.jpg"
            alt="Fulfill your calling"
            fill // This makes it fill the parent div
            className="object-cover object-top opacity-20"
            priority // Loads this image first
          />
        </div>

        
        
        <Container>
          <div className="relative h-[450px] flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Fulfill Your Calling!
            </h1>
            <p className="text-xl text-white/95 max-w-3xl leading-relaxed">
              GOD loves us all equally but trusts us to the level we have taken training. <br /> Here at SaltCity, we put together different regimen for spiritual growth and character development, to make you fit for GOD’s use on the earth.              
               </p>
          </div>
        </Container>
      </section>

      {/* SaltCity Locations Section */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <img 
                src="/images/church_with_us.jpg"
                alt="SaltCity Locations"
                className="w-full h-full object-cover object-[center_25%]" 
              />
            </div>

            <div>
              <h2 className="text-4xl font-black mb-6">Church With Us</h2>
              
              <div className="space-y-1 mb-8 text-lg">
                <p className="text-black/70">No matter your age, demography, tribe or location, we have a church close to you to cater to your spiritual needs.</p>
                <p className="text-black/70">Our service comprises of</p>
                <p className="text-black/70">1. Sincere, communal worship</p>
                <p className="text-black/70">2. ⁠Guided prayers, and</p>
                <p className="text-black/70">3. ⁠Simple but powerfully instructive teaching of GOD’s Word</p>
                <p className="text-black/70">4. ⁠⁠Fellowship after fellowship.</p>


              </div>

              <Link
                href="/locations"
                className="inline-block px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
              >
                Find a Location
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SaltCity Online Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-black mb-6">SaltCity Online</h2>
              
              <div className="space-y-4 mb-8 text-lg text-black/70">
                <p>
                  A community of believers in diaspora experiencing services virtually (on YouTube and Mixlr), and keeping up with our growth structure through accountability and systematic follow up.
                </p>
                
              </div>

              <Link
                href="/watch"
                className="inline-block px-8 py-3.5 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Watch Online
              </Link>
            </div>

            <div className="order-1 lg:order-2 aspect-video rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <img 
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80"
                alt="SaltCity Online"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Expressions Section */}
      <section className="py-20 bg-neutral-900">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Expressions of SaltCity
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              There's a place for everyone at SaltCity. Discover our various expressions designed for every stage of your faith journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {EXPRESSIONS.map((expression) => (
              <Link
                key={expression.title}
                href={expression.href}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.3)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="aspect-square bg-neutral-800">
                    <img
                      src={expression.image}
                      alt={expression.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{expression.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{expression.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-4xl font-black text-center mb-16">First Time FAQ</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-neutral-50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-lg hover:bg-neutral-100 transition-colors list-none">
                  <span>{faq.question}</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-open:rotate-180 shrink-0 ml-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-black/70 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <div className="text-center">
            <Link
              href="/who-we-are/our-beliefs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-black/90 transition-colors"
            >
              Our Beliefs
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}