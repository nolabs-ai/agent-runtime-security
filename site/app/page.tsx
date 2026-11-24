import Link from "next/link";
import { FigureFrame } from "@/components/FigureFrame";
import { Topology } from "@/components/figures/Topology";
import { getChapters, PARTS } from "@/lib/chapters";
import { SITE } from "@/lib/site";

const CONCERNS = [
  {
    title: "Isolation",
    body: "Agents, tools and generated code run inside boundaries they cannot reach past. Enforcement lives outside the agent runtime.",
    slug: "outer-boundary",
  },
  {
    title: "Authorization",
    body: "Narrowly scoped capabilities, brokered credentials, and explicit grant changes that expand, contract or revoke authority mid-run.",
    slug: "grant-changes",
  },
  {
    title: "Information flow",
    body: "Data labels and taint tracking keep restrictions attached to information as it moves between components.",
    slug: "labels-and-taint",
  },
  {
    title: "Evidence integrity",
    body: "Attributable, signed records of what happened, written and retained beyond the agent's reach.",
    slug: "evidence",
  },
];

export default function Home() {
  const chapters = getChapters();
  const abstractSeg = chapters.find((c) => c.slug === "abstract")!.section.segments[0];
  const abstract = abstractSeg.type === "md" ? abstractSeg.text.split("\n\n")[0].split(/(?<=\.)\s/)[0] : "";

  return (
    <>
      <section className="front">
        <div className="wrap front-in">
          <div className="front-copy">
            <p className="front-eyebrow">
              {SITE.subtitle} · {SITE.version}
            </p>
            <h1>{SITE.title}</h1>
            <p className="front-abstract">{abstract}</p>
            <div className="front-cta">
              <Link href="/paper/abstract" className="btn btn-dark">Start reading</Link>
              <Link href="/paper" className="btn btn-ghost">Browse contents</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>What the architecture covers</h2>
          </div>
          <div className="pillars">
            {CONCERNS.map((c, i) => (
              <Link key={c.slug} href={`/paper/${c.slug}`} className="pillar">
                <span className="pillar-n">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="pillar-go">Read the chapter →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>The architecture at a glance</h2>
            <p className="section-lead">
              A control plane, isolated from the agent runtime, enforces scoped capabilities, brokers credentials and
              records evidence the agent cannot tamper with.
            </p>
          </div>
          <FigureFrame
            n={3}
            title="Runtime governance topology"
            caption={
              <>
                Governance services provision the runtime control system; agents, tools and generated code each run in
                their own sandbox. <Link href="/paper/topology">Read the topology chapter →</Link>
              </>
            }
          >
            <Topology />
          </FigureFrame>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>How the paper is organized</h2>
          </div>
          <div className="parts">
            {PARTS.map((p) => (
              <div key={p.n} className="part-card">
                <p className="part-card-n">Part {p.n}</p>
                <h3>{p.title}</h3>
                <p className="part-card-b">{p.blurb}</p>
                <ol>
                  {chapters
                    .filter((c) => c.part === p.n && c.slug !== "references")
                    .map((c) => (
                      <li key={c.slug}>
                        <Link href={`/paper/${c.slug}`}>{c.short}</Link>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
