import { getSections, type Section } from "./paper";

export const PARTS = [
  { n: 1, title: "Foundations", blurb: "What is being governed, and what we are willing to trust." },
  { n: 2, title: "Containment", blurb: "Boundaries, policy and the execution of untrusted code." },
  { n: 3, title: "Authority", blurb: "Credentials, grants, sessions and federation." },
  { n: 4, title: "Data and evidence", blurb: "Information flow, provenance and the audit trail." },
  { n: 5, title: "Deployment and validation", blurb: "Failure semantics, prior art and how to validate." },
];

export type ChapterMeta = {
  heading: string; // exact H2 in paper.md
  slug: string;
  short: string;
  part: number;
};

export const CHAPTERS: ChapterMeta[] = [
  { heading: "Abstract", slug: "abstract", short: "Abstract", part: 1 },
  { heading: "Introduction and scope", slug: "introduction", short: "Introduction", part: 1 },
  { heading: "Architectural model and terminology", slug: "model", short: "Model and terminology", part: 1 },
  { heading: "Trust model", slug: "trust-model", short: "Trust model", part: 1 },
  { heading: "Outer isolation boundary", slug: "outer-boundary", short: "Outer isolation boundary", part: 2 },
  { heading: "Runtime governance topology", slug: "topology", short: "Runtime topology", part: 2 },
  { heading: "Explicit policy and least privilege", slug: "policy", short: "Policy and least privilege", part: 2 },
  { heading: "Constrained execution environments", slug: "constrained-execution", short: "Constrained execution", part: 2 },
  { heading: "Credential broker", slug: "credential-broker", short: "Credential broker", part: 3 },
  { heading: "Runtime grant expansion", slug: "grant-expansion", short: "Grant expansion", part: 3 },
  { heading: "Session identity and authorization freshness", slug: "sessions-and-freshness", short: "Sessions and freshness", part: 3 },
  { heading: "Federated authority", slug: "federation", short: "Federated authority", part: 3 },
  { heading: "Information flow and taint propagation", slug: "information-flow", short: "Information flow", part: 4 },
  { heading: "Model and tool provenance", slug: "provenance", short: "Model and tool provenance", part: 4 },
  { heading: "Evidence integrity, retention, and attribution", slug: "evidence", short: "Evidence and attribution", part: 4 },
  { heading: "Deployment and failure contracts", slug: "deployment-and-failure", short: "Deployment and failure", part: 5 },
  { heading: "Related work and contribution", slug: "related-work", short: "Related work", part: 5 },
  { heading: "Implementation contracts", slug: "implementation", short: "Implementation contracts", part: 5 },
  { heading: "Validation and remaining specification work", slug: "validation", short: "Validation and open work", part: 5 },
  { heading: "References", slug: "references", short: "References", part: 5 },
];

export type Chapter = ChapterMeta & { section: Section; index: number; minutes: number };

export function getChapters(): Chapter[] {
  const sections = getSections();
  return CHAPTERS.map((meta, index) => {
    const section = sections.find((s) => s.title === meta.heading);
    if (!section) throw new Error(`Section not found in paper.md: ${meta.heading}`);
    return { ...meta, section, index, minutes: Math.max(1, Math.round(section.words / 220)) };
  });
}

export function getChapter(slug: string) {
  return getChapters().find((c) => c.slug === slug);
}
