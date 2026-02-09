import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/nav/Header";
import Footer from "@/components/layout/Footer";


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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
