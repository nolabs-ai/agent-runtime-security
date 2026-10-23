import fs from "node:fs";
import path from "node:path";

export type Segment =
  | { type: "md"; text: string }
  | { type: "figure"; n: number; label: string; caption: string };

export type Section = {
  title: string;
  segments: Segment[];
  words: number;
};

const FIGURE_RE = /^\*\*Figure (\d+)\.\s*([^*]*?)\*\*\s*([\s\S]*)$/;

function splitFigures(body: string, nextFigure: { n: number }): Segment[] {
  const lines = body.split("\n");
  const out: Segment[] = [];
  let buf: string[] = [];
  let pendingFigure = false;

  const flush = () => {
    const text = buf.join("\n").trim();
    if (text) out.push({ type: "md", text });
    buf = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```mermaid")) {
      flush();
      i++;
      while (i < lines.length && lines[i] !== "```") i++;
      pendingFigure = true;
      continue;
    }
    if (/^!\[.*\]\(diagrams\/overview\.svg\)/.test(line)) {
      flush();
      pendingFigure = true;
      continue;
    }

    if (pendingFigure) {
      if (line.trim() === "") continue;
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() !== "") para.push(lines[i++]);
      i--;
      const m = FIGURE_RE.exec(para.join(" "));
      if (m) {
        const caption = m[3]
          .replace(/\[Standalone vector\][^·]*·\s*\[Print version\]\([^)]*\)/, "")
          .trim();
        out.push({ type: "figure", n: Number(m[1]), label: m[2].trim(), caption });
      } else {
        out.push({ type: "figure", n: nextFigure.n, label: "", caption: "" });
        buf.push(...para);
      }
      nextFigure.n++;
      pendingFigure = false;
      continue;
    }
    buf.push(line);
  }
  flush();
  return out;
}

let cache: Section[] | null = null;

export function getSections(): Section[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "paper.md"), "utf8");
  const parts = raw.split(/^## /m).slice(1);
  const nextFigure = { n: 1 };
  cache = parts.map((part) => {
    const nl = part.indexOf("\n");
    const title = part.slice(0, nl).trim();
    const body = part.slice(nl + 1);
    return {
      title,
      segments: splitFigures(body, nextFigure),
      words: body.split(/\s+/).filter(Boolean).length,
    };
  });
  return cache;
}
