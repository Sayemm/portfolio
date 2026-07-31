import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const DESCRIPTION =
  "Backend developer in Regina, SK. A public notebook of notes on C#, .NET, Docker, SQL, networking and system design.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mofakh.com"),
  title: {
    default: "Mofakh Islam — notes & work",
    template: "%s — mofakh.com",
  },
  description: DESCRIPTION,
  // The card LinkedIn, Slack and iMessage render. The image itself comes from
  // app/opengraph-image.tsx, which Next wires up automatically.
  // Deliberately no title/description here: omitting them lets each page's own
  // title and description fall through, so sharing a note shows that note.
  openGraph: {
    type: "website",
    siteName: "mofakh.com",
    url: "https://mofakh.com",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} bg-ground`}
    >
      <body className="min-h-screen bg-ground text-ink">
        <Header />
        {children}
      </body>
    </html>
  );
}
