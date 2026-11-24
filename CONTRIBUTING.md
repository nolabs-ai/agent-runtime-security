# Contributing

This paper is a review draft. Technical review is the most useful contribution. That means
places where the architecture is wrong, underspecified or impractical to implement, or where
it misses prior work.

## Ways to contribute

- **Technical review:** open a [technical review issue](https://github.com/nolabs-ai/agent-runtime-security/issues/new?template=technical-review.yml). Name the section, the claim, and what you think is wrong or missing.
- **Errata:** typos, broken references and figure errors go in an [errata issue](https://github.com/nolabs-ai/agent-runtime-security/issues/new?template=errata.yml), or a pull request.
- **Pull requests:** small, focused changes to `paper/paper.md`. For anything structural, open an issue first so we can agree on the direction.

Everyone whose review, errata or pull request is merged is listed as a contributor in
[AUTHORS.md](AUTHORS.md). Substantial contributions can lead to co-authorship. See that file
for how both work.

## Repository layout

```
paper/paper.md        Source of truth for the paper, including figure captions
site/                 Next.js site that renders the paper
site/components/figures/  Interactive figures (one component per figure)
```

Chapters, figures and captions are parsed from `paper/paper.md` at build time, so the site
and the paper do not drift apart. If you rename an H2 heading, update `site/lib/chapters.ts`.

## Running the site locally

```sh
cd site
npm install
npm run dev     # http://localhost:3000
```

## Sign-off and license

Contributions are accepted under the repository license, [CC BY 4.0](LICENSE). Please sign
off your commits (`git commit -s`) to certify the [Developer Certificate of
Origin](https://developercertificate.org/).
