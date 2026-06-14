import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/nav/Header";
import Footer from "@/components/layout/Footer";

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
  title: "SaltCity Central",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={galano.variable}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}