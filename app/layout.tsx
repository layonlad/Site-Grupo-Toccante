import type { Metadata, Viewport } from "next";
import { site } from "./content";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: "Grupo Toccante", template: "%s | Grupo Toccante" },
  description:
    "Música, Buffet, Decoração e Cerimonial para celebrar com significado.",
  icons: { icon: "/brand.svg", apple: "/brand.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E6",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('tg-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <link
          rel="preload"
          href="/fonts/EBGaramond.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Lato-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.origin,
              logo: `${site.origin}/brand.svg`,
              email: site.email,
              sameAs: [site.instagram.url],
            }),
          }}
        />
      </body>
    </html>
  );
}
