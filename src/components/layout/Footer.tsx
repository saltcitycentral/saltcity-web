import Container from "@/components/ui/Container";
import {
  FaYoutube,
  FaInstagram,
  FaSpotify,
  FaTelegram,
} from "react-icons/fa";
import { SiMixcloud } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";


// 1. Refactored to objects to allow custom hrefs
// 1. Updated with Shop link
const FOOTER_LINKS = [
  { label: "Watch", href: "https://youtube.com/@saltcitycentral" },
  { label: "Locations", href: "/locations" },
  { label: "Give", href: "/give" },
  { label: "Shop", href: "/shop" }, // Added this line
  { label: "Contact Us", href: "/contact" },
];

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms of Use",
];

const SOCIALS = [
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@saltcitycentral" },
  { icon: FaTelegram, label: "Telegram", href: "https://t.me/mysaltcity" },
  { icon: FaXTwitter, label: "X", href: "https://x.com/saltcitycentral" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/saltcitycentral" },
  { icon: FaSpotify, label: "Spotify", href: "https://open.spotify.com/user/mysaltcity" },
];


export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <Container>
        <div className="py-14 grid gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <p className="text-sm text-black/70">
              Attend{" "}
              {/* Updated this inline link as well to match your request */}
              <a href="https://youtube.com/@saltcitycentral" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline">
                SaltCity Online
              </a>{" "}
              or a{" "}
              <a href="/locations" className="text-black font-semibold hover:underline">
                SaltCity location
              </a>.
            </p>

            <div className="flex flex-wrap gap-x-2 text-sm text-black/60">
              {LEGAL_LINKS.map((item, i) => (
                <span key={item} className="flex items-center">
                  <a href="#" className="hover:underline hover:text-black">
                    {item}
                  </a>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span className="mx-2 text-black/20">|</span>
                  )}
                </span>
              ))}
            </div>

            <p className="text-sm text-black/60">
              © {new Date().getFullYear()} SaltCity. All rights reserved.
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-8 lg:text-right">
            <nav className="flex flex-wrap gap-x-6 gap-y-3 justify-start lg:justify-end">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  // Added target="_blank" logic if it's an external link
                  target={link.href.startsWith('http') ? "_blank" : "_self"}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : ""}
                  className="text-sm text-black/70 hover:text-black hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex gap-4 justify-start lg:justify-end">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-black text-white grid place-items-center hover:bg-black/90 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}