import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/nav/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

const galano = localFont({
  src: [
    {
      path: "../../public/fonts/GalanoGrotesqueRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/GalanoGrotesqueBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-galano",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "church in Warri",
    "Warri church",
    "churches in Warri Delta State",
    "SaltCity Central",
    "SaltCity Church Warri",
    "church near me Warri",
    "Effurun church",
    "Sapele church",
    "Sunday service Warri",
    "Okumagba Avenue church",
    "Delta State church",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_NG",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — ${SITE_TAGLINE}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@saltcitycentral",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Paste the token from Google Search Console once the property is verified:
  // verification: { google: "..." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={galano.variable}>
      <body className="font-sans">
        <StructuredData />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}