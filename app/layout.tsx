import type { Metadata, Viewport } from "next";
import { site } from "./content";
import "./globals.css";
import "./editorial.css";
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
  themeColor: "#F7F5F1",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
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
              sameAs: site.socials.map(
                ([, handle]) => `https://www.instagram.com/${handle}/`,
              ),
            }),
          }}
        />
      </body>
    </html>
  );
}
