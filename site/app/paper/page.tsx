import type { Metadata } from "next";
import Link from "next/link";
import { getChapters, PARTS } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Contents",
  description: "All chapters of Agent Runtime Security: A Reference Architecture, organized as a five-part curriculum.",
};

export default function Contents() {
  const chapters = getChapters();
  return (
    <div className="wrap contents">
      <header className="page-head">
        <p className="eyebrow">Contents</p>
        <h1>Agent Runtime Security</h1>
      </header>
      {PARTS.map((part) => (
        <section key={part.n} className="part">
          <div className="part-head">
            <span className="part-n">{String(part.n).padStart(2, "0")}</span>
            <div>
              <h2>{part.title}</h2>
            </div>
          </div>
          <ol className="chapter-list">
            {chapters.filter((c) => c.part === part.n).map((c) => (
              <li key={c.slug}>
                <Link href={`/paper/${c.slug}`}>
                  <span className="cl-title">{c.section.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
