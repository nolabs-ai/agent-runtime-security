import Link from "next/link";
import { PARTS, type Chapter } from "@/lib/chapters";

export function ChapterNav({ chapters, current }: { chapters: Chapter[]; current?: string }) {
  return (
    <nav className="toc" aria-label="Chapters">
      {PARTS.map((part) => (
        <div key={part.n} className="toc-part">
          <p className="toc-part-t"><span>{String(part.n).padStart(2, "0")}</span>{part.title}</p>
          <ol>
            {chapters.filter((c) => c.part === part.n).map((c) => (
              <li key={c.slug}>
                <Link href={`/paper/${c.slug}`} aria-current={c.slug === current ? "page" : undefined}>
                  {c.short}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}
