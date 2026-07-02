import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd, videoGameLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: siteConfig.name }] },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [{ url: "/images/cover-art.jpg", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image", site: siteConfig.twitter },
  robots: { index: true, follow: true },
  ...(siteConfig.gscVerification
    ? { verification: { google: siteConfig.gscVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.lang} className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-bg">
        <JsonLd data={[organizationLd(), websiteLd(), videoGameLd()]} />

        {siteConfig.adsenseClient && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}

        <Header />
        <main>{children}</main>
        <Footer />

        {/* Grain de film, au-dessus de tout, non interactif */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
