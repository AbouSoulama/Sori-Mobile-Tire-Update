import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { RevealController } from "@/components/motion/RevealController";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { site } from "@/lib/site";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Barlow_Condensed({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SORI Mobile Tire | Mobile Tire & Roadside Assistance in Waldorf, MD",
    template: "%s | SORI Mobile Tire",
  },
  description:
    "SORI Mobile Tire Roadside Assistance LLC brings flat tire repair, tire installation, wheel repair and balancing to your location in Waldorf, MD. Available 24/7.",
  applicationName: site.name,
  ...(site.noindex ? { robots: { index: false, follow: false } } : {}),
  keywords: [
    "mobile tire service",
    "roadside assistance",
    "flat tire repair",
    "tire installation",
    "wheel repair",
    "Waldorf MD",
    "Maryland",
  ],
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/images/hero-tire-service.webp", width: 1920, height: 1280 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b172a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-dvh pb-[76px] md:pb-0">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important}"}</style>
        </noscript>
        <RevealController />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-navy"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
