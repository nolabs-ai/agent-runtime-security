import type { Metadata } from "next";
import { Figure } from "@/components/Figure";
import { Markdown } from "@/components/Markdown";
import { getChapters } from "@/lib/chapters";
import { BYLINE, SITE } from "@/lib/site";

// Single-page rendering of the whole paper. `npm run pdf` prints this route to PDF.
export const metadata: Metadata = {
  title: "Print edition",
  robots: { index: false },
};

export default function PrintPage() {
  const chapters = getChapters();

  return (
    <div className="print-doc">
      <header className="print-title">
        <h1>{SITE.title}</h1>
        <p className="print-subtitle">{SITE.subtitle}</p>
        <p className="print-meta">
          {BYLINE}
          <br />
          {SITE.version} · {SITE.date}
        </p>
        <p className="print-note">{SITE.disclosure}</p>
        <p className="print-note">
          Licensed under {SITE.license.name} ({SITE.license.url}). Source, issue tracker and latest version:{" "}
          {SITE.repo}
        </p>
      </header>

      {chapters.map((c) => (
        <section key={c.slug} className={`print-chapter ${c.slug === "references" ? "prose-refs" : ""}`}>
          <h2>{c.section.title}</h2>
          <div className="prose">
            {c.section.segments.map((seg, i) =>
              seg.type === "md" ? (
                <Markdown key={i}>{seg.text}</Markdown>
              ) : (
                <Figure key={i} n={seg.n} label={seg.label} caption={seg.caption} />
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
