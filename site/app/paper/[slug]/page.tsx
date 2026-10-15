import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getChapters, PARTS } from "@/lib/chapters";
import { ChapterNav } from "@/components/ChapterNav";
import { Figure } from "@/components/Figure";
import { Markdown } from "@/components/Markdown";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getChapters().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getChapter(slug);
  if (!c) return {};
  return { title: c.section.title, openGraph: { title: c.section.title } };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapters = getChapters();
  const c = chapters.find((x) => x.slug === slug);
  if (!c) notFound();
  const prev = chapters[c.index - 1];
  const next = chapters[c.index + 1];
  const part = PARTS.find((p) => p.n === c.part)!;
  const isRefs = c.slug === "references";

  return (
    <>
      <ReadingProgress />
      <div className="wrap chapter-layout">
        <aside className="chapter-side">
          <ChapterNav chapters={chapters} current={c.slug} />
        </aside>

        <article className="chapter">
          <header className="chapter-head">
            <p className="eyebrow">
              Part {part.n} · {part.title}
              <span> · {c.minutes} min read</span>
            </p>
            <h1>{c.section.title}</h1>
          </header>


          <div className={`prose ${isRefs ? "prose-refs" : ""}`}>
            {c.section.segments.map((seg, i) =>
              seg.type === "md" ? (
                <Markdown key={i}>{seg.text}</Markdown>
              ) : (
                <Figure key={i} n={seg.n} label={seg.label} caption={seg.caption} />
              ),
            )}
          </div>



          <nav className="pager" aria-label="Chapter navigation">
            {prev ? (
              <Link href={`/paper/${prev.slug}`} className="pager-prev">
                <span>Previous</span>
                {prev.section.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/paper/${next.slug}`} className="pager-next">
                <span>Next</span>
                {next.section.title}
              </Link>
            ) : (
              <Link href="/" className="pager-next">
                <span>Done</span>
                Back to overview
              </Link>
            )}
          </nav>
        </article>
      </div>
    </>
  );
}
