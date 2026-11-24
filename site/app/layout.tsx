import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"], style: ["normal", "italic"] });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body", axes: ["opsz"] });
const ui = Inter({ subsets: ["latin"], variable: "--font-ui" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://agent-runtime-governance.vercel.app"),
  title: { default: `${SITE.title}: ${SITE.subtitle}`, template: `%s · ${SITE.title}` },
  description: SITE.description,
  authors: [{ name: SITE.author }],
  openGraph: {
    title: `${SITE.title}: ${SITE.subtitle}`,
    description: SITE.description,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${ui.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <header className="site-header">
          <div className="wrap header-in">
            <Link href="/" className="brand" aria-label="Agent Runtime Security, home">
              <span>Agent Runtime Security</span>
            </Link>
            <nav aria-label="Primary">
              <Link href="/paper">Contents</Link>
              <Link href="/paper/references">References</Link>
              <Link href="/paper/abstract" className="nav-cta">Start reading</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap foot-grid">
            <div>
              <strong>{SITE.title}: {SITE.subtitle}</strong>
              <p>{SITE.version} · {SITE.date}</p>
              <p>{SITE.author} · {SITE.org}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
