import { getAuthors } from "./paper";

export const SITE = {
  title: "Agent Runtime Security",
  subtitle: "A Reference Architecture",
  description:
    "An illustrated guide to a reference architecture for constraining AI agent actions, managing changes to their authority, and preserving attributable evidence.",
  version: "Review draft 0.3",
  date: "14 October 2026",
  authors: getAuthors(), // parsed from the **Authors:** line in paper/paper.md
  org: "nolabs",
  repo: "https://github.com/nolabs-ai/agent-runtime-security",
  pdf: "/agent-runtime-security.pdf",
  license: { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
  disclosure:
    "The author is affiliated with nolabs. The architecture specifies vendor-neutral security contracts. Draft preparation and research were assisted by OpenAI Codex. This review draft has not undergone independent technical review.",
};

export const BYLINE = SITE.authors.map((a) => (a.affiliation ? `${a.name} (${a.affiliation})` : a.name)).join(", ");

// Citation key: first author's surname + year + short title, e.g. hinds2026agentruntimesecurity.
const citeKey = `${SITE.authors[0].name.split(/\s+/).pop()!.toLowerCase().replace(/[^a-z]/g, "")}2026agentruntimesecurity`;

// BibTeX parses "First Last" names itself; authors are joined with "and".
export const BIBTEX = `@techreport{${citeKey},
  title       = {Agent Runtime Security: A Reference Architecture},
  author      = {${SITE.authors.map((a) => a.name).join(" and ")}},
  institution = {nolabs, Inc},
  type        = {Review draft},
  number      = {0.3},
  year        = {2026},
  month       = oct,
  url         = {${SITE.repo}}
}`;
